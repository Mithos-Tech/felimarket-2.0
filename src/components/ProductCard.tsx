import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  key?: string;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
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
        y: -10,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      className="group relative bg-white rounded-[2rem] border border-forest/5 hover:border-forest/20 flex flex-col overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-forest/5"
    >
      {/* Image Container - Square */}
      <div className="relative aspect-square overflow-hidden bg-cream/20">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
          className="w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-forest/5">
          <p className="text-[8px] text-forest-dark font-bold uppercase tracking-[0.2em]">{product.category}</p>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg leading-tight text-forest-dark group-hover:text-forest transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[9px] text-charcoal/40 font-bold uppercase tracking-[0.2em]">Premium Selection</p>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-forest/5">
          <p className="font-display font-bold text-xl text-charcoal">
            ${product.price.toFixed(2)}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
            className={`min-w-[84px] h-[34px] px-3.5 rounded-full font-bold text-[9px] uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-1 cursor-pointer select-none ${
              isAdded 
                ? "bg-forest-dark text-white ring-2 ring-forest/30 scale-105" 
                : "bg-forest text-cream hover:bg-forest-dark hover:text-white shadow-forest/10"
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-1 text-cream font-extrabold"
                >
                  <Check size={13} strokeWidth={3} className="text-orange" />
                  <span>¡Listo!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Añadir
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
