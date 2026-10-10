import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  X,
  FileText
} from "lucide-react";
import { CartItem, LegalSectionId } from "../types";

interface CheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onAddToCart: (product: any) => void;
  onBack: () => void;
  onNavigateLegal?: (section: LegalSectionId) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function Checkout({ cart, onUpdateQuantity, onRemove, onAddToCart, onBack, onNavigateLegal, onNavigateSection }: CheckoutProps) {
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [orderCode, setOrderCode] = useState("FLM-2026-DEMO");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.00;
  const total = subtotal + shipping;

  const handleProceedPayment = () => {
    if (cart.length === 0) return;
    const randomCode = `FLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(randomCode);
    setIsSimulatingPayment(true);
  };

  const openLegal = (tab: LegalSectionId) => {
    if (onNavigateLegal) {
      onNavigateLegal(tab);
    }
  };

  return (
    <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-charcoal/60 font-bold hover:text-forest transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft size={20} />
        Volver a la tienda
      </motion.button>

      {/* Security & Demo Sandbox Notice - Reassuring users that this is a safe demo */}
      <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-forest/10 border border-forest/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-forest text-cream shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-forest-dark text-xs sm:text-sm">Vista Previa de Demostración</span>
            </div>
            <p className="text-[11px] sm:text-xs text-charcoal/70 leading-relaxed">
              Esta pantalla es una muestra visual de la experiencia de compra. No requiere credenciales, no conecta bases de datos públicas ni captura tarjetas reales.
            </p>
          </div>
        </div>
        {onNavigateLegal && (
          <button
            onClick={() => onNavigateLegal("privacidad")}
            className="text-xs font-bold text-forest-dark hover:underline flex items-center gap-1 shrink-0 cursor-pointer pl-1 sm:pl-0"
          >
            <Lock size={12} className="text-forest" /> Ver Protocolo Legal
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-forest-dark tracking-tight">Tu Carrito</h1>
            <p className="text-xs sm:text-sm text-charcoal/70 font-medium">Revisa tus productos antes de finalizar la simulación.</p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-dashed border-forest/20 space-y-4"
                >
                  <p className="text-forest/70 font-medium text-sm sm:text-base">Tu carrito está vacío</p>
                  <button
                    onClick={() => onNavigateSection ? onNavigateSection("catalogo") : onBack()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-forest text-cream font-bold text-xs sm:text-sm rounded-full hover:bg-forest-dark transition-colors shadow-md cursor-pointer"
                  >
                    <span>Explorar Catálogo</span>
                  </button>
                </motion.div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3.5 sm:gap-6 p-3.5 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-forest/10 shadow-xs"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-cream shrink-0 border border-forest/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        width="80"
                        height="80"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-1">
                      <p className="text-[9px] sm:text-[10px] text-charcoal/40 font-bold uppercase tracking-wider">{item.category}</p>
                      <h3 className="font-display font-bold text-sm sm:text-lg text-forest-dark truncate">{item.name}</h3>
                      <p className="text-charcoal font-bold text-xs sm:text-sm">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 bg-forest/5 p-1 sm:p-1.5 rounded-xl border border-forest/10 shrink-0">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label={`Reducir cantidad de ${item.name}`}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:text-orange transition-colors cursor-pointer rounded-lg hover:bg-white"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="font-bold w-4 sm:w-5 text-center text-xs sm:text-sm text-charcoal">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:text-orange transition-colors cursor-pointer rounded-lg hover:bg-white"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemove(item.id)}
                      aria-label={`Eliminar ${item.name}`}
                      className="p-1.5 sm:p-2 text-forest/40 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="pt-8 sm:pt-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-dark">También te podría gustar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "f2", name: "Arándanos Azules", price: 7.20, category: "Frutas", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/arandanos_hb90vf.webp" },
                { id: "d1", name: "Aceite de Oliva", price: 18.50, category: "Abarrotes", image: "https://res.cloudinary.com/dkoshgzxo/image/upload/v1775880205/aceite_de_olivo_obyumt.webp" }
              ].map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-forest/10 hover:border-forest/20 transition-all shadow-xs"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream/40 shrink-0 border border-forest/5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      loading="lazy"
                      decoding="async"
                      width="56"
                      height="56"
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-forest-dark truncate">{item.name}</h4>
                    <p className="text-charcoal font-bold text-xs">${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item)}
                    aria-label={`Añadir ${item.name}`}
                    className="p-2 bg-forest/5 text-forest rounded-xl hover:bg-forest hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={15} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-5 sm:p-7 rounded-3xl lg:sticky lg:top-28 space-y-6 border border-forest/15 shadow-sm"
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-forest-dark">Resumen de Pago</h2>
            
            <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between text-charcoal/70 font-medium">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-charcoal/70 font-medium">
                <span>Envío</span>
                <span className="font-semibold text-charcoal">{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-forest/15 my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span className="text-forest-dark">Total</span>
                <span className="text-forest-dark">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleProceedPayment}
                disabled={cart.length === 0}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-forest hover:bg-forest-dark text-cream rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg shadow-forest/15 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <CreditCard size={18} className="shrink-0 text-cream/90" />
                <span>Simular Pedido</span>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-cream/90 shrink-0">
                  Demo
                </span>
              </motion.button>
              
              <div className="flex items-center justify-center gap-1.5 text-charcoal/50 text-[11px] font-medium text-center">
                <ShieldCheck size={13} className="text-forest shrink-0" />
                <span>Modo seguro • Cero captura de tarjetas</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-forest/5 rounded-2xl space-y-2 border border-forest/10">
              <p className="text-[11px] text-charcoal/60 leading-relaxed">
                * Envío gratis en pedidos superiores a $50.00. <br />
                * Entrega estimada: 30-45 minutos del campo a tu mesa.
              </p>
              <div className="pt-2 border-t border-forest/10 flex items-center justify-between text-[11px] font-bold text-forest-dark">
                <button 
                  onClick={() => openLegal("privacidad")}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Lock size={12} className="text-forest" />
                  Seguridad y Privacidad
                </button>
                <button 
                  onClick={() => openLegal("ia-transparency")}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={12} className="text-forest" />
                  Norma IA 2026
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simulated Secure Payment Modal */}
      <AnimatePresence>
        {isSimulatingPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSimulatingPayment(false)}
              className="fixed inset-0 bg-forest-dark/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-cream rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-forest/20 z-10 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-forest-dark">
                    Simulación de Pago Segura
                  </h3>
                </div>
                <button
                  onClick={() => setIsSimulatingPayment(false)}
                  aria-label="Cerrar modal"
                  className="w-8 h-8 rounded-full bg-forest/10 hover:bg-forest/20 flex items-center justify-center text-forest-dark transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-forest/10 border border-forest/15 space-y-1.5">
                <div className="flex items-center gap-2 text-forest-dark font-bold text-xs sm:text-sm">
                  <CheckCircle2 size={15} className="text-forest shrink-0" />
                  <span>Arquitectura Zero-Leak Activa</span>
                </div>
                <p className="text-[11px] sm:text-xs text-charcoal/70 leading-relaxed">
                  Para tu completa tranquilidad, esta demostración <strong>no solicita números de tarjeta reales ni almacena datos privados en servidores públicos</strong>.
                </p>
              </div>

              <div className="space-y-2.5 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-forest/10 text-xs sm:text-sm">
                <div className="flex justify-between text-charcoal/60">
                  <span>Código de Transacción:</span>
                  <span className="font-mono font-bold text-forest-dark">{orderCode}</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Artículos en el pedido:</span>
                  <span className="font-bold text-charcoal">{cart.reduce((a, b) => a + b.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between text-charcoal/60">
                  <span>Tiempo estimado:</span>
                  <span className="font-bold text-forest">35 minutos</span>
                </div>
                <div className="h-px bg-forest/10 my-1" />
                <div className="flex justify-between text-sm sm:text-base font-bold text-forest-dark">
                  <span>Monto Total:</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setIsSimulatingPayment(false);
                    onBack();
                  }}
                  className="flex-1 py-3 px-4 bg-forest text-cream rounded-xl font-semibold text-xs sm:text-sm hover:bg-forest-dark transition-colors shadow-md cursor-pointer text-center"
                >
                  Confirmar y Volver a Tienda
                </button>
                <button
                  onClick={() => {
                    setIsSimulatingPayment(false);
                    openLegal("privacidad");
                  }}
                  className="py-3 px-4 bg-white text-forest-dark border border-forest/20 rounded-xl font-semibold text-xs sm:text-sm hover:bg-forest/5 transition-colors cursor-pointer text-center"
                >
                  Ver Protocolo Legal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
