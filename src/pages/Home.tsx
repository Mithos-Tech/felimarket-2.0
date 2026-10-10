import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sprout, 
  ShieldCheck, 
  Truck, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowUp,
  Lock,
  Sparkles,
  Scale,
  FileText,
  Cookie,
  Check
} from "lucide-react";
import BentoItem from "../components/BentoItem";
import ProductCard from "../components/ProductCard";
import PromoCard from "../components/PromoCard";
import { Product, LegalSectionId } from "../types";

const PROMO_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Fresas Silvestres",
    price: 5.50,
    category: "Frutas",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/fresas_tt7xp7.webp",
  },
  {
    id: "p2",
    name: "Aguacate Hass Orgánico",
    price: 4.90,
    category: "Verduras",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/aguacate_qinglp.webp",
  },
  {
    id: "p3",
    name: "Miel de Abeja Artesanal",
    price: 12.80,
    category: "Abarrotes",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880206/miel_de_abeja_fom5om.webp",
  },
  {
    id: "p4",
    name: "Uvas de Viñedo",
    price: 6.20,
    category: "Frutas",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883332/uvas_pzscnk.webp",
  },
  {
    id: "p5",
    name: "Leche Fresca Premium",
    price: 3.80,
    category: "Frescos",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883332/leche_iecrby.webp",
  },
  {
    id: "p6",
    name: "Queso de Cabra",
    price: 9.80,
    category: "Frescos",
    image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883332/queso_butg4r.webp",
  },
];

