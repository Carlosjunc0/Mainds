import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/80 z-10"></div>
        <img 
          src="/assets/img/engineers_cnc_404_1778345711474.png" 
          alt="Ingenieros reparando CNC" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-600 mb-4 opacity-50 select-none">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-6">Error de Calibración</h2>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            Lo sentimos, la ruta solicitada no está disponible. Nuestros ingenieros están realizando ajustes de precisión en nuestras máquinas. Mientras tanto, regresemos a la línea de producción principal.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-4 rounded-md font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg shadow-gray-900/50"
          >
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
