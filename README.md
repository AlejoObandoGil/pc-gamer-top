# PC Gamer Top

Proyecto de ranking de builds de PC para gaming, con arquitectura modular por feature.

## 📁 Estructura del Proyecto

```
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
│       └── utils/
│           └── formatters.js (utilidades de formato)
```

## 🚀 Características

- **Arquitectura por Feature**: Cada feature tiene sus propios archivos HTML, CSS y JS
- **Módulos ES6**: JavaScript organizado con import/export
- **Scoring Engine Reutilizable**: Algoritmo de cálculo de scores separado en módulo independiente
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
- **Builds Algorithm**: `features/builds/algorithm/index.html`
- **Components**: `features/components/[tipo]/index.html`

## 📝 Notas

- Los archivos HTML originales en la raíz (cpu-amd.html, gpu.html, etc.) están obsoletos
- Usar siempre la nueva estructura en `features/`
- El scoring-engine.js puede importarse en cualquier feature que necesite calcular scores de builds
