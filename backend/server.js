require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend');
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const rateLimit = require('express-rate-limit');
const Message = require('./models/Message');

const resend = new Resend(process.env.RESEND_API_KEY);
const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// --- 1. SEGURIDAD DE ENCABEZADOS ---
app.use(helmet());

// --- 2. CONFIGURACIÓN DE CORS ESTRICTO ---
const allowedOrigins = [
  'http://localhost:4173', // localhost alternativo
  'http://localhost:5173', // Desarrollo
  'https://mainds.onrender.com', // Producción
  'https://www.mainds.onrender.com', // Subdominio www
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por seguridad: Origen no permitido'));
    }
  }
}));

app.use(express.json());

// --- 3. PROTECCIÓN CONTRA NOSQL INJECTION ---
// Limpia automáticamente $, . y otros operadores de MongoDB en las entradas
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
});

// --- 4. RATE LIMITER (ANTISPAM) ---
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  message: { error: 'Demasiadas solicitudes. Por seguridad, intente de nuevo en una hora.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const formatDate = () => {
  const date = new Date();
  return date.toLocaleString('es-MX', {
    timeZone: 'America/Monterrey',
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};

// --- RUTAS ---

// Aplicamos el limitador específicamente a la ruta de contacto
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, asunto, mensaje } = req.body;

    // Validación backend estricta
    if (!nombre || !apellido || !telefono || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    if (mensaje.length > 3000) {
      return res.status(400).json({ error: 'El mensaje excede el límite de caracteres.' });
    }

    const fechaFormateada = formatDate();

    // Guardar en BD
    const newMessage = new Message({
      nombre, apellido, telefono, email, asunto, mensaje, fechaFormateada
    });

    if (mongoose.connection.readyState === 1) {
      await newMessage.save();
    }

    if (process.env.RESEND_API_KEY) {
      resend.emails.send({
        from: 'MAINDS Web <onboarding@resend.dev>',
        to: 'maquinados.indelsur@gmail.com',
        subject: `[WEB CONTACTO] ${asunto}`,
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2>Nuevo mensaje de contacto - MAINDS</h2>
            <p><strong>Fecha:</strong> ${fechaFormateada}</p>
            <hr style="border: 1px solid #eee;"/>
            <p><strong>Cliente:</strong> ${nombre} ${apellido}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
              ${mensaje}
            </div>
          </div>
        `
      })
        .then(data => console.log('Notificación enviada vía Resend API con éxito:', data.id))
        .catch(err => console.error('Error en la API de Resend:', err.message));
    } else {
      console.warn('Advertencia: RESEND_API_KEY no configurada en Render.');
    }

    return res.status(200).json({ message: 'Solicitud recibida correctamente.' });

  } catch (error) {
    console.error('Error Crítico:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Conexión y Arranque
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Base de Datos Conectada');
    app.listen(PORT, () => console.log(`Servidor de Producción en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Fallo de Conexión a DB:', err.message);
    process.exit(1);
  });