const ALL_PRODUCTS: Product[] = [
  // Frutas (4)
  { id: "f1", name: "Arándanos Azules", price: 7.20, category: "Frutas", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/arandanos_hb90vf.webp" },
  { id: "f2", name: "Limones Amarillos", price: 2.80, category: "Frutas", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880206/limones_bksqif.webp" },
  { id: "f3", name: "Manzanas Gala", price: 3.50, category: "Frutas", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880206/manzanas_qdcggb.webp" },
  { id: "f4", name: "Plátanos Orgánicos", price: 1.90, category: "Frutas", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880210/platanos_slsbge.webp" },
  
  // Verduras (4)
  { id: "v1", name: "Albahaca Fresca", price: 1.50, category: "Verduras", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/albahaca_ykawlj.webp" },
  { id: "v2", name: "Pimientos de Colores", price: 4.20, category: "Verduras", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880209/pimientos_tbodr7.webp" },
  { id: "v3", name: "Tomates Cherry", price: 3.80, category: "Verduras", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880209/tomates_otpsgs.webp" },
  { id: "v4", name: "Zanahorias con Tallo", price: 3.20, category: "Verduras", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880209/zanahorias_h4qudc.webp" },

  // Abarrotes (2)
  { id: "d1", name: "Aceite de Oliva Virgen", price: 18.50, category: "Abarrotes", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/aceite_de_olivo_obyumt.webp" },
  { id: "d2", name: "Mix de Frutos Secos", price: 9.50, category: "Abarrotes", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/frutos_secos_g8owiz.webp" },

  // Otros (2)
  { id: "o1", name: "Pan de Masa Madre", price: 6.40, category: "Panadería", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880208/pan_de_masa_hlfjcd.webp" },
  { id: "o2", name: "Huevos de Pastoreo", price: 8.90, category: "Frescos", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880206/huevos_yjzny8.webp" },
];

const CATEGORIES = ["Todos", "Frutas", "Verduras", "Abarrotes", "Panadería", "Frescos"];

interface HomeProps {
  onAddToCart: (product: Product) => void;
  onNavigateLegal: (section: LegalSectionId) => void;
  targetSection?: string | null;
  onTargetSectionScrolled?: () => void;
}

export default function Home({ onAddToCart, onNavigateLegal, targetSection, onTargetSectionScrolled }: HomeProps) {
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");
  const promoScrollRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // Cross-page navigation listener: Scrolls to requested section reliably when arriving from another page
  useEffect(() => {
    if (!targetSection) return;

    let timeoutId: number;
    let attempts = 0;
    const maxAttempts = 30; // 30 * 50ms = 1.5 seconds maximum search window

    const checkAndScroll = () => {
      attempts++;
      const el = document.getElementById(targetSection);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        });
        onTargetSectionScrolled?.();
      } else if (attempts < maxAttempts) {
        timeoutId = window.setTimeout(checkAndScroll, 50);
      } else {
        onTargetSectionScrolled?.();
      }
    };

    // Small delay ensures DOM painting and initial layout calculation are complete
    timeoutId = window.setTimeout(checkAndScroll, 60);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [targetSection, onTargetSectionScrolled]);

  const openLegal = (tab: LegalSectionId) => {
    onNavigateLegal(tab);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  const filteredProducts = activeCategory === "Todos" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const container = ref.current;
      const firstChild = container.firstElementChild as HTMLElement | null;
      if (firstChild) {
        const itemWidth = firstChild.getBoundingClientRect().width;
        const gap = 32; // gap-8 is 32px
        const scrollStep = itemWidth + gap;
        const targetScroll = direction === "left" 
          ? container.scrollLeft - scrollStep 
          : container.scrollLeft + scrollStep;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      } else {
        const { scrollLeft, clientWidth } = container;
        const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        container.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    }
  };

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-26 sm:pt-24 space-y-24 sm:space-y-32">
      <div className="px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {/* Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col space-y-7 sm:space-y-8 lg:space-y-10 z-10 order-1 pt-4 sm:pt-2 md:pt-4">
          <div className="space-y-4 sm:space-y-5 mt-2 sm:mt-0">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-forest-dark tracking-tighter"
            >
              Despierta con <br />
              <span className="italic font-medium text-forest">Frescura Real.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-charcoal/70 max-w-md font-medium leading-relaxed"
            >
              <span className="sm:hidden">Cosecha fresca a diario para tu mesa con sabor auténtico.</span>
              <span className="hidden sm:inline">Cosecha del campo seleccionada a diario para llenar tu mesa de sabor auténtico y aromas puros.</span>
            </motion.p>
          </div>

          {/* Mobile Image - Only visible on small screens */}
          <div className="lg:hidden relative h-[300px] sm:h-[320px] flex items-center justify-center my-1 sm:my-0 pointer-events-none select-none">
            {/* Background Glow Anchor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-forest/5 blur-[50px] rounded-full pointer-events-none" />
            
            {/* Layer 2: Floating Elements (Background) */}
            <div className="absolute inset-0 z-0 -top-8 pointer-events-none">
              <img
                src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775768681/hero_02_sgrx8o.png"
                alt="Floating Elements"
                width="360"
                height="320"
                decoding="async"
                className="w-full h-full object-contain opacity-50 scale-105 pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Layer 1: Shopping Bag (Foreground) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none select-none"
            >
              <img
                src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775768681/hero_01_j03xuw.png"
                alt="Felimarket Bag"
                width="320"
                height="320"
                fetchPriority="high"
                decoding="sync"
                className="w-[78%] h-full object-contain drop-shadow-[0_16px_32px_rgba(11,61,46,0.15)] pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 pt-1"
          >
            <button 
              onClick={() => productsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-forest text-cream rounded-full font-bold text-sm sm:text-base hover:bg-forest-dark hover:shadow-xl hover:shadow-forest/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto shadow-md cursor-pointer text-center"
            >
              Comprar Ahora
            </button>
            <button 
              onClick={() => productsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-white/90 hover:bg-white text-forest-dark border border-forest/20 hover:border-forest rounded-full font-bold text-sm sm:text-base hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto cursor-pointer text-center"
            >
              Ver Catálogo
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6 pt-10 border-t border-forest/5"
          >
            <div className="flex -space-x-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-cream bg-forest/10 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${i}`} 
                    alt={`Cliente verificado ${i}`} 
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-forest/60 uppercase tracking-[0.2em]">
              +2,000 Clientes Satisfechos
            </p>
          </motion.div>
        </div>

        {/* Desktop Image - Only visible on large screens */}
        <div className="hidden lg:flex relative h-[700px] items-center justify-center order-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-forest/5 blur-[100px] rounded-full" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0 -top-20 pointer-events-none select-none"
          >
            <motion.img
              animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775768681/hero_02_sgrx8o.png"
              alt="Floating Elements"
              width="600"
              height="700"
              decoding="async"
              className="w-full h-full object-contain opacity-80 pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none select-none"
          >
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775768681/hero_01_j03xuw.png"
              alt="Felimarket Bag"
              width="600"
              height="600"
              fetchPriority="high"
              decoding="sync"
              className="w-[85%] h-full object-contain drop-shadow-[0_25px_50px_rgba(11,61,46,0.15)] pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Promotions Section - New */}
      <section id="ofertas" className="relative space-y-10 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-4xl font-display font-bold text-forest-dark">Ofertas de Temporada</h2>
            <p className="text-charcoal/60 font-medium">Selección fresca con 15% de descuento directo.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll(promoScrollRef, "left")}
              aria-label="Ver ofertas anteriores"
              className="w-12 h-12 rounded-full border border-forest/15 bg-white/70 hover:bg-forest hover:text-white hover:border-forest flex items-center justify-center text-forest-dark transition-all duration-300 active:scale-90 shadow-xs cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll(promoScrollRef, "right")}
              aria-label="Ver siguientes ofertas"
              className="w-12 h-12 rounded-full border border-forest/15 bg-white/70 hover:bg-forest hover:text-white hover:border-forest flex items-center justify-center text-forest-dark transition-all duration-300 active:scale-90 shadow-xs cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={promoScrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pt-6 pb-8 -mt-6 no-scrollbar"
        >
          {PROMO_PRODUCTS.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[calc((100%-4rem)/3)]">
              <PromoCard 
                product={product} 
                onAdd={onAddToCart}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <section id="categorias" className="space-y-8 scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-forest-dark kerning-tight">Explora por Categoría</h2>
          <p className="text-charcoal/60 font-medium mt-2">Seleccionamos lo mejor para cada rincón de tu hogar.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          <BentoItem
            title="Frutas Frescas"
            image="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883333/frutas_hdvsdi.webp"
            className="md:col-span-2 md:row-span-1"
            onClick={() => handleCategoryClick("Frutas")}
            delay={0}
          />
          <BentoItem
            title="Abarrotes"
            image="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883333/abarrotes_v4qkhg.webp"
            className="md:col-span-1 md:row-span-2"
            onClick={() => handleCategoryClick("Abarrotes")}
            delay={0.1}
          />
          <BentoItem
            title="Panadería"
            image="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883332/panaderia_m0mp33.webp"
            className="md:col-span-1 md:row-span-1"
            onClick={() => handleCategoryClick("Panadería")}
            delay={0.2}
          />
          <BentoItem
            title="Verduras"
            image="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775883333/verduras_ma2ceg.webp"
            className="md:col-span-1 md:row-span-1"
            onClick={() => handleCategoryClick("Verduras")}
            delay={0.3}
          />
        </div>
      </section>

      {/* Our Process Section - Original Design Restored */}
      <section id="nosotros" className="relative py-16 sm:py-24 bg-forest/5 -mx-3 sm:-mx-6 px-4 sm:px-6 rounded-3xl sm:rounded-[4rem] border border-forest/15 overflow-hidden scroll-mt-24">
        {/* Background Pattern Layer - High Res Integration */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ 
            backgroundImage: 'url(https://res.cloudinary.com/dkoshgzxo/image/upload/v1775848782/back_one_jjmehb.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%', // Adjusted to hide the bottom line
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.05)' // Slight scale to ensure edges are hidden
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 bg-white rounded-3xl shadow-sm mb-4"
          >
            <span className="text-orange font-bold uppercase tracking-widest text-xs">Nuestro Compromiso</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold kerning-tight leading-tight text-forest">
            Del campo a tu mesa en <span className="text-orange">menos de 24h</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
            {[
              { 
                icon: <Sprout size={48} />, 
                title: "Cosecha Ética", 
                desc: "Trabajamos con agricultores locales que respetan los ciclos naturales de la tierra." 
              },
              { 
                icon: <ShieldCheck size={48} />, 
                title: "Selección Premium", 
                desc: "Cada producto es inspeccionado manualmente para asegurar la máxima calidad y frescura." 
              },
              { 
                icon: <Truck size={48} />, 
                title: "Entrega Express", 
                desc: "Logística inteligente para que recibas tus productos en tiempo récord, menos de 24h." 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="space-y-4"
              >
                <div className="text-orange flex justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-forest-dark">{item.title}</h3>
                <p className="text-charcoal/70 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Filtered Gallery */}
      <section id="catalogo" ref={productsSectionRef} className="space-y-12 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-dark kerning-tight">Nuestra Selección</h2>
            <p className="text-charcoal/60 font-medium mt-2">Explora lo mejor de cada categoría</p>
          </div>
          
          {/* Framer-style refined segmented tabs (reduced curve, subtle border, smooth hover) */}
          <div className="w-full sm:w-auto p-1.5 bg-forest/[0.04] backdrop-blur-md rounded-2xl border border-forest/10 shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none
                    ${isActive 
                      ? "bg-forest text-cream shadow-sm shadow-forest/20 font-bold" 
                      : "text-forest/70 hover:text-forest hover:bg-forest/5"}
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout="position"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ 
                  duration: 0.35, 
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <ProductCard 
                  product={product} 
                  onAdd={onAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden rounded-[4rem] bg-forest p-12 md:p-24 text-cream">
        {/* Background Pattern Layer */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none mix-blend-soft-light"
          style={{ 
            backgroundImage: 'url(https://res.cloudinary.com/dkoshgzxo/image/upload/v1775848781/back_two_zjychv.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-orange/20 rounded-full blur-3xl pointer-events-none"
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-cream border border-white/20">
            <Sparkles size={14} className="text-orange" />
            Comunidad Exclusiva 2026
          </div>
          <h2 className="text-5xl md:text-6xl font-bold kerning-tight">Únete al Club Fresh</h2>
          <p className="text-cream/80 text-lg font-medium leading-relaxed">
            Recibe recetas exclusivas, novedades de cosecha de temporada y un 10% de descuento en tu primer pedido.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus === "error") setNewsletterStatus("idle");
                }}
                placeholder="tu@correo-seguro.com" 
                aria-label="Correo electrónico para boletín"
                required
                className="flex-1 px-8 py-4 bg-white/15 border border-white/25 rounded-full text-cream placeholder:text-cream/50 focus:outline-none focus:border-white focus:bg-white/25 transition-all text-sm font-medium"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-orange text-white rounded-full font-bold hover:bg-white hover:text-forest-dark transition-all duration-300 shadow-lg text-sm shrink-0 cursor-pointer"
              >
                Suscribirme
              </button>
            </div>
            
            {newsletterStatus === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-xs sm:text-sm font-bold text-cream flex items-center justify-center gap-2 border border-white/30"
              >
                <Check size={16} /> ¡Bienvenido al Club! Tu cupón del 10% ha sido activado.
              </motion.div>
            )}

            {newsletterStatus === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/30 backdrop-blur-md rounded-2xl text-xs sm:text-sm font-bold text-cream"
              >
                Por favor ingresa un correo electrónico válido.
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-cream/60">
              <Lock size={12} />
              <span>Privacidad garantizada bajo normativa 2026. Cero spam y desuscripción instantánea.</span>
            </div>
          </form>
        </div>
      </section>

      </div>

      {/* Footer - Full Width Edge-to-Edge */}
      <footer className="text-charcoal pt-24 sm:pt-32 pb-12 px-6 border-t border-forest/10 bg-forest/[0.02]">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://res.cloudinary.com/dkoshgzxo/image/upload/v1775858768/logo_gree_xogg1l.svg" 
                    alt="Felimarket Logo" 
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="h-9 sm:h-10 w-auto"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-display font-bold text-2xl tracking-tight text-forest-dark">Felimarket</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-forest/10 rounded-full w-fit border border-forest/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-forest"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-forest-dark">Envíos activos hoy</span>
                </div>
              </div>

              {/* Simplified & professional subtitle */}
              <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed font-medium max-w-xs">
                Alimentos frescos de origen responsable, directo del campo a tu mesa.
              </p>

              {/* Real social profile links with no jumping anchors */}
              <div className="flex gap-2.5 pt-1">
                {[
                  { icon: <Instagram size={17} />, label: "Instagram", href: "https://instagram.com" },
                  { icon: <Facebook size={17} />, label: "Facebook", href: "https://facebook.com" },
                  { icon: <Twitter size={17} />, label: "Twitter", href: "https://twitter.com" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, backgroundColor: "#0B3D2E", color: "#FDFBF7" }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-forest/5 flex items-center justify-center text-forest/70 transition-all duration-300 border border-forest/10 hover:border-forest/30"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Column - Strictly Real Defined Sections */}
            <div className="space-y-5 sm:space-y-6">
              <p className="font-bold uppercase text-[11px] tracking-[0.25em] text-forest-dark">Navegación</p>
              <ul className="space-y-3">
                {[
                  { name: "Ofertas Flash", id: "ofertas" },
                  { name: "Categorías", id: "categorias" },
                  { name: "Catálogo de Productos", id: "catalogo" },
                  { name: "Sobre Nosotros", id: "nosotros" }
                ].map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollToSection(e, item.id)}
                      className="text-xs sm:text-sm font-bold text-charcoal/65 hover:text-forest transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-forest scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Compliance Column - Verified Legal Section Modals */}
            <div className="space-y-5 sm:space-y-6">
              <p className="font-bold uppercase text-[11px] tracking-[0.25em] text-forest-dark">Marco Legal y Transparencia</p>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-charcoal/80">
                <li>
                  <button 
                    onClick={() => openLegal("ia-transparency")}
                    className="w-full text-left p-2 -ml-2 rounded-xl hover:bg-forest/5 hover:text-forest transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={15} className="text-forest group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-bold">Transparencia y Algoritmos IA</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal("privacidad")}
                    className="w-full text-left p-2 -ml-2 rounded-xl hover:bg-forest/5 hover:text-forest transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={15} className="text-forest group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-bold">Privacidad y Protección de Datos</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal("terminos")}
                    className="w-full text-left p-2 -ml-2 rounded-xl hover:bg-forest/5 hover:text-forest transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={15} className="text-forest group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-bold">Términos y Condiciones</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal("cookies")}
                    className="w-full text-left p-2 -ml-2 rounded-xl hover:bg-forest/5 hover:text-forest transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cookie size={15} className="text-forest group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-bold">Política de Cookies</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLegal("garantia")}
                    className="w-full text-left p-2 -ml-2 rounded-xl hover:bg-forest/5 hover:text-forest transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck size={15} className="text-forest group-hover:scale-110 transition-transform shrink-0" />
                      <span className="font-bold">Devoluciones y Garantía</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column - Direct Functional Contact Channels */}
            <div className="space-y-5 sm:space-y-6">
              <p className="font-bold uppercase text-[11px] tracking-[0.25em] text-forest-dark">Contacto Directo</p>
              <div className="space-y-3.5 text-xs sm:text-sm font-semibold text-charcoal/70">
                <p>
                  <a 
                    href="mailto:hola@felimarket.com" 
                    className="hover:text-forest transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-forest/60 group-hover:text-forest font-normal text-xs">Email:</span>
                    <span className="font-bold text-charcoal/80 group-hover:text-forest">hola@felimarket.com</span>
                  </a>
                </p>
                <p>
                  <a 
                    href="tel:+51987654321" 
                    className="hover:text-forest transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-forest/60 group-hover:text-forest font-normal text-xs">Teléfono:</span>
                    <span className="font-bold text-charcoal/80 group-hover:text-forest">+51 987 654 321</span>
                  </a>
                </p>
                <p className="leading-relaxed text-charcoal/60 text-xs">
                  <span className="block font-bold text-charcoal/80 mb-0.5">Sede Central:</span>
                  Av. Frescura 123, San Isidro, Lima, Perú
                </p>
                <div className="pt-1 text-[11px] text-charcoal/50 font-medium">
                  Atención: Lun - Dom, 7:00 am - 10:00 pm
                </div>
              </div>
            </div>
          </div>

          {/* Sub-footer Bar with Updated 2026 Inspirio Studio Credits */}
          <div className="pt-8 sm:pt-10 border-t border-forest/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-[13px] text-charcoal/60 font-medium">
                © 2026 Felimarket by <span className="font-bold text-forest-dark">Inspirio Studio</span>. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Volver arriba"
                title="Volver arriba"
                className="w-10 h-10 rounded-full border border-forest/20 bg-white/60 hover:bg-forest/10 hover:border-forest flex items-center justify-center text-forest-dark transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
              >
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
