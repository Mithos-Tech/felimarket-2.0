import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Truck, 
  CheckCircle2, 
  Award, 
  Printer, 
  Mail, 
  ChevronRight, 
  ChevronDown,
  ArrowUp,
  Building2
} from "lucide-react";
import { LegalSectionId } from "../types";

interface LegalProps {
  initialSection?: LegalSectionId;
  onBack: () => void;
  onSelectSection?: (section: LegalSectionId) => void;
  onNavigateSection?: (sectionId: string) => void;
}

interface SectionDef {
  id: LegalSectionId;
  title: string;
  shortTitle: string;
  icon: typeof Sparkles;
  description: string;
}

const SECTIONS: SectionDef[] = [
  {
    id: "ia-transparency",
    title: "Transparencia y Normativa de Inteligencia Artificial (2026)",
    shortTitle: "Transparencia IA",
    icon: Sparkles,
    description: "Declaración de gobernanza, supervisión humana de Inspirio Studio y directivas éticas digitales."
  },
  {
    id: "privacidad",
    title: "Política de Privacidad y Seguridad (Zero-Leak)",
    shortTitle: "Privacidad & Seguridad",
    icon: ShieldCheck,
    description: "Protocolos de aislamiento de datos, ausencia de bases de datos públicas y derechos del usuario."
  },
  {
    id: "terminos",
    title: "Términos y Condiciones del Servicio",
    shortTitle: "Términos de Uso",
    icon: FileText,
    description: "Condiciones de navegación en la plataforma boutique, derechos de propiedad intelectual y licencias."
  },
  {
    id: "cookies",
    title: "Política de Cookies y Almacenamiento Local",
    shortTitle: "Cookies & Sesión",
    icon: Cookie,
    description: "Uso exclusivo de estado técnico local para el carrito. Sin cookies invasivas de terceros."
  },
  {
    id: "garantia",
    title: "Garantía de Frescura, Envíos Express y Devoluciones",
    shortTitle: "Garantía & Envíos",
    icon: Truck,
    description: "De la granja a tu mesa en menos de 24 horas. Estándares de calidad y reposición inmediata."
  }
];

