import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react'; //
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Carga perezosa de componentes
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-950">
        <Navbar />
        <main className="flex-grow pt-16">
          <ScrollToTop />
          {/* Suspense muestra algo mientras carga la página */}
          <Suspense fallback={<div className="h-screen bg-zinc-950" />}>
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/quienes-somos" element={<About />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
