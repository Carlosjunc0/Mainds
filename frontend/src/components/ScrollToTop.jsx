import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si no hay hash (id de sección), forzamos el scroll instantáneo al inicio
    if (!hash) {
      // Usamos 'instant' para evitar que Framer Motion detecte el recorrido
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", 
      });
    } else {
      // Si hay un hash (ej. #contacto), esperamos un poco a que el DOM cargue
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;