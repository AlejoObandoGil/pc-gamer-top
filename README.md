# PC Gamer Top v2.0

Proyecto de ranking de builds de PC para gaming, con arquitectura modular por feature.

## 🚀 Novedades en v2.0

- **Sistema de Validación de Compatibilidad**: Valida socket CPU-Board, tipo de RAM, form factor y PSU wattage
- **Algoritmo Tier List**: Nuevo algoritmo para builds de gama alta sin penalización por precio
- **Metadata de Componentes**: TDP, socket, form factor, wattage para validación profesional
- **Módulo Compatibility Engine**: Validación similar a PCPartPicker
- **17 Builds Predefinidas**: En algoritmo V1.5 (calidad-precio)
- **10 Builds Predefinidas**: En algoritmo Tier List (gama alta)

## 📁 Estructura del Proyecto

```text
pc-gamer-top/
├── index.html (redirige a features/home/)
├── package.json
├── tailwind.config.js
├── features/
│   ├── home/ (página principal)
│   │   ├── index.html
│   │   ├── home.css
│   │   └── home.js
│   ├── builds/ (features de builds)
│   │   ├── algorithm/ (algoritmo de scoring + crear builds)
│   │   │   ├── index.html
│   │   │   ├── algorithm.css
│   │   │   ├── algorithm.js
│   │   │   └── scoring-engine.js (módulo reutilizable)
│   │   ├── algorithm-tier/ (algoritmo Tier List - gama alta)
│   │   │   ├── index.html
│   │   │   ├── algorithm-tier.css
│   │   │   ├── algorithm-tier.js
│   │   │   └── scoring-engine-tier.js (módulo reutilizable)
│   │   ├── ia/ (builds recomendados por IA - en desarrollo)
│   │   │   ├── index.html
│   │   │   ├── ia.css
│   │   │   └── ia.js
│   │   └── top/ (top builds - en desarrollo)
│   │       ├── index.html
│   │       ├── top.css
│   │       └── top.js
│   ├── components/ (features de componentes individuales)
│   │   ├── cpu/
│   │   │   ├── index.html
│   │   │   ├── cpu.css
│   │   │   └── cpu.js
│   │   ├── gpu/
│   │   │   ├── index.html
│   │   │   ├── gpu.css
│   │   │   └── gpu.js
│   │   ├── motherboard/
│   │   │   ├── index.html
│   │   │   ├── motherboard.css
│   │   │   └── motherboard.js
│   │   ├── ram/
│   │   │   ├── index.html
│   │   │   ├── ram.css
│   │   │   └── ram.js
│   │   ├── ssd/
│   │   │   ├── index.html
│   │   │   ├── ssd.css
│   │   │   └── ssd.js
│   │   ├── psu/
│   │   │   ├── index.html
│   │   │   ├── psu.css
│   │   │   └── psu.js
│   │   ├── cooler/
│   │   │   ├── index.html
│   │   │   ├── cooler.css
│   │   │   └── cooler.js
│   │   └── case/
│   │       ├── index.html
│   │       ├── case.css
│   │       └── case.js
│   └── shared/ (recursos compartidos)
│       ├── data/
│       │   └── components-data.js (datos de componentes)
│       ├── engines/
│       │   └── compatibility-engine.js (módulo de validación)
│       └── utils/
│           └── formatters.js (utilidades de formato)
```

## 🚀 Características

- **Arquitectura por Feature**: Cada feature tiene sus propios archivos HTML, CSS y JS
- **Módulos ES6**: JavaScript organizado con import/export
- **Scoring Engine Reutilizable**: Algoritmo de cálculo de scores separado en módulo independiente
- **Compatibility Engine**: Validación de compatibilidad de componentes profesional
- **Datos Centralizados**: Componentes compartidos en `features/shared/data/`
- **TailwindCSS**: Configurado para estilos consistentes (pendiente de implementación completa)

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

Para compilar CSS con TailwindCSS:

```bash
npm run build:css
```

## 🧭 Navegación

- **Home**: `features/home/index.html`
- **Builds Algorithm (V1.5)**: `features/builds/algorithm/index.html`
- **Builds Tier List (Gama Alta)**: `features/builds/algorithm-tier/index.html`
- **Components**: `features/components/[tipo]/index.html`

## 📝 Notas

- Los archivos HTML originales en la raíz (cpu-amd.html, gpu.html, etc.) están obsoletos
- Usar siempre la nueva estructura en `features/`
- El scoring-engine.js puede importarse en cualquier feature que necesite calcular scores de builds
- El compatibility-engine.js valida compatibilidad de componentes (socket, RAM type, form factor, PSU wattage)
- Ambos scoring engines penalizan builds incompatibles automáticamente
