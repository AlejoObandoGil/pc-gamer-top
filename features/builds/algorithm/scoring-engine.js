/**
 * Scoring Engine v1.5 - Algoritmo de cálculo de scores para builds de PC
 * Módulo reutilizable para calcular la calidad de una build basada en sus componentes
 */

import { validateBuildCompatibility, getCompatibilityScore } from '../../shared/engines/compatibility-engine.js';

/**
 * Calcula el score de una CPU basado en su nombre
 * @param {string} cpu - Nombre de la CPU
 * @returns {number} Score de la CPU (30-115 puntos)
 */
function getCPUScore(cpu){
  // Gama Alta (100-120 puntos base)
  if(cpu.includes("9950") || cpu.includes("9900") || cpu.includes("9800X3D")) return 115;
  if(cpu.includes("14900K") || cpu.includes("14700K")) return 110;
  
  // Gama Media-Alta (85-99 puntos base)
  if(cpu.includes("9700") || cpu.includes("9600X")) return 100;
  if(cpu.includes("8700F")) return 88;
  if(cpu.includes("14600K") || cpu.includes("14400F")) return 90;
  
  // Gama Media (70-84 puntos base)
  if(cpu.includes("7600X")) return 82;
  if(cpu.includes("7500F")) return 72;
  if(cpu.includes("13400")) return 75;
  
  // Gama Baja (40-69 puntos base)
  if(cpu.includes("5600")) return 55;
  if(cpu.includes("5500") || cpu.includes("4500")) return 45;
  if(cpu.includes("4800F")) return 40;
  if(cpu.includes("12100F") || cpu.includes("13100F")) return 42;
  
  return 30; // Default para CPUs no reconocidas
}

/**
 * Calcula el score de una GPU basado en su nombre
 * @param {string} gpu - Nombre de la GPU
 * @returns {number} Score de la GPU (50-175 puntos)
 */
function getGPUScore(gpu){
  // Gama Ultra-Alta (150-180 puntos base)
  if(gpu.includes("5090")) return 175;
  if(gpu.includes("5080")) return 160;
  if(gpu.includes("9090")) return 155;
  
  // Gama Alta (130-149 puntos base)
  if(gpu.includes("5070")) return 145;
  if(gpu.includes("9080")) return 140;
  if(gpu.includes("9070")) return 135;
  
  // Gama Media-Alta (110-129 puntos base)
  if(gpu.includes("5060") && gpu.includes("Ti")) return 125;
  if(gpu.includes("9060")) return 120;
  
  // Gama Media (90-109 puntos base)
  if(gpu.includes("5060") && !gpu.includes("Ti")) return 100;
  if(gpu.includes("7600")) return 95;
  if(gpu.includes("4060")) return 90;
  
  // Gama Baja (60-89 puntos base)
  if(gpu.includes("6600") || gpu.includes("1660")) return 75;
  if(gpu.includes("3050") || gpu.includes("2060")) return 65;
  
  return 50; // Default para GPUs no reconocidas
}

/**
 * Calcula el score de una motherboard basado en su nombre
 * @param {string} board - Nombre de la motherboard
 * @returns {number} Score de la board (15-50 puntos)
 */
function getBoardScore(board){
  // Gama Alta (45-55 puntos base)
  if(board.includes("X870E") || board.includes("X870")) return 50;
  if(board.includes("Z890")) return 48;
  
  // Gama Media-Alta (35-44 puntos base)
  if(board.includes("B850E") || board.includes("B850")) return 40;
  if(board.includes("B840")) return 35;
  
  // Gama Media (25-34 puntos base)
  if(board.includes("B650E") || board.includes("B650")) return 30;
  if(board.includes("Z790")) return 32;
  
  // Gama Baja (10-24 puntos base)
  if(board.includes("A620") || board.includes("A620A")) return 15;
  if(board.includes("B760")) return 18;
  
  return 20; // Default para boards no reconocidas
}

/**
 * Calcula el score de RAM basado en su nombre
 * @param {string} ram - Nombre de la RAM
 * @returns {number} Score de la RAM (5-35 puntos aprox)
 */
