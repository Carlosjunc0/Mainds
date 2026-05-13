import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
          <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <span className="text-white font-bold text-xl tracking-wider block">MAINDS</span>
            <span className="text-zinc-400 text-sm mt-1 block">Maquinados Industriales del Sur</span>
            <p className="mt-4 px-4 md:px-0 text-zinc-400 text-sm max-w-xs">
              Precisión milimétrica y soluciones complejas para la industria moderna. Calidad y servicio excepcionales.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-center">Enlaces Rápidos</h3>
            <ul className="space-y-2 flex flex-col items-center">
              <li><Link to="/" className="text-zinc-400 hover:text-slate-200 transition-colors text-sm">Inicio</Link></li>
              <li><Link to="/quienes-somos" className="text-zinc-400 hover:text-slate-200 transition-colors text-sm">Quiénes Somos</Link></li>
              <li><Link to="/servicios" className="text-zinc-400 hover:text-slate-200 transition-colors text-sm">Servicios</Link></li>
              <li><Link to="/contacto" className="text-zinc-400 hover:text-slate-200 transition-colors text-sm">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-center">Contacto</h3>
            {/* CORRECCIÓN: Estructura de lista válida (solo li dentro de ul) */}
            <ul className="space-y-4 text-sm text-zinc-400 flex flex-col items-center">
              <li>
                <a
                  href="https://www.facebook.com/people/Mainds/61588075344418/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  aria-label="Síguenos en Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>MAINDS</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:maquinados.indelsur@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>maquinados.indelsur@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>Reynosa, Tamaulipas, México</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-zinc-700 mt-8 pt-8 text-center text-zinc-300 text-xs">
          &copy; {new Date().getFullYear()} MAINDS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}