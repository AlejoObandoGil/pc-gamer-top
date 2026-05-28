/**
 * Compatibility Engine v1.0
 * Valida compatibilidad entre componentes de PC
 * Similar a PCPartPicker: socket, RAM type, form factor, PSU wattage
 */

/**
 * Calcula el consumo total estimado de una build
 * @param {Object} componentData - Objeto con datos de componentes
 * @returns {number} Consumo total en Watts
 */
function calculateTotalPowerDraw(componentData) {
  let total = 0;
  
  // CPU TDP
  if (componentData.cpu?.tdp) {
    total += componentData.cpu.tdp;
  }
  
  // GPU TDP
  if (componentData.gpu?.tdp) {
    total += componentData.gpu.tdp;
  }
  
  // Overhead para otros componentes (RAM, SSD, fans, etc.)
  // Estimado: 50-100W dependiendo de la configuración
  const overhead = 75;
  total += overhead;
  
  return total;
}

/**
 * Valida si la PSU es adecuada para el consumo de la build
 * @param {Object} psu - Objeto PSU con wattage
 * @param {number} totalDraw - Consumo total en Watts
 * @returns {Object} { valid: boolean, message: string, recommendedWattage: number }
 */
function validatePSU(psu, totalDraw) {
  if (!psu?.wattage) {
    return {
      valid: false,
      message: 'PSU no tiene información de wattage',
      recommendedWattage: Math.ceil(totalDraw * 1.5 / 50) * 50
    };
  }
  
  // Recomendación: PSU debe tener al menos 1.5x el consumo total
  const recommendedWattage = Math.ceil(totalDraw * 1.5 / 50) * 50;
  const minimumWattage = Math.ceil(totalDraw * 1.2 / 50) * 50;
  
  if (psu.wattage < minimumWattage) {
    return {
      valid: false,
      message: `PSU insuficiente: ${psu.wattage}W (mínimo: ${minimumWattage}W, recomendado: ${recommendedWattage}W)`,
      recommendedWattage
    };
  }
  
  if (psu.wattage < recommendedWattage) {
    return {
      valid: true,
      warning: true,
      message: `PSU aceptable pero no ideal: ${psu.wattage}W (recomendado: ${recommendedWattage}W)`,
      recommendedWattage
    };
  }
  
  return {
    valid: true,
    message: `PSU adecuada: ${psu.wattage}W (consumo estimado: ${totalDraw}W)`,
    recommendedWattage
  };
}

/**
 * Valida compatibilidad de socket CPU con motherboard
 * @param {Object} cpu - Objeto CPU con socket
 * @param {Object} board - Objeto motherboard con socket
 * @returns {Object} { valid: boolean, message: string }
 */
function validateSocket(cpu, board) {
  if (!cpu?.socket || !board?.socket) {
    return {
      valid: false,
      message: 'Falta información de socket en CPU o motherboard'
    };
  }
  
  if (cpu.socket !== board.socket) {
    return {
      valid: false,
      message: `Incompatibilidad de socket: CPU (${cpu.socket}) no es compatible con motherboard (${board.socket})`
    };
  }
  
  return {
    valid: true,
    message: `Socket compatible: ${cpu.socket}`
  };
}

/**
 * Valida compatibilidad de tipo de RAM con motherboard
 * @param {Object} ram - Objeto RAM con type
 * @param {Object} board - Objeto motherboard con ramType
 * @returns {Object} { valid: boolean, message: string }
 */
function validateRAMType(ram, board) {
  if (!ram?.type || !board?.ramType) {
    return {
      valid: false,
      message: 'Falta información de tipo de RAM en RAM o motherboard'
    };
  }
  
  if (ram.type !== board.ramType) {
    return {
      valid: false,
      message: `Incompatibilidad de RAM: ${ram.type} no es compatible con motherboard (${board.ramType})`
    };
  }
  
  return {
    valid: true,
    message: `RAM compatible: ${ram.type}`
  };
}