function getRAMScore(ram){
  let score = 0;
  
  // Capacidad
  if(ram.includes("32GB")) score += 15;
  else if(ram.includes("16GB")) score += 10;
  else if(ram.includes("8GB")) score += 5;
  
  // Velocidad DDR5
  if(ram.includes("6400")) score += 12;
  else if(ram.includes("6000") || ram.includes("6200")) score += 10;
  else if(ram.includes("5600") || ram.includes("5800")) score += 8;
  else if(ram.includes("5200") || ram.includes("5400")) score += 5;
  else if(ram.includes("4800") || ram.includes("5000")) score += 3;
  
  // Velocidad DDR4
  if(ram.includes("3600")) score += 6;
  else if(ram.includes("3200") || ram.includes("3400")) score += 4;
  else if(ram.includes("3000")) score += 2;
  
  // Marcas premium
  if(ram.includes("G.Skill") || ram.includes("Trident")) score += 8;
  if(ram.includes("Corsair") || ram.includes("Vengeance")) score += 8;
  if(ram.includes("Kingston") || ram.includes("Fury")) score += 6;
  if(ram.includes("XPG") || ram.includes("Lancer")) score += 6;
  if(ram.includes("Patriot") || ram.includes("Viper")) score += 4;
  if(ram.includes("Crucial")) score += 4;
  
  return score;
}

/**
 * Calcula el score de un SSD basado en su nombre
 * @param {string} ssd - Nombre del SSD
 * @returns {number} Score del SSD (5-35 puntos aprox)
 */
function getSSDScore(ssd){
  let score = 0;
  
  // Capacidad
  if(ssd.includes("2TB") || ssd.includes("1.92TB")) score += 25;
  else if(ssd.includes("1TB") || ssd.includes("960GB")) score += 18;
  else if(ssd.includes("512") || ssd.includes("500GB") || ssd.includes("480GB")) score += 10;
  else if(ssd.includes("256") || ssd.includes("240GB")) score += 5;
  
  // Tipo (multiplicador aplicado en calculateScore)
  // NVMe PCIe 4.0/5.0 vs NVMe PCIe 3.0 vs SATA
  
  // Marcas premium
  if(ssd.includes("Samsung") && (ssd.includes("990") || ssd.includes("980"))) score += 8;
  if(ssd.includes("Kingston") && (ssd.includes("KC3000") || ssd.includes("Fury"))) score += 6;
  if(ssd.includes("Crucial") && ssd.includes("P310")) score += 8;
  if(ssd.includes("WD") && ssd.includes("Black")) score += 6;
  if(ssd.includes("Patriot") || ssd.includes("Viper")) score += 4;
  
  return score;
}

/**
 * Calcula el score de una fuente de poder basado en su nombre
 * @param {string} psu - Nombre de la PSU
 * @returns {number} Score de la PSU (-8 a 60 puntos aprox)
 */
function getPSUScore(psu){
  let score = 0;
  
  // Certificación
  if(psu.includes("Platinum")) score += 35;
  else if(psu.includes("Gold")) score += 25;
  else if(psu.includes("Bronze")) score += 12;
  else if(psu.includes("White") || psu.includes("80+")) score += 5;
  
  // Potencia adecuada
  if(psu.includes("850W") || psu.includes("1000W")) score += 10;
  else if(psu.includes("750W")) score += 8;
  else if(psu.includes("650W")) score += 5;
  else if(psu.includes("550W") || psu.includes("600W")) score += 3;
  
  // Marcas premium
  if(psu.includes("Corsair") && (psu.includes("RMx") || psu.includes("AX"))) score += 12;
  if(psu.includes("Cooler Master") && (psu.includes("MWE Gold") || psu.includes("V Gold"))) score += 10;
  if(psu.includes("Seasonic") && psu.includes("Focus")) score += 10;
  if(psu.includes("EVGA") && psu.includes("SuperNOVA")) score += 8;
  if(psu.includes("MSI") && (psu.includes("MAG") || psu.includes("A750"))) score += 10;
  if(psu.includes("FSP")) score += 8;
  if(psu.includes("ASRock") && psu.includes("PRO")) score += 8;
  
  // Marcas con penalización
  if(psu.includes("AZZA") || psu.includes("ARESGAME")) score -= 5;
  if(psu.includes("JYR")) score -= 8;
  
  return score;
}

/**
 * Calcula el score de refrigeración basado en el texto de extras
 * @param {string} extras - Texto que contiene información de refrigeración
 * @returns {number} Score de refrigeración (0-18 puntos)
 */
function getCoolingScore(extras){
  let score = 0;
  const extrasLower = extras.toLowerCase();
  
  // Tipo de refrigeración
  if(extrasLower.includes("360") && extrasLower.includes("líquida")) score += 18;
  else if(extrasLower.includes("240") && extrasLower.includes("líquida")) score += 12;
  else if(extrasLower.includes("120") && extrasLower.includes("líquida")) score += 8;
  else if(extrasLower.includes("líquida")) score += 10;
  else if(extrasLower.includes("thermalright")) score += 10;
  else if(extrasLower.includes("noctua")) score += 12;
  else if(extrasLower.includes("corsair") && extrasLower.includes("icue")) score += 6;
  else if(extrasLower.includes("nzxt") && extrasLower.includes("kraken")) score += 8;
  
  return score;
}

