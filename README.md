# Felimarket — Boutique Market Experience (Edición 2026)

> **De la granja a tu mesa.** Una experiencia de comercio digital boutique de alta fidelidad que redefine la frescura, el minimalismo editorial y la tecnología web contemporánea.

---

## 🎨 Dirección de Arte & Estilo Framer

El diseño de **Felimarket** captura la esencia de las aplicaciones y sitios web creados con **Framer**, fusionando estética editorial de lujo con microinteracciones fluidas y orgánicas:

- **Composición Tipográfica Dual:**
  - *Playfair Display:* Serif clásico para títulos principales con carácter editorial y sofisticación.
  - *Inter:* Sans-serif geométrica para cuerpo de texto y métricas legibles en cualquier resolución.
- **Sistema Cromático Botánico:**
  - `Forest` (`#84B74E`): Verde fresco para acentos y llamadas a la acción vivas.
  - `Forest Dark` (`#0B3D2E`): Verde profundo para estructura, contraste y autoridad visual.
  - `Cream` (`#FFFBF2`): Fondo cálido apergaminado que evoca materiales nobles y papel natural.
  - `Charcoal` (`#1A1A1A`): Tonalidad carbón para lectura descansada y tipografía de alto contraste.
- **Textura de Grano Orgánico (`bg-grain`):** Overlay sutil a nivel de pixel que elimina la frialdad sintética de las pantallas digitales.
- **Header Inteligente ("Smart Hide on Scroll"):** Se oculta suavemente al explorar el catálogo hacia abajo y reaparece al primer gesto de scroll hacia arriba.

---

## 🛡️ Arquitectura de Seguridad "Zero-Leak" (Entorno Demo 2026)

Diseñado pensando en la máxima protección para demostraciones comerciales, presentaciones a clientes e inversionistas:

1. **Aislamiento Total de Credenciales:** La aplicación no expone llaves secretas, variables de entorno sensibles ni tokens en el bundle cliente (`dist`).
2. **Cero Superficie de Ataque Público:** No contiene paneles de control huérfanos, endpoints de depuración ni bases de datos con credenciales débiles accesibles al público.
3. **Sandbox de Compra Seguro:** El flujo de checkout opera mediante una simulación de pago encapsulada en el navegador (client-side state), sin capturar números de tarjeta ni datos financieros de clientes.
4. **Encabezados de Protección Web:** Políticas estrictas de Content-Type nosniff, Referrer Policy y aislamiento de contexto.

---

## ⚖️ Marco Legal & Cumplimiento Normativo de IA (2026)

En consonancia con las normativas internacionales y regionales de 2026 relativas a servicios digitales y sistemas asistidos por Inteligencia Artificial:

- **Transparencia Activa:** El proyecto declara de forma explícita las áreas donde se utilizaron herramientas de IA (apoyo en prototipado de diseño, optimización de ritmos visuales y asistencia técnica), manteniendo en todo momento la autoría intelectual, curaduría de arte y control ético bajo **Inspirio Studio**.
- **No Entrenamiento con Datos:** Los datos ingresados en el sitio (ej. suscripción a newsletter o carrito) nunca alimentan bases de conocimiento o modelos de Machine Learning de terceros.
- **Páginas Legales Integradas:** Acceso modal instantáneo y responsivo a *Transparencia de IA*, *Privacidad (Zero-Leak)*, *Términos del Servicio*, *Cookies Esenciales* y *Garantías de Frescura*.

---

## 🛠️ Stack Tecnológico

- **React 19** + **Vite 6**
- **TypeScript** (Strict Type Safety)
- **Tailwind CSS v4** (Variables de diseño modernas y `@theme`)
- **Motion** (Framer Motion - Animaciones con físicas de resorte `useSpring` y `AnimatePresence`)
- **Lucide React** (Iconografía vectorial de línea continua)

---

## 🚀 Despliegue en Producción (GitHub & Vercel)

Este repositorio está preparado para despliegue inmediato en **Vercel** o cualquier proveedor estático moderno:

1. Clona o sube este repositorio a tu cuenta de **GitHub**.
2. Conéctalo a **Vercel**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Tu demo estará disponible en producción con certificado SSL automático y rendimiento óptimo en milisegundos.

---

## ✒️ Créditos & Propiedad Intelectual

**Felimarket by Inspirio Studio**  
Todos los derechos reservados © 2026.

Dirección de Arte, Arquitectura de Software e Identidad Visual concebidas y desarrolladas por **Inspirio Studio**.

---
*Felimarket (2026) — Redefiniendo la frescura del campo a tu mesa.*