/**
 * Valida compatibilidad de form factor motherboard con case
 * @param {Object} board - Objeto motherboard con formFactor
 * @param {Object} caseComp - Objeto case con formFactor
 * @returns {Object} { valid: boolean, message: string }
 */
function validateFormFactor(board, caseComp) {
  if (!board?.formFactor || !caseComp?.formFactor) {
    return {
      valid: false,
      message: 'Falta información de form factor en motherboard o case'
    };
  }
  
  // Reglas de compatibilidad de form factor
  const compatibility = {
    'ATX': ['ATX'],
    'mATX': ['ATX', 'mATX'],
    'ITX': ['ATX', 'mATX', 'ITX']
  };
  
  const allowedCases = compatibility[board.formFactor] || [];
  
  if (!allowedCases.includes(caseComp.formFactor)) {
    return {
      valid: false,
      message: `Incompatibilidad de form factor: Motherboard ${board.formFactor} no cabe en case ${caseComp.formFactor}`
    };
  }
  
  return {
    valid: true,
    message: `Form factor compatible: Motherboard ${board.formFactor} en case ${caseComp.formFactor}`
  };
}

/**
 * Valida compatibilidad completa de una build
 * @param {Object} componentData - Objeto con datos de todos los componentes
 * @returns {Object} { valid: boolean, issues: Array, warnings: Array }
 */
function validateBuildCompatibility(componentData) {
  const issues = [];
  const warnings = [];
  
  // Validar socket CPU-Board
  if (componentData.cpu && componentData.board) {
    const socketValidation = validateSocket(componentData.cpu, componentData.board);
    if (!socketValidation.valid) {
      issues.push(socketValidation.message);
    }
  }
  
  // Validar tipo de RAM
  if (componentData.ram && componentData.board) {
    const ramValidation = validateRAMType(componentData.ram, componentData.board);
    if (!ramValidation.valid) {
      issues.push(ramValidation.message);
    }
  }
  
  // Validar form factor Board-Case
  if (componentData.board && componentData.case) {
    const formFactorValidation = validateFormFactor(componentData.board, componentData.case);
    if (!formFactorValidation.valid) {
      issues.push(formFactorValidation.message);
    }
  }
  
  // Validar PSU wattage
  if (componentData.psu) {
    const totalDraw = calculateTotalPowerDraw(componentData);
    const psuValidation = validatePSU(componentData.psu, totalDraw);
    if (!psuValidation.valid) {
      issues.push(psuValidation.message);
    } else if (psuValidation.warning) {
      warnings.push(psuValidation.message);
    }
  }
  
  return {
    valid: issues.length === 0,
    issues,
    warnings,
    totalPowerDraw: calculateTotalPowerDraw(componentData)
  };
}

/**
 * Calcula un score de compatibilidad (0-100)
 * @param {Object} componentData - Objeto con datos de todos los componentes
 * @returns {number} Score de compatibilidad
 */
function getCompatibilityScore(componentData) {
  const validation = validateBuildCompatibility(componentData);
  
  if (!validation.valid) {
    return 0;
  }
  
  let score = 100;
  
  // Penalizar por warnings
  score -= validation.warnings.length * 10;
  
  // Bonus por PSU ideal (margen de seguridad)
  if (componentData.psu && componentData.cpu && componentData.gpu) {
    const totalDraw = calculateTotalPowerDraw(componentData);
    const psuMargin = componentData.psu.wattage / totalDraw;
    
    if (psuMargin >= 1.5) {
      score += 5; // PSU ideal
    } else if (psuMargin >= 1.3) {
      score += 2; // PSU aceptable
    }
  }
  
  return Math.min(100, Math.max(0, score));
}

export {
  calculateTotalPowerDraw,
  validatePSU,
  validateSocket,
  validateRAMType,
  validateFormFactor,
  validateBuildCompatibility,
  getCompatibilityScore
};