/**
 * Calcula el score del gabinete basado en el texto de extras
 * @param {string} extras - Texto que contiene información del case
 * @returns {number} Score del case (0-8 puntos)
 */
function getCaseScore(extras){
  let score = 0;
  
  // Marcas premium
  if(extras.includes("Fractal") || extras.includes("NZXT") || extras.includes("Lian Li")) score += 8;
  if(extras.includes("Cooler Master") && extras.includes("MasterBox")) score += 6;
  if(extras.includes("Cougar") || extras.includes("Antec") || extras.includes("Phanteks")) score += 6;
  if(extras.includes("Iceberg") && (extras.includes("Flow") || extras.includes("Titan"))) score += 6;
  if(extras.includes("XPG") && (extras.includes("Invader") || extras.includes("Defender"))) score += 5;
  
  return score;
}

/**
 * Calcula el score total de una build usando el algoritmo v1.5
 * @param {Object} build - Objeto con propiedades: cpu, gpu, board, ram, ssd, psu, extras, price
 * @returns {number} Score total de la build (redondeado)
 */
function calculateScore(build){
  
  // 1. Calcular puntos base por componente
  const cpuScore = getCPUScore(build.cpu);
  const gpuScore = getGPUScore(build.gpu);
  const boardScore = getBoardScore(build.board);
  const ramScore = getRAMScore(build.ram);
  const ssdScore = getSSDScore(build.ssd);
  const psuScore = getPSUScore(build.psu);
  const coolingScore = getCoolingScore(build.extras);
  const caseScore = getCaseScore(build.extras);
  
  // 2. Aplicar multiplicadores según importancia del componente
  let weightedScore = 
    (gpuScore * 1.5) +           // GPU es el componente más crítico para gaming
    (cpuScore * 1.3) +           // CPU es el segundo más importante
    (boardScore * 1.0) +         // Base del sistema
    (ramScore * 0.8) +           // RAM importante pero menos crítica
    (ssdScore * 0.6) +           // SSD afecta carga pero no gaming directamente
    (psuScore * 0.5) +           // PSU es crítico pero no afecta rendimiento
    (coolingScore * 0.4) +       // Cooling es importante pero secundario
    (caseScore * 0.3);           // Case es principalmente estética
  
  // 3. Factor calidad-precio (penaliza builds caras con bajo rendimiento)
  let priceInMillions = build.price / 1000000;
  let valueScore = (weightedScore / priceInMillions) * 10;
  
  // 4. Penalización por precio alto con bajo rendimiento
  let penalty = 0;
  if(build.price > 6500000 && weightedScore < 280) penalty = -15;
  if(build.price > 7000000 && weightedScore < 300) penalty = -25;
  
  // 5. Bonus por rango de presupuesto
  let budgetBonus = 0;
  if(build.price < 5500000 && weightedScore > 250) budgetBonus = 20;
  if(build.price >= 5500000 && build.price <= 6500000 && weightedScore > 280) budgetBonus = 10;
  
  // 6. Validación de compatibilidad (penaliza builds incompatibles)
  let compatibilityPenalty = 0;
  if (build.componentData) {
    const validation = validateBuildCompatibility(build.componentData);
    if (!validation.valid) {
      // Penalización severa por incompatibilidad
      compatibilityPenalty = -100 * validation.issues.length;
    } else if (validation.warnings.length > 0) {
      // Penalización menor por warnings
      compatibilityPenalty = -10 * validation.warnings.length;
    }
  }
  
  // Score final (redondeado)
  return Math.round(weightedScore + valueScore + penalty + budgetBonus + compatibilityPenalty);
}

/**
 * Determina la categoría de una build basado en su score
 * @param {number} score - Score de la build
 * @returns {Object} Objeto con propiedades text (nombre categoría) y class (clase CSS)
 */
function getCategory(score){

  if(score >= 400){
    return {
      text:"🔥 High-End Inteligente",
      class:"best"
    };
  }

  if(score >= 360){
    return {
      text:"👑 Premium",
      class:"premium"
    };
  }

  if(score >= 320){
    return {
      text:"🚀 Excelente",
      class:"future"
    };
  }

  if(score >= 280){
    return {
      text:"💎 Muy Bueno",
      class:"future"
    };
  }

  return {
    text:"💰 Calidad/Precio",
    class:"value"
  };
}

// Exportar todas las funciones como módulo ES6
export {
  getCPUScore,
  getGPUScore,
  getBoardScore,
  getRAMScore,
  getSSDScore,
  getPSUScore,
  getCoolingScore,
  getCaseScore,
  calculateScore,
  getCategory
};
