import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ShoppingCart, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onNavClick: (id: string) => void;
}

export default function Navbar({ cartCount, onCartClick, onHomeClick, onNavClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtHero, setIsAtHero] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Transición suave: se muestra en el Hero y se desvanece suavemente al hacer scroll
    // Al volver arriba al hero, reaparece de forma suave y sin cortes bruscos.
    const atHero = latest <= 180;
    if (atHero !== isAtHero) {
      setIsAtHero(atHero);
    }

    // Si el usuario hace scroll lejos con el menú móvil abierto, se cierra suavemente
    if (latest > 300 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  const navLinks = [
    { name: "Ofertas", id: "ofertas" },
    { name: "Categorías", id: "categorias" },
    { name: "Catálogo", id: "catalogo" },
    { name: "Nosotros", id: "nosotros" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: isAtHero ? 0 : -25, 
          opacity: isAtHero ? 1 : 0,
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-4 md:py-6 flex items-center justify-between pointer-events-none gpu-layer"
      >
        {/* Logo and Brand Section (Left) */}
        <div 
          className={`flex items-center gap-3 group transition-opacity ${isAtHero ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`} 
          onClick={onHomeClick}
        >
          <motion.img
            src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775858768/logo_gree_xogg1l.svg"
            alt="Felimarket Logo"
            width="40"
            height="40"
            className="h-8 md:h-10 w-auto group-hover:rotate-6 transition-transform duration-300 drop-shadow-sm pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-forest drop-shadow-xs select-none">
            Felimarket
          </span>
        </div>

        {/* Navigation Links (Center Floating) - Mayúsculas y minúsculas */}
        <ul className={`hidden md:flex items-center gap-7 lg:gap-10 font-medium text-sm lg:text-[15px] normal-case tracking-normal text-forest/90 ${isAtHero ? "pointer-events-auto" : "pointer-events-none"}`}>
          {navLinks.map((link) => (
            <li 
              key={link.name}
              className="cursor-pointer hover:text-forest transition-colors relative group py-1.5 capitalize font-semibold tracking-wide"
              onClick={() => onNavClick(link.id)}
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-forest transition-all duration-300 group-hover:w-full rounded-full" />
            </li>
          ))}
        </ul>

        {/* Action Buttons (Right) */}
        <div className={`flex items-center gap-2 md:gap-3 ${isAtHero ? "pointer-events-auto" : "pointer-events-none"}`}>
          {/* Cart Button: Visible on desktop and tablet, inside menu on mobile */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onCartClick}
            aria-label="Ver carrito"
            className="hidden md:flex relative p-3 md:p-3.5 bg-forest text-cream rounded-full items-center justify-center shadow-lg shadow-forest/20 hover:shadow-forest/30 transition-shadow group pointer-events-auto"
          >
            <ShoppingCart size={19} strokeWidth={2.4} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu trigger */}
          <button 
            aria-label="Abrir menú"
            className="md:hidden relative p-2.5 text-forest hover:bg-forest/5 rounded-full transition-all pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            {/* Subtle cart counter dot on hamburger when items are in cart */}
            {!isMobileMenuOpen && cartCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange rounded-full border-2 border-white" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-forest/20 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="fixed top-5 left-4 right-4 p-5 sm:p-6 bg-white/98 backdrop-blur-2xl rounded-3xl border border-forest/10 shadow-[0_24px_48px_-12px_rgba(11,61,46,0.18)] z-50 pointer-events-auto md:hidden max-w-sm mx-auto"
            >
              {/* Internal Close Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="absolute top-4 right-4 p-2 bg-forest/5 text-forest hover:bg-forest/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center gap-4 pt-1">
                {/* Brand mini title */}
                <div className="flex items-center gap-2 self-start pl-1">
                  <img
                    src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775858768/logo_gree_xogg1l.svg"
                    alt="Logo"
                    width="24"
                    height="24"
                    className="h-6 w-auto"
                  />
                  <span className="font-display font-bold text-base text-forest">Felimarket</span>
                </div>

                {/* Compact Navigation Links */}
                <ul className="w-full space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="w-full"
                    >
                      <button
                        onClick={() => {
                          onNavClick(link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl text-lg font-display font-bold text-forest hover:bg-forest/5 active:bg-forest/10 transition-all text-center flex items-center justify-center group cursor-pointer"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-forest/20 transition-all group-hover:w-full" />
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Cart Action Button inside Mobile Menu */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onCartClick();
                  }}
                  className="w-full mt-1 py-3 px-4 rounded-2xl bg-forest text-cream font-bold text-sm flex items-center justify-between shadow-md hover:bg-forest-dark active:bg-forest-dark transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <ShoppingCart size={18} strokeWidth={2.4} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span>Ver Carrito</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                    {cartCount} {cartCount === 1 ? "artículo" : "artículos"}
                  </span>
                </motion.button>

                <div className="h-px bg-forest/10 w-2/3 my-1" />
                
                {/* Social icons */}
                <div className="flex justify-center gap-4">
                  {[
                    { icon: <Instagram size={17} />, label: "Instagram", href: "https://instagram.com" },
                    { icon: <Facebook size={17} />, label: "Facebook", href: "https://facebook.com" },
                    { icon: <Twitter size={17} />, label: "Twitter", href: "https://x.com" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + (i * 0.05) }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-xl bg-forest/5 flex items-center justify-center text-forest/70 border border-forest/5 hover:bg-forest hover:text-white transition-all duration-200"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

