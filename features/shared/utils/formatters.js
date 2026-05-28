/**
 * Utilidades de formato para precios y datos
 */

/**
 * Formatea un número como precio en formato colombiano
 * @param {number} price - Precio en COP
 * @returns {string} Precio formateado (ej: "$1,500,000 COP")
 */
export function formatPrice(price) {
  return `$${price.toLocaleString('es-CO')} COP`;
}

/**
 * Formatea un número con separadores de miles
 * @param {number} number - Número a formatear
 * @returns {string} Número formateado
 */
export function formatNumber(number) {
  return number.toLocaleString('es-CO');
}

/**
 * Trunca texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado con "..." si excede el máximo
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
