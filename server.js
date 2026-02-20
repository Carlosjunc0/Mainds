const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
require("dotenv").config();

const contactModel = require("./models/contact-model");
const { encryptText, decryptText } = require("./utilities/encryption");
const { sendLeadEmail } = require("./utilities/mailer");

const app = express();

const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "http://localhost";

app.set("view engine", "ejs");
app.use(expressLayouts);

app.set("layout", "./layouts/layout");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cambiar-en-produccion",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60,
    },
  }),
);
app.use(flash());

// Security headers for hardening.
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline';",
  );
  next();
});

// Simple anti-bruteforce limiter for admin login.
const loginAttempts = new Map();
function isRateLimited(ip) {
  const windowMs = 10 * 60 * 1000;
  const maxAttempts = 8;
  const now = Date.now();
  const item = loginAttempts.get(ip);
  if (!item) return false;
  if (now - item.firstAttempt > windowMs) {
    loginAttempts.delete(ip);
    return false;
  }
  return item.count >= maxAttempts;
}
function registerLoginAttempt(ip) {
  const now = Date.now();
  const item = loginAttempts.get(ip);
  if (!item) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return;
  }
  item.count += 1;
  loginAttempts.set(ip, item);
}

app.use((req, res, next) => {
  res.locals.notice = req.flash("notice");
  res.locals.error = req.flash("error");
  res.locals.formErrors = req.flash("formErrors");
  res.locals.formData = req.flash("formData")[0] || {};
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  next();
});

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Mainds Maquinados Industriales Del Sur" });
});

app.get("/servicios", (req, res) => {
  res.render("pages/services", {
    title: "Servicios de maquinado y grabado de precisión",
  });
});

app.get("/contacto", (req, res) => {
  res.render("pages/contact", { title: "Solicitar cotización" });
});

app.get("/api/trabajos", (_req, res) => {
  res.json([
    {
      titulo: "Grabado láser industrial",
      descripcion:
        "Marcado de alta precisión para series cortas y producción continua.",
    },
    {
      titulo: "Duplicado de piezas",
      descripcion:
        "Reingeniería de componentes sin plano y réplica fiel por tolerancia.",
    },
    {
      titulo: "Maquinado CNC",
      descripcion:
        "Fabricación de piezas en metales y plásticos de ingeniería.",
    },
  ]);
});

const leadValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 60 }),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 2, max: 60 }),
  body("phone")
    .trim()
    .matches(/^\d{3}\s\d{3}\s\d{4}$/)
    .withMessage("El teléfono debe usar el formato 123 456 7890."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Ingrese un correo electrónico válido.")
    .isLength({ max: 120 }),
  body("comments")
    .trim()
    .notEmpty()
    .withMessage("Escriba el detalle de su proyecto.")
    .isLength({ min: 20, max: 1500 })
    .withMessage("Los comentarios deben tener entre 20 y 1500 caracteres."),
];

app.post("/contacto", leadValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("formErrors", errors.array());
      req.flash("formData", req.body);
      if (req.headers.accept?.includes("application/json")) {
        return res.status(422).json({ ok: false, errors: errors.array() });
      }
      req.flash(
        "error",
        "Revise los campos marcados para enviar su solicitud.",
      );
      return res.redirect("/contacto");
    }

    const payload = {
      name: encryptText(req.body.name),
      lastname: encryptText(req.body.lastname),
      phone: encryptText(req.body.phone),
      email: encryptText(req.body.email),
      comments: encryptText(req.body.comments),
    };

    await contactModel.createLead(payload);
    await sendLeadEmail(req.body);

    req.flash(
      "notice",
      "¡Gracias! Recibimos su solicitud y pronto le contactaremos.",
    );
    if (req.headers.accept?.includes("application/json")) {
      return res.json({ ok: true, message: "Solicitud enviada." });
    }
    return res.redirect("/contacto");
  } catch (error) {
    return next(error);
  }
});

app.get("/admin", (req, res) => {
  res.render("pages/admin-login", { title: "Acceso administrador" });
});

app.post("/admin/login", (req, res) => {
  if (isRateLimited(req.ip)) {
    req.flash(
      "error",
      "Demasiados intentos. Espere unos minutos para reintentar.",
    );
    return res.redirect("/admin");
  }

  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeThisPassword!";
  const secureCompare = (left, right) => {
    const leftHash = crypto.createHash("sha256").update(String(left)).digest();
    const rightHash = crypto
      .createHash("sha256")
      .update(String(right))
      .digest();
    return crypto.timingSafeEqual(leftHash, rightHash);
  };

  const safeUserMatch = secureCompare(req.body.username || "", adminUser);
  const safePassMatch = secureCompare(req.body.password || "", adminPassword);

  if (!safeUserMatch || !safePassMatch) {
    registerLoginAttempt(req.ip);
    req.flash(
      "error",
      "Credenciales inválidas. Verifique usuario y contraseña.",
    );
    return res.redirect("/admin");
  }

  req.session.isAdmin = true;
  req.flash("notice", "Bienvenido. Sesión iniciada correctamente.");
  return res.redirect("/admin/leads");
});


function ensureAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    req.flash('error', 'Acceso restringido. Inicie sesión como administrador.')
    return res.redirect('/admin')
  }
  return next()
}

app.get('/admin/leads', ensureAdmin, async (req, res, next) => {
  try {
    const leads = await contactModel.getLeads()
    const decrypted = leads.map((lead) => ({
      ...lead,
      name: decryptText(lead.name),
      lastname: decryptText(lead.lastname),
      phone: decryptText(lead.phone),
      email: decryptText(lead.email),
      comments: decryptText(lead.comments),
    }))
    res.render('pages/admin-leads', { title: 'Solicitudes recibidas', leads: decrypted })
  } catch (error) {
    next(error)
  }
})

app.post('/admin/logout', ensureAdmin, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

app.all('/contacto', (req, res, next) => {
  if (!['GET', 'POST'].includes(req.method)) {
    req.flash('error', `Método inválido: ${req.method}. Use el formulario de contacto.`)
    return res.redirect('/contacto')
  }
  return next()
})

app.use((req, res) => {
  res.status(404).render('errors/404', {
    title: 'Página no encontrada',
    hint: 'Revise la dirección o use el menú para continuar navegando.',
  })
})

app.use((err, req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).render('errors/500', {
    title: 'Error del servidor',
    hint:
      req.method === 'POST'
        ? 'Hubo un problema procesando su solicitud. Revise los datos e intente nuevamente.'
        : 'Se presentó un problema inesperado. Intente de nuevo en unos minutos.',
  })
})

contactModel
  .initTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor activo en ${HOST}:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('No fue posible inicializar la base de datos:', error.message)
    process.exit(1)
  })