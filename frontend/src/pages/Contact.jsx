import { useState, useEffect, useRef } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
// Importaciones de iconos (puedes usar lucide-react estándar si prefieres)
import Send from 'lucide-react/dist/esm/icons/send';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

export default function Contact() {
  // 1. REFERENCIA PARA EL SCROLL
  const formContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // 2. EFECTO DE SCROLL AUTOMÁTICO
  useEffect(() => {
    if (submitStatus === 'success' && formContainerRef.current) {
      const yOffset = -100;
      const element = formContainerRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [submitStatus]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nombre':
      case 'apellido':
      case 'asunto':
      case 'mensaje':
        if (!value.trim()) error = 'Este campo es requerido';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'El correo es requerido';
        else if (!emailRegex.test(value)) error = 'Formato de correo inválido';
        break;
      case 'telefono':
        const phoneRegex = /^\d{10}$/;
        if (!value) error = 'El teléfono es requerido';
        else if (!phoneRegex.test(value.replace(/\D/g, ''))) error = 'Debe contener 10 dígitos';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
});

      if (!response.ok) throw new Error('Error al enviar');

      setSubmitStatus('success');
      setFormData({ nombre: '', apellido: '', telefono: '', email: '', asunto: '', mensaje: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (name) => `
    w-full bg-zinc-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all duration-300
    ${errors[name]
      ? 'border-red-500/50 focus:ring-1 focus:ring-red-500'
      : 'border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500'}
  `;

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full min-h-screen bg-zinc-950">

        {/* Header Hero */}
        <section className="py-10 bg-zinc-900 border-b border-zinc-800 text-center px-4">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Inicie su <span className="text-gradient">Proyecto</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Estamos listos para ayudarle a desarrollar su proyecto con calidad, precisión y atención personalizada.
          </m.p>
        </section>

        {/* Sección Principal con Grid */}
        <section className="max-w-6xl mx-auto pt-10 px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* INFORMACIÓN LATERAL */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4 space-y-2 order-last lg:order-first"
            >
              <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-900 backdrop-blur-sm">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-tighter mb-1">Correo Electrónico</p>
                    <p className="text-zinc-300 text-sm">maquinados.indelsur@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-tighter mb-1">Ubicación</p>
                    <p className="text-zinc-300 text-sm">Reynosa, Tamaulipas, México</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-900/10 border border-zinc-900/50">
                <h3 className="text-white font-bold mb-2">Horarios</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Lunes a Viernes<br />
                  08:00 AM — 06:30 PM
                </p>
              </div>
            </m.div>

            {/* FORMULARIO */}
            <m.div
              ref={formContainerRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 bg-zinc-900/20 backdrop-blur-md border border-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl shadow-black/50 order-first lg:order-last"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="text-black" size={40} />
                  </m.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Solicitud Recibida</h3>
                  <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                    Gracias por su interés. Un ingeniero revisará sus requerimientos y le contactará a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="text-white border-b border-zinc-700 hover:border-white pb-1 transition-all text-sm font-medium"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="nombre" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Nombre</label>
                      <input id="nombre" type="text" name="nombre" autoComplete="given-name" value={formData.nombre} onChange={handleChange} className={inputClasses('nombre')} placeholder="Juan" />
                      {errors.nombre && <p className="text-red-500 text-xs mt-2">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label htmlFor="apellido" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Apellido</label>
                      <input id="apellido" type="text" name="apellido" autoComplete="family-name" value={formData.apellido} onChange={handleChange} className={inputClasses('apellido')} placeholder="Pérez" />
                      {errors.apellido && <p className="text-red-500 text-xs mt-2">{errors.apellido}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="telefono" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Teléfono</label>
                      <input id="telefono" type="tel" name="telefono" autoComplete="tel" value={formData.telefono} onChange={handleChange} className={inputClasses('telefono')} placeholder="10 dígitos" />
                      {errors.telefono && <p className="text-red-500 text-xs mt-2">{errors.telefono}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Correo Electrónico</label>
                      <input id="email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className={inputClasses('email')} placeholder="ejemplo@empresa.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="asunto" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Asunto</label>
                    <input id="asunto" type="text" name="asunto" autoComplete="off" value={formData.asunto} onChange={handleChange} className={inputClasses('asunto')} placeholder="Ej. Cotización de Maquinado CNC" />
                    {errors.asunto && <p className="text-red-500 text-xs mt-2">{errors.asunto}</p>}
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-xs font-bold text-zinc-100 uppercase tracking-widest mb-3">Mensaje / Especificaciones</label>
                    <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows="5" className={inputClasses('mensaje')} placeholder="Describa todo lo que necesite para su proyecto, como: el material, tolerancias, cantidad de piezas y cualquier otra especificación relevante." />
                    {errors.mensaje && <p className="text-red-500 text-xs mt-2">{errors.mensaje}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex justify-center items-center px-8 py-5 rounded-xl font-bold text-white transition-all duration-500 bg-zinc-900 border border-zinc-800 hover:bg-white hover:text-black overflow-hidden shadow-xl"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Solicitud
                          <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </m.div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}