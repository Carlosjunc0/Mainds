import { useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";

const faqs = [
  {
    question: "¿Con qué materiales trabajan?",
    answer:
      "Trabajamos con una amplia variedad de materiales que incluyen aceros al carbono, aceros inoxidables, aluminio, latón, cobre, bronce y diversos plásticos de ingeniería (Nylamid, Delrin, Teflón). Nuestra maquinaria está calibrada para ofrecer la máxima precisión independientemente de la dureza del material.",
  },
  {
    question: "¿Realizan envíos?",
    answer:
      "Sí, enviamos a todo México y Estados Unidos. Contamos con logística especializada para garantizar que las piezas lleguen en perfecto estado, con embalaje industrial seguro y seguimiento en tiempo real de su pedido.",
  },
  {
    question: "¿Atienden urgencias de producción?",
    answer:
      "Entendemos lo crítico que es un paro de línea. Contamos con un servicio express de maquinado para urgencias con tiempos de respuesta reducidos. Nuestro equipo puede trabajar turnos extendidos para entregar refacciones críticas y evitar pérdidas en su producción.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-zinc-950/70 z-10"></div>
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/assets/img/hero_mobile.webp"
              />
              <img
                src="/assets/img/hero_desktop.webp"
                alt="Maquinados Industriales del Sur - Ingeniería de Precisión"
                className="w-full h-full object-cover"
                width="1920"
                height="1080"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Ingeniería de <span className="text-gradient">Precisión</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white mb-10 max-w-2xl mx-auto"
            >
              Soluciones complejas y piezas de alto rendimiento para la
              industria más exigente. Tolerancias milimétricas garantizadas.
            </m.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to="/servicios"
                className="w-full sm:w-auto px-8 py-4 rounded-md font-semibold text-white bg-gradient-to-b from-zinc-600 to-zinc-800 hover:from-zinc-500 hover:to-zinc-700 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] text-center"
              >
                Ver Servicios
              </Link>
              <Link
                to="/contacto"
                className="w-full sm:w-auto px-8 py-4 rounded-md font-semibold text-white bg-gradient-to-b from-zinc-600 to-zinc-800 hover:from-zinc-500 hover:to-zinc-700 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] text-center"
              >
                Cotizar Proyecto
              </Link>
            </div>
          </div>
        </section>

        {/* Z-Format Services Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="pt-10 text-3xl md:text-4xl font-bold text-white mb-4">
              Capacidad Instalada
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
          </div>

          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-10">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/assets/img/cnc_mobile.webp"
                />
                <img
                  src="/assets/img/cnc_desktop.webp"
                  alt="Fresado CNC"
                  width="600"
                  height="800"
                  className="rounded-xl shadow-2xl shadow-zinc-900/50 border border-zinc-800"
                  loading="lazy"
                />
              </picture>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Fresado CNC de Alta Precisión
              </h3>
              <p className="text-zinc-400 mb-6 text-lg">
                Equipados con centros de maquinado vertical VMC850E, ofrecemos
                fresado en múltiples ejes para geometrías complejas. Logramos
                acabados superficiales excepcionales y respetamos tolerancias
                estrechas requeridas por los sectores automotriz, aeroespacial y
                médico.
              </p>
              <Link
                to="/servicios"
                className="text-slate-300 hover:text-white font-medium flex items-center transition-colors"
              >
                Conocer más <span className="ml-2">→</span>
              </Link>
            </m.div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-10">
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/assets/img/tornos_mobile.webp"
                />
                <img
                  src="/assets/img/tornos_desktop.webp"
                  alt="Torneado CNC"
                  width="600"
                  height="800"
                  className="rounded-xl shadow-2xl shadow-zinc-900/50 border border-zinc-800"
                  loading="lazy"
                />
              </picture>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Torneado Industrial
              </h3>
              <p className="text-zinc-400 mb-6 text-lg">
                Nuestros tornos CNC y convencionales están preparados para la
                fabricación de ejes, flechas, poleas y bujes, manejando
                producción en serie o piezas únicas con repetibilidad
                inigualable.
              </p>
              <Link
                to="/servicios"
                className="text-slate-300 hover:text-white font-medium flex items-center transition-colors"
              >
                Conocer más <span className="ml-2">→</span>
              </Link>
            </m.div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-10">
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/assets/img/erosión_mobile.webp"
                />
                <img
                  src="/assets/img/erosión_desktop.webp"
                  alt="Corte por Hilo y Penetración EDM"
                  width="600"
                  height="800"
                  className="rounded-xl shadow-2xl shadow-zinc-900/50 border border-zinc-800"
                  loading="lazy"
                />
              </picture>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Corte por Hilo y Penetración EDM
              </h3>
              <p className="text-zinc-400 mb-6 text-lg">
                Nuestros equipos nos permiten alcanzar precisiones micrónicas y
                acabados superficiales de alta calidad. Especializados en
                materiales de alta dureza y geometrías intrincadas imposibles de
                lograr con mecanizado convencional. Ideal para la fabricación de
                moldes y matrices.
              </p>
              <Link
                to="/servicios"
                className="text-slate-300 hover:text-white font-medium flex items-center transition-colors"
              >
                Conocer más <span className="ml-2">→</span>
              </Link>
            </m.div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-10">
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/assets/img/soldadura_mobile.webp"
                />
                <img
                  src="/assets/img/soldadura_desktop.webp"
                  alt="Grabado Láser y Soldadura Especializada"
                  width="600"
                  height="800"
                  className="rounded-xl shadow-2xl shadow-zinc-900/50 border border-zinc-800"
                  loading="lazy"
                />
              </picture>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl font-bold text-slate-200 mb-4">
                Grabado Láser y Soldadura Especializada
              </h3>
              <p className="text-zinc-400 mb-6 text-lg">
                Contamos con tecnología de grabado láser de fibra para el
                grabado de logotipos, códigos QR, datos de trazabilidad y textos
                en diversos materiales, incluyendo plásticos y metales. Además,
                ofrecemos soluciones de soldadura especializada para
                reparaciones y fabricación de componentes únicos.
              </p>
              <Link
                to="/servicios"
                className="text-slate-300 hover:text-white font-medium flex items-center transition-colors"
              >
                Conocer más <span className="ml-2">→</span>
              </Link>
            </m.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-zinc-900/50 border-t border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-zinc-400">
                Todo lo que necesitas saber sobre nuestros procesos y logística.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl overflow-hidden transition-colors duration-300 hover:border-slate-600"
                >
                  <button
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    aria-label={`Ver respuesta a: ${faq.question}`}
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-slate-200 text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`text-zinc-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 pt-0 text-zinc-400 border-t border-zinc-700/50 mt-2">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <p className="py-4 text-center text-zinc-400 mt-4">
              ¿No aparece tu pregunta?{" "}
              <Link
                to="/contacto"
                className="text-slate-300 hover:text-white font-medium transition-colors"
              >
                Contáctanos
              </Link>
            </p>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}
