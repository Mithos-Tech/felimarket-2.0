import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check } from "lucide-react";
import { Product } from "../types";

interface PromoCardProps {
  product: Product;
  isFeatured?: boolean;
  onAdd: (product: Product) => void;
}

export default function PromoCard({ product, onAdd }: PromoCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        shadow: "0 30px 60px -12px rgba(0, 0, 0, 0.12)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex-shrink-0 w-full group bg-white rounded-[2.5rem] border border-forest/10 hover:border-forest/30 transition-colors duration-500 overflow-hidden shadow-sm"
    >
      {/* Image Container - Editorial Style */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream/20">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          className="w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Discount Badge - Floating over image */}
        <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-forest text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-forest/20">
          -15% OFF
        </div>

        {/* Gradient Overlay for better text legibility if needed, but here we use a split design */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Area */}
      <div className="p-8 space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-forest rounded-full" />
              <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-[0.2em]">Premium Selection</p>
            </div>
            <h3 className="font-display font-bold text-2xl text-forest-dark leading-tight group-hover:text-forest transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-baseline gap-3">
            <p className="font-display font-bold text-3xl text-charcoal">
              ${product.price.toFixed(2)}
            </p>
            <span className="text-sm text-charcoal/30 line-through font-bold">
              ${(product.price * 1.15).toFixed(2)}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          aria-label={`Añadir ${product.name} al carrito`}
          className={`w-full py-4 rounded-full flex items-center justify-center gap-3 font-bold text-sm shadow-xl transition-all duration-300 cursor-pointer select-none ${
            isAdded
              ? "bg-forest-dark text-white ring-2 ring-forest/30"
              : "bg-forest text-white hover:bg-forest-dark shadow-forest/10"
          }`}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-cream font-extrabold"
              >
                <Check size={18} strokeWidth={3} className="text-orange" />
                ¡Añadido al Carrito!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                Añadir al Carrito
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
