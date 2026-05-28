/**
 * Scoring Engine Tier List v1.0 - Algoritmo para rankear builds de gama alta
 * Prioriza componentes de gama alta sin considerar calidad-precio
 * Ideal para usuarios que buscan el mejor rendimiento sin importar el presupuesto
 */

/**
 * Calcula el score de una CPU basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} cpu - Nombre de la CPU
 * @returns {number} Score de la CPU (50-150 puntos)
 */
function getCPUScore(cpu){
  // S-Tier (140-150 puntos) - CPUs de gama ultra-alta
  if(cpu.includes("9950")) return 150;
  if(cpu.includes("9900")) return 145;
  if(cpu.includes("9800X3D")) return 148;
  if(cpu.includes("14900K")) return 142;
  if(cpu.includes("14700K")) return 138;
  
  // A-Tier (120-139 puntos) - CPUs de gama alta
  if(cpu.includes("9700")) return 135;
  if(cpu.includes("9600X")) return 130;
  if(cpu.includes("8700F")) return 125;
  if(cpu.includes("14600K")) return 128;
  if(cpu.includes("14400F")) return 122;
  
  // B-Tier (100-119 puntos) - CPUs de gama media-alta
  if(cpu.includes("7600X")) return 115;
  if(cpu.includes("7500F")) return 105;
  if(cpu.includes("13400")) return 110;
  
  // C-Tier (70-99 puntos) - CPUs de gama media
  if(cpu.includes("5600")) return 85;
  if(cpu.includes("5500") || cpu.includes("4500")) return 75;
  if(cpu.includes("4800F")) return 70;
  if(cpu.includes("12100F") || cpu.includes("13100F")) return 72;
  
  return 50; // Default para CPUs no reconocidas
}

/**
 * Calcula el score de una GPU basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} gpu - Nombre de la GPU
 * @returns {number} Score de la GPU (80-200 puntos)
 */
function getGPUScore(gpu){
  // S-Tier (180-200 puntos) - GPUs de gama ultra-alta
  if(gpu.includes("5090")) return 200;
  if(gpu.includes("5080")) return 185;
  if(gpu.includes("9090")) return 190;
  
  // A-Tier (150-179 puntos) - GPUs de gama alta
  if(gpu.includes("5070")) return 170;
  if(gpu.includes("9080")) return 165;
  if(gpu.includes("9070")) return 160;
  
  // B-Tier (130-149 puntos) - GPUs de gama media-alta
  if(gpu.includes("5060") && gpu.includes("Ti")) return 145;
  if(gpu.includes("9060")) return 140;
  
  // C-Tier (100-129 puntos) - GPUs de gama media
  if(gpu.includes("5060") && !gpu.includes("Ti")) return 120;
  if(gpu.includes("7600")) return 115;
  if(gpu.includes("4060")) return 110;
  
  // D-Tier (80-99 puntos) - GPUs de gama baja
  if(gpu.includes("6600") || gpu.includes("1660")) return 95;
  if(gpu.includes("3050") || gpu.includes("2060")) return 85;
  
  return 80; // Default para GPUs no reconocidas
}

/**
 * Calcula el score de una motherboard basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} board - Nombre de la motherboard
 * @returns {number} Score de la board (20-60 puntos)
 */
function getBoardScore(board){
  // S-Tier (55-60 puntos) - Boards de gama ultra-alta
  if(board.includes("X870E") || board.includes("X870")) return 60;
  if(board.includes("Z890")) return 58;
  
  // A-Tier (45-54 puntos) - Boards de gama alta
  if(board.includes("B850E") || board.includes("B850")) return 50;
  if(board.includes("B840")) return 45;
  
  // B-Tier (35-44 puntos) - Boards de gama media-alta
  if(board.includes("B650E") || board.includes("B650")) return 40;
  if(board.includes("Z790")) return 42;
  
  // C-Tier (20-34 puntos) - Boards de gama media/baja
  if(board.includes("A620") || board.includes("A620A")) return 25;
  if(board.includes("B760")) return 28;
  
  return 20; // Default para boards no reconocidas
}

/**
 * Calcula el score de RAM basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} ram - Nombre de la RAM
 * @returns {number} Score de la RAM (10-50 puntos aprox)
 */
