import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface BentoItemProps {
  title: string;
  subtitle?: string;
  image: string;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export default function BentoItem({ 
  title, 
  image, 
  className = "", 
  onClick, 
  delay = 0 
}: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover="hover"
      onClick={onClick}
      className={`relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group cursor-pointer border border-forest/5 shadow-sm hover:shadow-xl transition-shadow duration-500 ${className}`}
    >
      {/* Image with Parallax Scale Effect */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.08 }
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          width="600"
          height="450"
          className="w-full h-full object-cover pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Elegant Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/20 to-transparent transition-opacity duration-500 group-hover:from-forest-dark/95" />
      
      {/* Content Container - Clean & Unobstructed */}
      <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
        <div className="flex justify-between items-end gap-4">
          <div className="space-y-1">
            <h3 className="text-white font-display font-bold text-3xl md:text-5xl leading-[0.95] tracking-tighter drop-shadow-sm">
              {title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h3>
          </div>

          <motion.div
            variants={{
              initial: { scale: 0.9, opacity: 0.85, rotate: -45 },
              hover: { scale: 1.05, opacity: 1, rotate: 0 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-14 h-14 md:w-16 md:h-16 bg-orange text-white rounded-full flex items-center justify-center shadow-xl shadow-orange/30 flex-shrink-0"
          >
            <ArrowUpRight size={28} className="md:w-8 md:h-8" />
          </motion.div>
        </div>
      </div>

      {/* Subtle Border Glow on Hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-forest/30 rounded-[2.5rem] md:rounded-[3rem] transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
