require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet'); 
const sanitize = require('mongo-sanitize'); 
const rateLimit = require('express-rate-limit'); 
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. SEGURIDAD DE ENCABEZADOS ---
app.use(helmet());

// --- 2. CONFIGURACIÓN DE CORS ESTRICTO ---
const allowedOrigins = [
  'http://localhost:5173', // Desarrollo
  'https://tu-sitio-mainds.onrender.com' // Producción
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
  max: 3, 
  message: { error: 'Demasiadas solicitudes. Por seguridad, intente de nuevo en una hora.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const formatDate = () => {
  const date = new Date();
  return date.toLocaleString('es-MX', { 
    timeZone: 'America/Monterrey', // Ajustado a tu zona horaria en Reynosa
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

    // Enviar Email
    const mailOptions = {
      from: `"Web MAINDS" <${process.env.SMTP_USER}>`, 
      replyTo: email, 
      to: 'maquinados.indelsur@gmail.com',
      subject: `[WEB CONTACTO] ${asunto}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Nuevo mensaje de contacto - MAINDS</h2>
          <p><strong>Fecha:</strong> ${fechaFormateada}</p>
          <hr/>
          <p><strong>Cliente:</strong> ${nombre} ${apellido}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${asunto}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${mensaje}
          </div>
        </div>
      `
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
       await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: 'Solicitud recibida correctamente.' });

  } catch (error) {
    console.error('Error Crítico:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Conexión y Arranque
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mainds';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Base de Datos Conectada');
    app.listen(PORT, () => console.log(`Servidor de Producción en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Fallo de Conexión a DB:', err.message);
    process.exit(1);
  });