function getRAMScore(ram){
  let score = 0;
  
  // Capacidad
  if(ram.includes("64GB")) score += 25;
  else if(ram.includes("32GB")) score += 18;
  else if(ram.includes("16GB")) score += 12;
  else if(ram.includes("8GB")) score += 6;
  
  // Velocidad DDR5
  if(ram.includes("7200")) score += 15;
  else if(ram.includes("6800") || ram.includes("6400")) score += 13;
  else if(ram.includes("6400")) score += 12;
  else if(ram.includes("6000") || ram.includes("6200")) score += 10;
  else if(ram.includes("5600") || ram.includes("5800")) score += 8;
  else if(ram.includes("5200") || ram.includes("5400")) score += 6;
  else if(ram.includes("4800") || ram.includes("5000")) score += 4;
  
  // Velocidad DDR4
  if(ram.includes("4000") || ram.includes("3600")) score += 8;
  else if(ram.includes("3600")) score += 7;
  else if(ram.includes("3200") || ram.includes("3400")) score += 5;
  else if(ram.includes("3000")) score += 3;
  
  // Marcas premium
  if(ram.includes("G.Skill") || ram.includes("Trident")) score += 10;
  if(ram.includes("Corsair") || ram.includes("Vengeance")) score += 10;
  if(ram.includes("Kingston") || ram.includes("Fury")) score += 8;
  if(ram.includes("XPG") || ram.includes("Lancer")) score += 8;
  if(ram.includes("Patriot") || ram.includes("Viper")) score += 6;
  if(ram.includes("Crucial")) score += 6;
  
  return score;
}

/**
 * Calcula el score de un SSD basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} ssd - Nombre del SSD
 * @returns {number} Score del SSD (10-50 puntos aprox)
 */
function getSSDScore(ssd){
  let score = 0;
  
  // Capacidad
  if(ssd.includes("4TB")) score += 30;
  else if(ssd.includes("2TB") || ssd.includes("1.92TB")) score += 25;
  else if(ssd.includes("1TB") || ssd.includes("960GB")) score += 18;
  else if(ssd.includes("512") || ssd.includes("500GB") || ssd.includes("480GB")) score += 12;
  else if(ssd.includes("256") || ssd.includes("240GB")) score += 6;
  
  // Tipo (multiplicador aplicado en calculateScore)
  // NVMe PCIe 5.0/4.0 vs NVMe PCIe 3.0 vs SATA
  
  // Marcas premium
  if(ssd.includes("Samsung") && (ssd.includes("990") || ssd.includes("980"))) score += 12;
  if(ssd.includes("Kingston") && (ssd.includes("KC3000") || ssd.includes("Fury"))) score += 10;
  if(ssd.includes("Crucial") && ssd.includes("P310")) score += 12;
  if(ssd.includes("WD") && ssd.includes("Black")) score += 10;
  if(ssd.includes("Patriot") || ssd.includes("Viper")) score += 6;
  
  return score;
}

/**
 * Calcula el score de una fuente de poder basado en su nombre (Tier List - prioriza gama alta)
 * @param {string} psu - Nombre de la PSU
 * @returns {number} Score de la PSU (10-80 puntos aprox)
 */
function getPSUScore(psu){
  let score = 0;
  
  // Certificación
  if(psu.includes("Titanium")) score += 40;
  else if(psu.includes("Platinum")) score += 35;
  else if(psu.includes("Gold")) score += 28;
  else if(psu.includes("Bronze")) score += 15;
  else if(psu.includes("White") || psu.includes("80+")) score += 8;
  
  // Potencia adecuada
  if(psu.includes("1200W") || psu.includes("1500W")) score += 15;
  else if(psu.includes("1000W")) score += 12;
  else if(psu.includes("850W")) score += 10;
  else if(psu.includes("750W")) score += 8;
  else if(psu.includes("650W")) score += 5;
  else if(psu.includes("550W") || psu.includes("600W")) score += 3;
  
  // Marcas premium
  if(psu.includes("Corsair") && (psu.includes("RMx") || psu.includes("AX"))) score += 15;
  if(psu.includes("Cooler Master") && (psu.includes("MWE Gold") || psu.includes("V Gold"))) score += 12;
  if(psu.includes("Seasonic") && psu.includes("Focus")) score += 12;
  if(psu.includes("EVGA") && psu.includes("SuperNOVA")) score += 10;
  if(psu.includes("MSI") && (psu.includes("MAG") || psu.includes("A750"))) score += 12;
  if(psu.includes("FSP")) score += 10;
  if(psu.includes("ASRock") && psu.includes("PRO")) score += 10;
  
  // Marcas con penalización
  if(psu.includes("AZZA") || psu.includes("ARESGAME")) score -= 5;
  if(psu.includes("JYR")) score -= 8;
  
  return score;
}

