import { m, LazyMotion, domAnimation } from 'framer-motion';

export default function About() {
  const acts = [
    {
      title: "Los Cimientos",
      description: "Nuestra historia comenzó con un pequeño torno manual y una gran visión: elevar el estándar de calidad en la fabricación industrial de la región. Enfrentamos desafíos técnicos y limitaciones de equipo, pero nuestro compromiso con la precisión y la atención al detalle sentó las bases de lo que seríamos. Cada pieza entregada era una promesa de excelencia.",
      year: "2004",
      // Rutas para imágenes optimizadas con FFmpeg
      imageDesktop: "/assets/img/historia1_desktop.webp",
      imageMobile: "/assets/img/historia1_mobile.webp"
    },
    {
      title: "La Evolución",
      description: "Comprendimos que para satisfacer las demandas de una industria cada vez más rigurosa, debíamos modernizarnos. Integramos nuestros primeros centros de maquinado CNC, capacitamos a nuestro personal en las últimas tecnologías CAD/CAM y establecimos protocolos de control de calidad estrictos. Fue una etapa de transformación profunda y aprendizaje continuo.",
      year: "2016",
      imageDesktop: "/assets/img/historia2_desktop.webp",
      imageMobile: "/assets/img/historia2_mobile.webp"
    },
    {
      title: "La Consolidación",
      description: "Hoy, MAINDS se erige como un referente de ingeniería de precisión. Nuestra capacidad instalada nos permite abordar proyectos de alta complejidad técnica para sectores críticos. Ya no solo fabricamos piezas; desarrollamos soluciones, optimizamos procesos y somos socios estratégicos en la cadena de suministro de nuestros clientes.",
      year: new Date().getFullYear().toString(),
      imageDesktop: "/assets/img/cnc_desktop.webp",
      imageMobile: "/assets/img/cnc_mobile.webp"
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full pb-10">
        {/* Header */}
        <section className="py-10 bg-zinc-900 border-b border-zinc-800 text-center px-4">
          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Nuestra <span className="text-gradient">Historia</span>
          </m.h1>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            De un taller artesanal a un complejo industrial de precisión.
          </m.p>
        </section>

        {/* Timeline */}
        <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-zinc-800 top-0 hidden md:block"></div>
          
          <div className="space-y-16">
            {acts.map((act, index) => (
              <m.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-center justify-between gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Texto */}
                <div className="md:w-5/12 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-slate-200 mb-2">{act.title}</h2>
                  <span className="text-sm font-bold text-zinc-400 block mb-4 tracking-widest">{act.year}</span>
                  <p className="text-zinc-300 leading-relaxed text-lg">{act.description}</p>
                </div>

                {/* Imagen Responsiva */}
                <div className="md:w-5/12 w-full">
                  <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
                    <picture>
                      {/* Carga imagen móvil (600x400 sugerido) para pantallas pequeñas */}
                      <source 
                        media="(max-width: 767px)" 
                        srcSet={act.imageMobile} 
                      />
                      {/* Carga imagen desktop (1000x600 sugerido) para pantallas grandes */}
                      <img 
                        src={act.imageDesktop} 
                        alt={act.title}
                        width="1000"
                        height="600"
                        loading="lazy" 
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}