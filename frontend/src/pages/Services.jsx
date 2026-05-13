import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

// Iconos profesionales de Lucide
import Settings from 'lucide-react/dist/esm/icons/settings';
import Wrench from 'lucide-react/dist/esm/icons/wrench';
import Ruler from 'lucide-react/dist/esm/icons/ruler';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Tag from 'lucide-react/dist/esm/icons/tag';
import Flame from 'lucide-react/dist/esm/icons/flame';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

export default function Services() {
  const galleryImages = [
    '/assets/img/gallery/fixture de corte.webp',
    '/assets/img/gallery/milano.webp',
    '/assets/img/gallery/plato de corte.webp',
    '/assets/img/gallery/láminas.webp',
    '/assets/img/gallery/mordaza.webp',
    '/assets/img/gallery/aguja.webp',
    '/assets/img/gallery/validación de palanca.webp',
    '/assets/img/gallery/rosca.webp',
    '/assets/img/gallery/palets.webp',
    '/assets/img/gallery/muelas.webp',
    '/assets/img/gallery/prensa de ensamble.webp',
    '/assets/img/gallery/aplanador.webp',
    '/assets/img/gallery/ultem.webp',
    '/assets/img/gallery/maquina de ensamblaje.webp',
    '/assets/img/gallery/succión de residuos.webp',
  ];

  // Lógica del Carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, [galleryImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  /* --- INICIO DE NOTA: LÓGICA DE AUTO-REPRODUCCIÓN CADA 4 SEGUNDOS --- */
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);
  /* --- FIN DE NOTA: LÓGICA DE AUTO-REPRODUCCIÓN --- */

  const services = [
    {
      title: "Fresado CNC",
      icon: Settings,
      desc: "Centros de maquinado de alta velocidad para geometrías complejas. Especialistas en prototipado rápido y producción de moldes con tolerancias micrométricas.",
      link: "Cotizar Fresado"
    },
    {
      title: "Torneado de Precisión",
      icon: Wrench,
      desc: "Fabricación de componentes cilíndricos con acabados espejo. Dominamos roscados especiales y ajustes concéntricos en una amplia gama de metales y plásticos.",
      link: "Cotizar Torneado"
    },
    {
      title: "Diseño y Dibujo",
      icon: Ruler,
      desc: "Ingeniería inversa y modelado 3D avanzado en SolidWorks. Convertimos conceptos o piezas físicas desgastadas en planos digitales listos para manufactura.",
      link: "Solicitar Análisis"
    },
    {
      title: "Corte por Hilo y Electroerosión",
      icon: Zap,
      desc: "Maquinado por descarga eléctrica (EDM) para cortes de extrema dureza y precisión. Ideal para cavidades intrincadas y componentes aeroespaciales.",
      link: "Consultar EDM"
    },
    {
      title: "Grabado Láser",
      icon: Tag,
      desc: "Marcaje permanente de alta definición en metales y polímeros. Identificación de piezas mediante códigos QR, números de serie y logotipos corporativos.",
      link: "Cotizar Grabado"
    },
    {
      title: "Soldadura Especializada",
      icon: Flame,
      desc: "Uniones estructurales y de precisión mediante procesos TIG/MIG. Reparación de herramentales y ensambles metal-mecánicos con alta integridad estructural.",
      link: "Solicitar Soldadura"
    },
    {
      title: "Tratamientos Térmicos",
      icon: Layers,
      desc: "Optimización de propiedades mecánicas. Ofrecemos templado, revenido y acabados superficiales químicos para maximizar la durabilidad y resistencia al desgaste.",
      link: "Solicitar Tratamientos"
    },
    {
      title: "Integración y programación de PLC",
      icon: Cpu,
      desc: "Diseño de sistemas de control automático, programación de PLCs y desarrollo de interfaces hombre-máquina (HMI) para automatización industrial.",
      link: "Cotizar Programación"
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="w-full pb-10">

          {/* Header */}
          <section className="py-10 bg-zinc-900 border-b border-zinc-800 text-center px-4">
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Nuestros <span className="text-gradient">Servicios</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-400 max-w-2xl mx-auto"
            >
              Ingeniería de precisión y soluciones integrales de manufactura bajo estándares de calidad industrial.
            </m.p>
          </section>

          {/* Grid de Servicios */}
          <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 hover:border-slate-400 transition-all duration-500 group"
                >
                  <item.icon className="w-12 h-12 text-slate-400 mb-6 group-hover:text-white transition-colors" />
                  <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
                  <p className="text-zinc-400 mb-8 leading-relaxed h-24">{item.desc}</p>
                  <Link to="/contacto" className="inline-flex items-center text-xs font-bold text-slate-300 hover:text-white uppercase tracking-[0.2em] transition-all">
                    {item.link} <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </m.div>
              ))}
            </div>
          </section>

          {/* Carrusel Profesional */}
          <section className="py-10 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
            <div className="text-center max-w-7xl mx-auto px-4 mb-4">
              <h2 className="text-3xl font-bold text-white mb-2">Galería de Proyectos</h2>
              <div className="h-1 w-20 bg-slate-500 mx-auto rounded-full"></div>
            </div>

            <div className="relative max-w-3xl mx-auto px-4 group">
              {/* Contenedor Principal: Altura fija responsiva */}
              <div className="relative h-[300px] md:h-[550px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">

                <AnimatePresence mode="wait">
                  <m.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center p-2"
                  >
                    {/* Imagen con object-contain para no perder detalles */}
                    <img
                      src={galleryImages[currentIndex]}
                      alt={`Proyecto MAINDS ${currentIndex + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
                      loading="lazy"
                    />
                  </m.div>
                </AnimatePresence>

                {/* Controles de Navegación */}
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700 hover:bg-white hover:text-black transition-all pointer-events-auto shadow-xl"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700 hover:bg-white hover:text-black transition-all pointer-events-auto shadow-xl"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              {/* Info de la pieza */}
              <div className="text-center mt-4">
                <p className="text-zinc-500 text-xs tracking-widest uppercase">
                  Visualizando Proyecto {currentIndex + 1} de {galleryImages.length}
                </p>
              </div>

              {/* Indicadores (Dots) */}
              <div className="flex justify-center gap-1.5 mt-6">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 transition-all duration-500 rounded-full ${currentIndex === i ? 'w-10 bg-white' : 'w-2 bg-zinc-800'
                      }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="relative py-20 px-4 overflow-hidden">
            {/* Fondo con efecto de profundidad industrial */}
            <div className="absolute inset-0 bg-zinc-900/40 z-0"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/90 to-zinc-950 z-0"></div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-5xl mx-auto text-center"
            >
              <div className="inline-block px-4 py-1.5 mb-6 border border-zinc-700 rounded-full bg-zinc-900/50 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Consultoría Técnica Especializada
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ¿Tiene un <span className="text-gradient">desafío de manufactura</span> complejo?
              </h2>

              <p className="text-zinc-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
                Desde prototipos únicos hasta producción en serie. Nuestro equipo de ingenieros
                analizará sus requerimientos para optimizar costos y garantizar la precisión de cada pieza.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/contacto"
                  className="group relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-300 bg-zinc-900 border border-zinc-700 rounded-md hover:bg-white hover:text-black overflow-hidden"
                >
                  <span className="relative z-10">Contactar a Ingeniería</span>
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white transition-transform duration-300"></div>
                </Link>

                <a
                  href="mailto:maquinados.indelsur@gmail.com"
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-medium border-b border-zinc-800 hover:border-white pb-1"
                >
                  O envíe sus planos vía Email
                </a>
              </div>

              {/* Elementos decorativos de precisión */}
              <div className="mt-16 flex items-center justify-center gap-8 opacity-30 grayscale">
                <div className="text-[10px] tracking-widest uppercase text-zinc-100">ISO Standards compliance</div>
                <div className="h-px w-12 bg-zinc-800"></div>
                <div className="text-[10px] tracking-widest uppercase text-zinc-100">CNC Precision Guaranteed</div>
                <div className="h-px w-12 bg-zinc-800"></div>
                <div className="text-[10px] tracking-widest uppercase text-zinc-100">Rapid Prototyping</div>
              </div>
            </m.div>
          </section>

        </div>
      </m.div>
    </LazyMotion>
  );
}