import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Check, X, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Legal from "./pages/Legal";
import { Product, CartItem, LegalSectionId } from "./types";

type Page = "home" | "checkout" | "legal";

interface CartToast {
  id: number;
  productName: string;
  productImage: string;
  count: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [legalSection, setLegalSection] = useState<LegalSectionId>("ia-transparency");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartToast, setCartToast] = useState<CartToast | null>(null);

  // Cloud & Performance Guarantee: Disable browser erratic scroll restoration and ensure clean top-load
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Clean initial boot: guarantee starting on Home at scrollY: 0
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [currentPage]);

  // Initial mount audit: guarantee starting on Home, clear any residual broken hash if on root
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hash && window.location.hash !== "#hero" && window.location.hash !== "#catalogo" && window.location.hash !== "#nosotros" && window.location.hash !== "#categorias" && window.location.hash !== "#contacto") {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Auto-dismiss cart toast after 3.8s
  useEffect(() => {
    if (!cartToast) return;
    const timer = setTimeout(() => {
      setCartToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [cartToast?.id]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Provide instant feedback notification
    setCartToast({
      id: Date.now(),
      productName: product.name,
      productImage: product.image,
      count: cart.reduce((acc, item) => acc + item.quantity, 0) + 1
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const [targetSection, setTargetSection] = useState<string | null>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigateToLegal = (section: LegalSectionId) => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLegalSection(section);
    setCurrentPage("legal");
  };

  const handleNavigateToHome = () => {
    setTargetSection(null);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setCurrentPage("home");
  };

  const scrollToSectionOnPage = (id: string, smooth: boolean = true) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: smooth ? "smooth" : "instant"
    });
    return true;
  };

  const handleNavClick = (id: string) => {
    if (currentPage === "home") {
      scrollToSectionOnPage(id, true);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setTargetSection(id);
      setCurrentPage("home");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Grain Texture Overlay */}
      <div className="bg-grain" />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-forest z-[60] origin-left pointer-events-none"
        style={{ scaleX }}
      />

      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          setCurrentPage("checkout");
        }}
        onHomeClick={handleNavigateToHome}
        onNavClick={handleNavClick}
      />

      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Home 
              onAddToCart={addToCart} 
              onNavigateLegal={handleNavigateToLegal}
              targetSection={targetSection}
              onTargetSectionScrolled={() => setTargetSection(null)}
            />
          </motion.main>
        )}

        {currentPage === "checkout" && (
          <motion.main
            key="checkout"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Checkout 
              cart={cart} 
              onUpdateQuantity={updateQuantity} 
              onRemove={removeFromCart}
              onAddToCart={addToCart}
              onBack={handleNavigateToHome}
              onNavigateLegal={handleNavigateToLegal}
              onNavigateSection={handleNavClick}
            />
          </motion.main>
        )}

        {currentPage === "legal" && (
          <motion.main
            key="legal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Legal 
              initialSection={legalSection} 
              onBack={handleNavigateToHome}
              onSelectSection={(sec) => setLegalSection(sec)}
              onNavigateSection={handleNavClick}
            />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Interactive Cart Toast Notification (Instant feedback when header is scrolled away) */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-forest-dark/95 backdrop-blur-xl text-cream border border-forest/20 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 max-w-[94vw] sm:max-w-md w-full"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/10 flex items-center justify-center">
              <img 
                src={cartToast.productImage} 
                alt={cartToast.productName} 
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[11px] text-cream/70 font-semibold">
                <Check size={12} className="text-orange" strokeWidth={3} />
                <span>Agregado a tu pedido</span>
              </div>
              <p className="text-sm font-bold text-white truncate">{cartToast.productName}</p>
            </div>

            <button
              onClick={() => {
                setCartToast(null);
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                setCurrentPage("checkout");
              }}
              className="px-3 py-1.5 bg-forest hover:bg-forest/80 text-cream border border-white/20 rounded-xl text-xs font-bold shrink-0 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Carrito ({cartToast.count})</span>
              <ArrowRight size={13} />
            </button>

            <button
              onClick={() => setCartToast(null)}
              className="p-1 text-cream/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar notificación"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