export default function Legal({ initialSection = "ia-transparency", onBack, onSelectSection, onNavigateSection }: LegalProps) {
  const [activeSection, setActiveSection] = useState<LegalSectionId>(initialSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Guarantee that mounting or switching sections starts immediately at the top without scrolling through the previous page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const handleSectionChange = (id: LegalSectionId) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    if (onSelectSection) onSelectSection(id);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDef = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
  const CurrentIcon = currentDef.icon;

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-28 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-forest selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Breadcrumb & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest/10 pb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-charcoal/60">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-forest-dark hover:text-forest transition-colors font-bold group cursor-pointer"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver a la Tienda</span>
            </button>
            <span>/</span>
            <span className="text-forest-dark font-bold">Centro Legal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-forest/5 text-charcoal/70 hover:text-forest-dark border border-forest/15 text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Imprimir documento legal"
            >
              <Printer size={15} />
              <span>Imprimir Documento</span>
            </button>
          </div>
        </div>

        {/* Header (Clean, authoritative typography without tags/badges) */}
        <header className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-forest-dark tracking-tight leading-[1.15]">
            Transparencia, Privacidad & Cumplimiento Normativo
          </h1>
          
          <p className="text-sm sm:text-base text-charcoal/70 font-medium leading-relaxed">
            Portal regulatorio oficial de <strong>Felimarket</strong>. Como parte del ecosistema conceptualizado y desarrollado por <strong>Inspirio Studio</strong>, operamos bajo los más rigurosos estándares de seguridad informática, privacidad del usuario y directivas sobre gobernanza y transparencia en sistemas digitales.
          </p>
        </header>

        {/* Mobile / Tablet Static Navigation (Natural page flow, non-sticky, does not float or block reading) */}
        <nav 
          aria-label="Navegación de secciones legales"
          className="lg:hidden relative bg-white rounded-2xl border border-forest/15 shadow-xs p-3.5 space-y-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-forest-dark text-cream shrink-0">
                <CurrentIcon size={16} className="text-forest" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 block">
                  Documento actual
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-forest-dark truncate">
                  {currentDef.shortTitle}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-forest/10 hover:bg-forest/20 text-forest-dark font-bold text-xs transition-colors cursor-pointer shrink-0"
              aria-expanded={isMobileMenuOpen}
            >
              <span>{isMobileMenuOpen ? "Plegar" : "Cambiar sección"}</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`} 
              />
            </button>
          </div>

          {/* Quick-Tap Grid: All 5 sections clean and visible */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-2 border-t border-forest/10">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isCurrent = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSectionChange(section.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold text-left transition-all truncate cursor-pointer ${
                    isCurrent
                      ? "bg-forest-dark text-cream shadow-xs"
                      : "bg-forest/5 hover:bg-forest/10 text-charcoal/80 border border-forest/10"
                  }`}
                >
                  <Icon size={13} className="text-forest shrink-0" />
                  <span className="truncate">{section.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Expandable Detailed View */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-2 border-t border-forest/10 space-y-1.5 overflow-hidden"
              >
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isCurrent = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-forest-dark text-cream shadow-sm"
                          : "hover:bg-forest/5 text-charcoal/80 border border-forest/10 bg-cream/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isCurrent ? "bg-forest text-forest-dark" : "bg-forest/10 text-forest"
                        }`}>
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <span className={`block font-bold text-xs truncate ${
                            isCurrent ? "text-cream" : "text-forest-dark"
                          }`}>
                            {section.title}
                          </span>
                          <span className={`text-[10px] line-clamp-1 ${
                            isCurrent ? "text-cream/70" : "text-charcoal/50"
                          }`}>
                            {section.description}
                          </span>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] font-bold text-forest shrink-0">
                          Activo
                        </span>
                      ) : (
                        <ChevronRight size={14} className="text-charcoal/40 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Editorial Layout (Sidebar + Content Pane) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Desktop Left Sidebar Navigation (Single, canonical navigation) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 border border-forest/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-forest/10">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest-dark">
                  Secciones Legales
                </span>
                <span className="text-xs font-bold text-charcoal/40">5 Artículos</span>
              </div>

              <div className="space-y-1.5">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isCurrent = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-start gap-3.5 p-3.5 rounded-2xl text-left transition-all duration-200 group cursor-pointer ${
                        isCurrent
                          ? "bg-forest-dark text-cream shadow-md shadow-forest-dark/10"
                          : "hover:bg-forest/5 text-charcoal/70 hover:text-forest-dark"
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 transition-colors ${
                        isCurrent ? "bg-forest text-forest-dark" : "bg-forest/10 text-forest group-hover:bg-forest group-hover:text-cream"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-xs sm:text-sm truncate ${
                          isCurrent ? "text-cream" : "text-forest-dark"
                        }`}>
                          {section.shortTitle}
                        </p>
                        <p className={`text-[11px] leading-tight line-clamp-2 mt-1 ${
                          isCurrent ? "text-cream/70" : "text-charcoal/50"
                        }`}>
                          {section.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official Compliance Card */}
            <div className="bg-forest-dark text-cream rounded-[2rem] p-6 space-y-4 shadow-sm border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-forest text-forest-dark">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-cream">Inspirio Studio</h4>
                  <p className="text-xs text-cream/60">Gobernanza Digital & Propiedad Intelectual</p>
                </div>
              </div>

              <p className="text-xs text-cream/70 leading-relaxed">
                ¿Requieres auditoría técnica o tienes preguntas específicas sobre las políticas de esta versión interactiva?
              </p>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                <a 
                  href="mailto:legal@felimarket.com" 
                  className="flex items-center justify-between text-cream/80 hover:text-forest font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={14} className="text-forest" /> legal@felimarket.com
                  </span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Article Pane */}
          <main className="lg:col-span-8 space-y-8">
            <motion.article 
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-forest/15 shadow-sm space-y-8"
            >
              
              {/* Active Section Header (No artificial badges, only clean title) */}
              <div className="space-y-3 border-b border-forest/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-forest/15 text-forest-dark shrink-0">
                    <CurrentIcon size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-dark tracking-tight">
                    {currentDef.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/60 font-medium">
                  {currentDef.description}
                </p>
              </div>

              {/* Dynamic Content by Section */}
              {activeSection === "ia-transparency" && (
                <div className="space-y-8 text-charcoal/80 leading-relaxed text-sm sm:text-base">
                  <div className="p-5 rounded-2xl bg-forest/10 border border-forest/20 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-forest text-forest-dark shrink-0 mt-0.5">
                      <Sparkles size={22} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-forest-dark text-base sm:text-lg">
                        Compromiso de Transparencia de Inteligencia Artificial (Normativa 2026)
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/70">
                        En conformidad estricta con las directivas internacionales de regulación de sistemas digitales, el marco europeo de Inteligencia Artificial (EU AI Act) y las leyes de defensa al consumidor vigentes para 2026.
                      </p>
                    </div>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-forest" />
                      1. Naturaleza y Rol Asistencial de la IA en Felimarket
                    </h4>
                    <p>
                      En <strong>Felimarket</strong> creemos en la transparencia activa. Declaramos de manera pública y verificable que esta plataforma ha sido concebida, maquetada y prototipada haciendo uso de herramientas de asistencia de Inteligencia Artificial generativa para:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-charcoal/70">
                      <li>
                        <strong>Arquitectura Visual y Sistema de Diseño:</strong> Prototipado rápido de composiciones cromáticas, balances tipográficos duales (*Playfair Display* e *Inter*) y microinteracciones de físicas de resorte estilo Framer.
                      </li>
                      <li>
                        <strong>Redacción Editorial del Catálogo:</strong> Asistencia en la elaboración de descripciones botánicas y fichas de producto de mercado boutique, siempre bajo revisión y curaduría de estilo artesanal.
                      </li>
                      <li>
                        <strong>Gobernanza Humana Incondicional:</strong> Todo el código fuente en TypeScript, reglas de negocio, integración y decisiones de diseño están bajo la estricta dirección, autoría y responsabilidad humana del equipo de <strong>Inspirio Studio</strong>.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-forest" />
                      2. Soberanía de Datos: Cero Reentrenamiento Algorítmico
                    </h4>
                    <p>
                      Ningún dato suministrado por el visitante (búsquedas, productos añadidos a la cesta, direcciones simuladas o correos electrónicos para el boletín) es comercializado, transferido ni utilizado para reentrenar modelos fundacionales o algoritmos de machine learning de terceros. Mantenemos una política inquebrantable de soberanía y no compartición.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-forest" />
                      3. Equidad y Ausencia de Discriminación de Precios
                    </h4>
                    <p>
                      Rechazamos taxativamente los sistemas opacos de fijación dinámica de precios basados en el dispositivo del usuario, poder adquisitivo inferido o perfilamiento biométrico/conductual. Todos los precios exhibidos en Felimarket son universales, transparentes y equitativos para cualquier persona que visite la plataforma.
                    </p>
                  </section>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-forest/20 flex items-center gap-3 text-xs sm:text-sm">
                    <Award className="text-forest shrink-0" size={22} />
                    <div>
                      <span className="font-bold text-forest-dark block">Certificado de Cumplimiento Digital Ético</span>
                      <span className="text-charcoal/60">Auditado para la marca comercial Felimarket por Inspirio Studio.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "privacidad" && (
                <div className="space-y-8 text-charcoal/80 leading-relaxed text-sm sm:text-base">
                  <div className="p-5 rounded-2xl bg-forest/10 border border-forest/20 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-forest text-forest-dark shrink-0 mt-0.5">
                      <ShieldCheck size={22} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-forest-dark text-base sm:text-lg">
                        Arquitectura de Seguridad "Zero-Leak" (Protección Total)
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/70">
                        Diseñada específicamente para entornos de demostración y presentación comercial sin riesgo de ataques, filtraciones de datos ni exposición de información crítica.
                      </p>
                    </div>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">1. Cero Superficie de Ataque Público</h4>
                    <p>
                      A diferencia de plataformas convencionales que dejan paneles administrativos desatendidos o APIs con credenciales embebidas, Felimarket funciona en un esquema hermético:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-charcoal/70">
                      <li><strong>Sin endpoints administrativos expuestos:</strong> No existen URLs de prueba, rutas de login vulnerables ni bases de datos con contraseñas por defecto.</li>
                      <li><strong>Aislamiento de variables de entorno:</strong> La compilación de producción no empaqueta credenciales privadas en el bundle de JavaScript público.</li>
                      <li><strong>Ejecución en memoria local del navegador:</strong> Toda la persistencia del carrito opera en memoria local volátil y segura del dispositivo del cliente.</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">2. Simulación Segura de Pasarela de Pago</h4>
                    <p>
                      En esta versión interactiva de Felimarket, el botón "Proceder al Pago" ejecuta una simulación en sandbox controlado. <strong>Nunca se solicita, procesa ni almacena información de tarjetas de crédito o credenciales financieras reales</strong>, garantizando 100% de tranquilidad para evaluadores y usuarios.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">3. Ejercicio de Derechos del Titular (GDPR & Habeas Data 2026)</h4>
                    <p>
                      Usted mantiene la plena potestad sobre sus datos de contacto (por ejemplo, si se suscribe voluntariamente al boletín informativo Club Fresh). Puede solicitar la rectificación, baja inmediata o eliminación total de sus registros comunicándose directamente con nuestro Oficial de Privacidad:
                    </p>
                    <div className="p-4 rounded-2xl bg-white border border-forest/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs sm:text-sm">
                      <span className="text-forest-dark font-bold">Oficialía de Privacidad: legal@felimarket.com</span>
                      <span className="text-charcoal/50">Inspirio Studio Compliance</span>
                    </div>
                  </section>
                </div>
              )}

              {activeSection === "terminos" && (
                <div className="space-y-8 text-charcoal/80 leading-relaxed text-sm sm:text-base">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-forest-dark">Términos y Condiciones del Servicio</h3>
                    <p className="text-charcoal/70">
                      El presente documento establece las condiciones que rigen el acceso y uso de la plataforma web de comercio boutique <strong>Felimarket</strong>.
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">1. Objeto y Alcance del Sitio</h4>
                    <p>
                      Felimarket es una plataforma digital boutique creada para conectar la frescura del campo y la producción orgánica local con consumidores que valoran la excelencia gastronómica y el bienestar. En su fase demostrativa actual, tiene como finalidad exhibir los más altos estándares de diseño, arquitectura y usabilidad concebidos por <strong>Inspirio Studio</strong>.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">2. Propiedad Intelectual y Derechos Reservados</h4>
                    <p>
                      La totalidad de los elementos que integran este sitio web —incluyendo pero no limitándose a: código fuente, código compilado, logotipos, combinaciones cromáticas, dirección de arte, elementos flotantes, ilustraciones, composiciones tipográficas y metodologías interactivas— son propiedad intelectual exclusiva de <strong>Inspirio Studio</strong> y <strong>Felimarket</strong>.
                    </p>
                    <p className="text-xs text-charcoal/60 bg-forest/5 p-4 rounded-2xl border border-forest/10">
                      Queda estrictamente prohibida su copia no autorizada, ingeniería inversa, extracción masiva de datos (scraping) o explotación comercial sin el consentimiento previo y por escrito de Inspirio Studio.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-lg">3. Uso Aceptable de la Plataforma</h4>
                    <p>
                      El usuario se compromete a hacer uso de los servicios y funcionalidades de buena fe, absteniéndose de ejecutar ataques de denegación de servicio, inyecciones de código o cualquier conducta susceptible de degradar la experiencia de otros visitantes.
                    </p>
                  </section>
                </div>
              )}

              {activeSection === "cookies" && (
                <div className="space-y-8 text-charcoal/80 leading-relaxed text-sm sm:text-base">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-forest-dark">Política de Cookies y Tecnologías de Estado Local</h3>
                    <p className="text-charcoal/70">
                      En coherencia con nuestros principios éticos, en Felimarket <strong>no instalamos rastreadores de vigilancia masiva ni cookies publicitarias de terceros</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-forest/15 space-y-2 shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-forest-dark">
                        <CheckCircle2 size={16} className="text-forest" />
                        <span>Cookies Esenciales & Sesión</span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/70">
                        Permiten mantener activos los artículos de tu carrito de compras mientras exploras las distintas categorías del mercado sin perder tu selección.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-forest/15 space-y-2 shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-forest-dark">
                        <CheckCircle2 size={16} className="text-forest" />
                        <span>Preferencia de Navegación</span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/70">
                        Recuerdan tu categoría activa en el catálogo para ofrecerte una transición visual instantánea y sin fricción.
                      </p>
                    </div>
                  </div>

                  <section className="space-y-3">
                    <h4 className="font-bold text-forest-dark text-base sm:text-lg">¿Cómo limpiar estos datos?</h4>
                    <p className="text-sm text-charcoal/70">
                      Puedes eliminar en cualquier momento la memoria local a través de las opciones de privacidad de tu navegador web ("Borrar datos de navegación" o "Limpiar LocalStorage"). Al hacerlo, tu carrito se reiniciará a cero sin dejar ningún rastro en nuestros sistemas.
                    </p>
                  </section>
                </div>
              )}

              {activeSection === "garantia" && (
                <div className="space-y-8 text-charcoal/80 leading-relaxed text-sm sm:text-base">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-forest-dark">Compromiso de Frescura, Envíos Express & Garantías</h3>
                    <p className="text-charcoal/70">
                      La frescura no es una promesa secundaria en Felimarket; es la razón de ser de cada fruto, verdura y producto gourmet que llega a tu hogar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-forest/10 border border-forest/15 space-y-1">
                      <h4 className="font-bold text-forest-dark text-base">🌱 Protocolo "Granja a tu Mesa en 24 Horas"</h4>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                        Trabajamos directamente con agricultores de proximidad y cooperativas agroecológicas. Los vegetales y frutas seleccionados se cosechan en su punto óptimo de maduración natural y se despachan en menos de 24 horas desde la recolección.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-forest/15 space-y-1 shadow-xs">
                      <h4 className="font-bold text-forest-dark text-base">⚡ Logística de Envíos Express (30 - 45 Minutos)</h4>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                        Nuestra flota boutique utiliza empaques térmicos biodegradables que conservan la humedad y la temperatura idónea sin plástico de un solo uso. Envío gratuito en compras superiores a $50.00.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-forest/15 space-y-1 shadow-xs">
                      <h4 className="font-bold text-forest-dark text-base">🤝 Garantía de Reemplazo Inmediato</h4>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                        Si cualquier fruto o verdura presenta signos de daño por transporte o no cumple con tu estándar de sabor y textura crujiente, envíanos una foto y te enviamos un reemplazo fresco sin costo adicional o te reembolsamos de inmediato.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Banner inside Article */}
              <div className="pt-8 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-charcoal/50 text-center sm:text-left">
                  <span>Documento oficial revisado por el equipo de </span>
                  <strong className="text-forest-dark">Inspirio Studio</strong>.
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onBack}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-forest text-cream font-bold hover:bg-forest-dark transition-all duration-200 text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    Volver a la Tienda
                  </button>
                  {onNavigateSection && (
                    <button
                      onClick={() => onNavigateSection("catalogo")}
                      className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-white border border-forest/20 text-forest-dark font-bold hover:bg-forest/5 transition-all duration-200 text-xs sm:text-sm shadow-xs cursor-pointer"
                    >
                      Ir al Catálogo
                    </button>
                  )}
                  <button
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                    className="p-3 rounded-full bg-forest/10 hover:bg-forest/20 text-forest-dark transition-colors cursor-pointer"
                    title="Subir al inicio del documento"
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>

            </motion.article>
          </main>
        </div>

        {/* Dedicated Legal Page Footer */}
        <footer className="pt-12 border-t border-forest/10 text-center space-y-2">
          <p className="text-xs sm:text-sm text-charcoal/60 font-medium">
            © 2026 Felimarket by <strong className="text-forest-dark">Inspirio Studio</strong>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-charcoal/40">
            Documentación legal y regulatoria oficial de la plataforma.
          </p>
        </footer>

      </div>
    </div>
  );
}
