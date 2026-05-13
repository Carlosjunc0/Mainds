import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <header className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavLink to="/" className="flex flex-col" aria-label="MAINDS Inicio">
              <span className="text-white font-bold text-xl tracking-wider leading-none">MAINDS</span>
              <span className="text-zinc-400 text-xs mt-0.5">Maquinados Industriales del Sur</span>
            </NavLink>
            
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white border-b-2 border-slate-200' : 'text-zinc-400 hover:text-slate-200'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none p-2"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
            >
              <nav className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium w-full text-center transition-colors ${
                        isActive ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
