# Plan v1.5 - Algoritmo Avanzado de Ranking PC Gamer

Este plan mejora el algoritmo de ranking actual implementando un sistema de multiplicadores por componente, factor de calidad-precio con penalización, y ampliando la base de datos de componentes por gama (baja, media, alta).

## Objetivos

- **Mantener compatibilidad** con estructura actual de builds
- **Implementar algoritmo avanzado** con multiplicadores por componente
- **Agregar factor calidad-precio** que penalice builds caras con bajo rendimiento
- **Expandir base de componentes** por gama (baja, media, alta)
- **Incluir rangos de presupuesto** en el cálculo de ranking

## Algoritmo Propuesto

### Sistema de Multiplicadores

En lugar de puntos fijos, usar multiplicadores según importancia del componente:

- **GPU**: ×1.5 (componente más crítico para gaming)
- **CPU**: ×1.3 (segundo más importante)
- **Motherboard**: ×1.0 (base del sistema)
- **RAM**: ×0.8
- **SSD**: ×0.6
- **PSU**: ×0.5
- **Cooling/Extras**: ×0.4

### Factor Calidad-Precio con Penalización

Cálculo separado que penaliza builds caras con bajo rendimiento:

```
valueScore = (rawScore / priceInMillions) * 10
penalty = 0
if (price > 6.5M && rawScore < 280) penalty = -15
if (price > 7M && rawScore < 300) penalty = -25
finalScore = rawScore + valueScore + penalty
```

### Rangos de Presupuesto

- **Bajo**: < 5.5M COP (bonus +20 si score > 250)
- **Medio**: 5.5M - 6.5M COP (bonus +10 si score > 280)
- **Alto**: > 6.5M COP (penalización automática si score < 300)

## Base de Componentes por Gama

### CPUs (AMD e Intel)

**Gama Alta (100-120 puntos base):**
- Ryzen 9 9950X3D, Ryzen 9 9900X3D, Ryzen 7 9800X3D
- Intel Core i9-14900K, i7-14700K

**Gama Media-Alta (85-99 puntos base):**
- Ryzen 7 9700X, Ryzen 7 8700F, Ryzen 5 9600X
- Intel Core i5-14600K

**Gama Media (70-84 puntos base):**
- Ryzen 5 7600X, Ryzen 5 7500F
- Intel Core i5-14400F, i5-13400

**Gama Baja (40-69 puntos base):**
- Ryzen 5 5600, Ryzen 5 5500, Ryzen 5 4500
- Intel Core i3-12100F, i3-13100F

### GPUs (NVIDIA y AMD)

**Gama Ultra-Alta (150-180 puntos base):**
- RTX 5090, RTX 5080, RX 9090 XT

**Gama Alta (130-149 puntos base):**
- RTX 5070 Ti, RTX 5070, RX 9080 XT, RX 9070 XT

**Gama Media-Alta (110-129 puntos base):**
- RTX 5060 Ti 16GB, RX 9060 XT 16GB

**Gama Media (90-109 puntos base):**
- RTX 5060 8GB, RX 7600 XT 16GB

**Gama Baja (60-89 puntos base):**
- RTX 4060, RX 7600, GTX 1660 Super, RX 6600

### Motherboards AM5/Intel

**Gama Alta (45-55 puntos base):**
- X870E, X870 (máxima conectividad, PCIe 5.0, overclocking extremo)
- Z890 (Intel)

**Gama Media-Alta (35-44 puntos base):**
- B850E, B850 (buen balance, PCIe 5.0 GPU)
- B840 (nuevo chipset medio)

**Gama Media (25-34 puntos base):**
- B650E, B650 (buen rendimiento, características básicas)
- Z790 (Intel)

**Gama Baja (10-24 puntos base):**
- A620, A620A (limitadas, sin overclocking)
- B760 (Intel básico)

### RAM DDR4/DDR5

**Capacidad (puntos base):**
- 32GB: +15
- 16GB: +10
- 8GB: +5

**Velocidad DDR5 (puntos adicionales):**
- 6400+ MHz: +12
- 6000-6200 MHz: +10
- 5600-5800 MHz: +8
- 5200-5400 MHz: +5
- 4800-5000 MHz: +3

**Velocidad DDR4 (puntos adicionales):**
- 3600+ MHz: +6
- 3200-3400 MHz: +4
- 3000-3200 MHz: +2

**Marcas premium (puntos adicionales):**
- G.Skill Trident/Corsair Dominator: +8
- Kingston Fury/XPG Lancer: +6
- Patriot Viper/Crucial: +4

### SSD

**Capacidad (puntos base):**
- 2TB+: +25
- 1TB: +18
- 512GB-1TB: +10
- 256GB-512GB: +5
- <256GB: +2