/**
 * Calcula el score de refrigeración basado en el texto de extras (Tier List - prioriza gama alta)
 * @param {string} extras - Texto que contiene información de refrigeración
 * @returns {number} Score de refrigeración (0-25 puntos)
 */
function getCoolingScore(extras){
  let score = 0;
  const extrasLower = extras.toLowerCase();
  
  // Tipo de refrigeración
  if(extrasLower.includes("420") && extrasLower.includes("líquida")) score += 25;
  else if(extrasLower.includes("360") && extrasLower.includes("líquida")) score += 22;
  else if(extrasLower.includes("280") && extrasLower.includes("líquida")) score += 18;
  else if(extrasLower.includes("240") && extrasLower.includes("líquida")) score += 15;
  else if(extrasLower.includes("120") && extrasLower.includes("líquida")) score += 10;
  else if(extrasLower.includes("líquida")) score += 12;
  else if(extrasLower.includes("thermalright")) score += 12;
  else if(extrasLower.includes("noctua")) score += 15;
  else if(extrasLower.includes("corsair") && extrasLower.includes("icue")) score += 8;
  else if(extrasLower.includes("nzxt") && extrasLower.includes("kraken")) score += 10;
  
  return score;
}

/**
 * Calcula el score del gabinete basado en el texto de extras (Tier List - prioriza gama alta)
 * @param {string} extras - Texto que contiene información del case
 * @returns {number} Score del case (0-12 puntos)
 */
function getCaseScore(extras){
  let score = 0;
  
  // Marcas premium
  if(extras.includes("Fractal") || extras.includes("NZXT") || extras.includes("Lian Li")) score += 12;
  if(extras.includes("Cooler Master") && extras.includes("MasterBox")) score += 10;
  if(extras.includes("Cougar") || extras.includes("Antec") || extras.includes("Phanteks")) score += 10;
  if(extras.includes("Iceberg") && (extras.includes("Flow") || extras.includes("Titan"))) score += 10;
  if(extras.includes("XPG") && (extras.includes("Invader") || extras.includes("Defender"))) score += 8;
  
  return score;
}

/**
 * Calcula el score total de una build usando el algoritmo Tier List
 * Prioriza componentes de gama alta sin penalizar por precio
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
    (gpuScore * 1.6) +           // GPU es el componente más crítico para gaming
    (cpuScore * 1.4) +           // CPU es el segundo más importante
    (boardScore * 1.1) +         // Base del sistema
    (ramScore * 0.9) +           // RAM importante pero menos crítica
    (ssdScore * 0.7) +           // SSD afecta carga pero no gaming directamente
    (psuScore * 0.6) +           // PSU es crítico pero no afecta rendimiento
    (coolingScore * 0.5) +       // Cooling es importante pero secundario
    (caseScore * 0.4);           // Case es principalmente estética
  
  // 3. Bonus por componentes de gama ultra-alta (sin penalización por precio)
  let tierBonus = 0;
  if(gpuScore >= 180) tierBonus += 30; // S-Tier GPU
  if(cpuScore >= 140) tierBonus += 20; // S-Tier CPU
  if(boardScore >= 55) tierBonus += 10; // S-Tier Board
  if(psuScore >= 70) tierBonus += 10; // S-Tier PSU
  
  // 4. Bonus por builds completas de gama alta
  let completenessBonus = 0;
  if(cpuScore >= 120 && gpuScore >= 150 && boardScore >= 45) completenessBonus += 25;
  if(ramScore >= 30 && ssdScore >= 35) completenessBonus += 15;
  
  // Score final (redondeado)
  return Math.round(weightedScore + tierBonus + completenessBonus);
}

/**
 * Determina la categoría de una build basado en su score (Tier List)
 * @param {number} score - Score de la build
 * @returns {Object} Objeto con propiedades text (nombre categoría) y class (clase CSS)
 */
function getCategory(score){

  if(score >= 500){
    return {
      text:"👑 S-Tier - God Mode",
      class:"best"
    };
  }

  if(score >= 450){
    return {
      text:"🔥 A-Tier - High-End",
      class:"premium"
    };
  }

  if(score >= 400){
    return {
      text:"⚡ B-Tier - Premium",
      class:"future"
    };
  }

  if(score >= 350){
    return {
      text:"💎 C-Tier - Muy Bueno",
      class:"future"
    };
  }

  return {
    text:"📊 D-Tier - Gamer",
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