**Tipo (multiplicador):**
- NVMe PCIe 4.0/5.0: ×1.2
- NVMe PCIe 3.0: ×1.0
- SATA: ×0.7

**Marcas premium (puntos adicionales):**
- Samsung 990 Pro/980 Pro: +8
- Kingston KC3000/Fury: +6
- Patriot P210/Viper: +4

### PSU

**Certificación (puntos base):**
- Platinum: +35
- Gold: +25
- Bronze: +12
- White/Basic: +5

**Potencia adecuada (puntos adicionales):**
- 850W+ (para builds high-end): +10
- 750W (builds media-alta): +8
- 650W (builds media): +5
- 550W (builds baja): +3

**Marcas premium (puntos adicionales):**
- Corsair RMx/AX: +12
- Cooler Master MWE Gold/V Gold: +10
- Seasonic Focus: +10
- EVGA SuperNOVA: +8
- AZZA (penalización): -5

### Cooling y Extras

**Tipo de refrigeración (puntos base):**
- Líquida 360mm AIO: +18
- Líquida 240mm AIO: +12
- Líquida 120mm AIO: +8
- Air cooler premium (Thermalright, Noctua): +10
- Air cooler básico: +5

**Marcas premium (puntos adicionales):**
- Thermalright: +8
- Noctua: +10
- Corsair iCUE: +6
- NZXT Kraken: +8

**Case quality (puntos adicionales):**
- Fractal Design/NZXT/Cooler Master premium: +8
- Cougar/Antec/Phanteks: +6
- Cases genéricos: +2

## Implementación

### Nueva Estructura de `calculateScore()`

```javascript
function calculateScore(build){
  let baseScore = 0;
  
  // 1. Calcular puntos base por componente
  baseScore += getCPUScore(build.cpu);
  baseScore += getGPUScore(build.gpu);
  baseScore += getBoardScore(build.board);
  baseScore += getRAMScore(build.ram);
  baseScore += getSSDScore(build.ssd);
  baseScore += getPSUScore(build.psu);
  baseScore += getCoolingScore(build.extras);
  
  // 2. Aplicar multiplicadores
  let weightedScore = 
    (getGPUScore(build.gpu) * 1.5) +
    (getCPUScore(build.cpu) * 1.3) +
    (getBoardScore(build.board) * 1.0) +
    (getRAMScore(build.ram) * 0.8) +
    (getSSDScore(build.ssd) * 0.6) +
    (getPSUScore(build.psu) * 0.5) +
    (getCoolingScore(build.extras) * 0.4);
  
  // 3. Factor calidad-precio
  let priceInMillions = build.price / 1000000;
  let valueScore = (weightedScore / priceInMillions) * 10;
  
  // 4. Penalización por precio alto con bajo rendimiento
  let penalty = 0;
  if (build.price > 6500000 && weightedScore < 280) penalty = -15;
  if (build.price > 7000000 && weightedScore < 300) penalty = -25;
  
  // 5. Bonus por rango de presupuesto
  let budgetBonus = 0;
  if (build.price < 5500000 && weightedScore > 250) budgetBonus = 20;
  if (build.price >= 5500000 && build.price <= 6500000 && weightedScore > 280) budgetBonus = 10;
  
  // Score final
  return Math.round(weightedScore + valueScore + penalty + budgetBonus);
}
```

### Funciones Helper por Componente

Crear funciones separadas para cada tipo de componente que retornen puntos base según gama y especificaciones. Esto hace el código más mantenible y escalable.

### Actualización de Categorías

Ajustar umbrales de `getCategory()` para reflejar el nuevo rango de scores (ahora serán más altos debido a multiplicadores):

- **≥400**: 🔥 High-End Inteligente
- **≥360**: 👑 Premium
- **≥320**: 🚀 Excelente
- **≥280**: 💎 Muy Bueno
- **<280**: 💰 Calidad/Precio

## Cambios en Archivos

### ranking-auto-pc-gamer.html

1. Reemplazar `calculateScore()` actual con nueva versión
2. Agregar funciones helper: `getCPUScore()`, `getGPUScore()`, `getBoardScore()`, etc.
3. Actualizar `getCategory()` con nuevos umbrales
4. Mantener estructura de builds existente (sin cambios)

### index.html

Sin cambios necesarios (solo redirección)

## Testing

1. Verificar que builds existentes mantengan ranking relativo similar
2. Probar con builds de nuevas gamas de componentes
3. Validar penalización de calidad-precio
4. Verificar bonus por rango de presupuesto

## Ventajas de v1.5

- **Algoritmo más preciso**: Multiplicadores reflejan importancia real de componentes
- **Calidad-precio explícito**: Penaliza builds sobrevaloradas
- **Escalabilidad**: Fácil agregar nuevos componentes
- **Mantenibilidad**: Código modular con funciones helper
- **Compatibilidad**: No rompe builds existentes
