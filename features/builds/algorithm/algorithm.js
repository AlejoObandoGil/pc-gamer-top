/**
 * Lógica de la feature Builds/Algorithm
 * Maneja la UI, modal, localStorage y renderizado de builds
 */

import { calculateScore, getCategory } from './scoring-engine.js';
import { COMPONENTS } from '../../shared/data/components-data.js';
import { formatPrice } from '../../shared/utils/formatters.js';

// ========================================
// BUILDS
// ========================================

const builds = [];
const STORAGE_KEY = 'pcGamerBuilds_v2';
const COMPONENT_TYPES = ['cpu','board','gpu','ram','ssd','psu','cooler','case'];
const COMPONENT_LOOKUP = buildComponentLookup();

// ========================================
// AGREGAR BUILD
// ========================================

function addBuild(buildConfig, options = {}) {
  const normalized = normalizeBuildConfig(buildConfig);
  const scorePayload = buildScorePayload(normalized);
  normalized.score = calculateScore(scorePayload);
  builds.push(normalized);
  builds.sort((a, b) => b.score - a.score);
  if (!options.silent) {
    renderTable();
  }
  return normalized;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function buildComponentLookup() {
  const lookup = {};
  Object.entries(COMPONENTS).forEach(([type, list]) => {
    const byId = {};
    const byName = {};
    list.forEach((comp, index) => {
      if (comp.id) byId[comp.id] = comp;
      byName[comp.name.toLowerCase()] = comp;
      // Compatibilidad con selects antiguos basados en índice
      byId[index] = comp;
    });
    lookup[type] = { byId, byName };
  });
  return lookup;
}

function getComponentInfo(type, identifier) {
  if (!identifier || !COMPONENT_LOOKUP[type]) return null;
  const lookup = COMPONENT_LOOKUP[type];

  if (typeof identifier === 'object' && identifier !== null) {
    if (identifier.id && lookup.byId[identifier.id]) return lookup.byId[identifier.id];
    if (identifier.name) {
      const key = identifier.name.toLowerCase();
      if (lookup.byName[key]) return lookup.byName[key];
    }
    return null;
  }

  if (lookup.byId[identifier]) return lookup.byId[identifier];

  const key = typeof identifier === 'string'
    ? identifier.toLowerCase()
    : String(identifier).toLowerCase();
  return lookup.byName[key] || null;
}

function calculateBuildPrice(componentData) {
  return Object.values(componentData).reduce((sum, comp) => sum + (comp?.price || 0), 0);
}

function buildExtrasFromComponents(componentData) {
  const cooler = componentData.cooler?.name || '';
  const caseName = componentData.case?.name || '';
  return [cooler, caseName].filter(Boolean).join(' | ');
}

function normalizeBuildConfig(raw = {}) {
  const componentRefs = {};
  COMPONENT_TYPES.forEach(type => {
    if (raw.components?.[type]) {
      componentRefs[type] = raw.components[type];
    } else if (raw[type]) {
      componentRefs[type] = raw[type];
    }
  });

  const componentData = {};
  COMPONENT_TYPES.forEach(type => {
    componentData[type] = componentRefs[type] ? getComponentInfo(type, componentRefs[type]) : null;
  });

  const price = raw.price || calculateBuildPrice(componentData);
  const extras = raw.extras || buildExtrasFromComponents(componentData);

  return {
    id: raw.id || `build-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: raw.title || 'Build personalizada',
    components: componentRefs,
    componentData,
    price,
    extras,
    gaming: raw.gaming || raw.metaGaming || '-',
    ia: raw.ia || raw.metaIa || '-',
    future: raw.future || raw.metaFuture || '-',
    reason: raw.reason || raw.pros || null,
    pros: raw.pros || null,
    cons: raw.cons || null,
    isCustom: Boolean(raw.isCustom),
    source: raw.source || (raw.isCustom ? 'custom' : 'predefined')
  };
}

function buildScorePayload(build) {
  const data = build.componentData || {};
  return {
    cpu: data.cpu?.name || '',
    board: data.board?.name || '',
    gpu: data.gpu?.name || '',
    ram: data.ram?.name || '',
    ssd: data.ssd?.name || '',
    psu: data.psu?.name || '',
    extras: build.extras || buildExtrasFromComponents(data),
    price: build.price || 0
  };
}

function getStoredBuilds() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch (error) {
    console.warn('No se pudo leer builds guardadas', error);
    return [];
  }
}

function saveStoredBuilds(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function migrateLegacyBuildConfig(config) {
  if (!config) return null;
  if (config.components) return config;

  const componentRefs = {};
  COMPONENT_TYPES.forEach(type => {
    const legacyValue = config[type];
    if (legacyValue) {
      const comp = getComponentInfo(type, legacyValue);
      if (comp?.id) componentRefs[type] = comp.id;
    }
  });

  if (!Object.keys(componentRefs).length) return null;

  return {
    id: config.id || `legacy-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: config.title || 'Build personalizada',
    components: componentRefs,
    pros: config.pros,
    cons: config.cons,
    reason: config.reason,
    gaming: config.gaming,
    ia: config.ia,
    future: config.future,
    isCustom: true
  };
}

const PREDEFINED_BUILDS = [
  {
    title: "Mejor Calidad/Precio",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-gigabyte-b850-eagle-wifi6e',
      gpu: 'gpu-rx-9060xt-16gb',
      ram: 'ram-kingston-fury-beast-rgb-16',
      ssd: 'ssd-kingston-nv3-1tb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-adata-xpg-invader'
    },
    gaming: 'Excelente',
    ia: 'Buena',
    future: 'Muy alta',
    reason: 'La build AM5 más equilibrada para jugar 1440p ultra y crecer a futuro.'
  },
  {
    title: "RTX IA Local",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-gigabyte-b850-eagle-wifi6e',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-kingston-fury-beast-rgb-16',
      ssd: 'ssd-kingston-nv3-1tb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-iceberg-flow-e'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Muy alta',
    reason: 'La mejor combinación económica para IA local con CUDA y gaming moderno.'
  },
  {
    title: "RTX IA Local SSD 500GB",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-gigabyte-b850-eagle-wifi6e',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-kingston-fury-beast-16-5600',
      ssd: 'ssd-kingston-nv3-500gb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-iceberg-flow-e'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Alta',
    reason: 'La forma más barata de entrar a IA local seria con NVIDIA 16GB sin sacrificar rendimiento 1440p.'
  },
  {
    title: "Ultra Económica",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-gigabyte-b850m-ds3h',
      gpu: 'gpu-rx-9060xt-16gb',
      ram: 'ram-kingston-fury-beast-rgb-16',
      ssd: 'ssd-kingston-nv3-500gb',
      psu: 'psu-xpg-probe-700',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-iceberg-clacius'
    },
    gaming: 'Muy buena',
    ia: 'Correcta',
    future: 'Media',
    reason: 'La forma más barata de entrar fuerte a AM5 + 1440p.'
  },
  {
    title: "RTX Premium Budget",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-msi-b850-gaming-plus-wifi',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-kingston-fury-beast-rgb-16',
      ssd: 'ssd-kingston-nv3-500gb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-jyr-mesh'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Muy alta',
    reason: 'Board mucho más fuerte manteniendo precio accesible.'
  },
  {
    title: "RTX IA Premium",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-msi-b850-gaming-plus-wifi',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-puskill-32-6000-cl30',
      ssd: 'ssd-kingston-nv3-1tb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-peerless-120-se',
      case: 'case-lianli-lancool-207'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Extrema',
    reason: 'Build mucho más premium para IA local seria y upgrades largos.'
  },
  {
    title: "Top Gaming AMD",
    components: {
      cpu: 'cpu-ryzen-7-7800x3d',
      board: 'mb-msi-b850-gaming-plus-wifi',
      gpu: 'gpu-rx-9060xt-16gb',
      ram: 'ram-puskill-32-6000-cl30',
      ssd: 'ssd-wd-black-sn7100-1tb',
      psu: 'psu-corsair-rm850e',
      cooler: 'cooler-thermalright-phantom-spirit-120-se',
      case: 'case-lianli-lancool-207'
    },
    gaming: 'Excelente',
    ia: 'Muy buena',
    future: 'Extrema',
    reason: 'Gaming brutal en 1440p y preparado para GPUs futuras.'
  },
  {
    title: "AM5 Creator IA",
    components: {
      cpu: 'cpu-ryzen-9-9900x',
      board: 'mb-asus-tuf-x870-plus',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-puskill-32-6000-cl30',
      ssd: 'ssd-crucial-p310-1tb',
      psu: 'psu-fsp-vita-gm-1000',
      cooler: 'cooler-thermalright-peerless-140-se',
      case: 'case-thermaltake-view-170'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Extrema',
    reason: 'Pensada para productividad pesada, IA local y multitarea.'
  },
  {
    title: "Best Looking Build",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-asrock-x870-pro-rs',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-gigastone-game-pro-32',
      ssd: 'ssd-wd-black-sn7100-1tb',
      psu: 'psu-segotep-gm850',
      cooler: 'cooler-thermalright-peerless-120-se-argb-white',
      case: 'case-gabinete-pecera-arsx5'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Muy alta',
    reason: 'Build estética blanca/panorama muy fuerte para gaming e IA.'
  },
  {
    title: "Top Gama Absoluta",
    components: {
      cpu: 'cpu-ryzen-9-9950x3d',
      board: 'mb-msi-mag-b850-tomahawk',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-puskill-32-6000-cl30',
      ssd: 'ssd-crucial-p310-1tb',
      psu: 'psu-fsp-vita-gm-1000',
      cooler: 'cooler-thermalright-peerless-140-se',
      case: 'case-lianli-lancool-207'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Extrema',
    reason: 'Build exageradamente poderosa para gaming extremo y productividad.'
  },
  {
    title: "Compacta mATX WiFi",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-asrock-b850m-x',
      gpu: 'gpu-rx-9060xt-16gb',
      ram: 'ram-patriot-viper-elite5-16',
      ssd: 'ssd-kingston-nv3-500gb',
      psu: 'psu-xpg-probe-700',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-okinos-matx'
    },
    gaming: 'Excelente',
    ia: 'Buena',
    future: 'Alta',
    reason: 'Build compacta mATX con WiFi integrado, ideal para espacios reducidos sin sacrificar rendimiento AM5.'
  },
  {
    title: "RTX IA Budget",
    components: {
      cpu: 'cpu-ryzen-5-9600x',
      board: 'mb-gigabyte-b850-eagle-wifi6e',
      gpu: 'gpu-rtx-5060ti-16gb',
      ram: 'ram-kingston-fury-beast-rgb-16',
      ssd: 'ssd-kingston-nv3-500gb',
      psu: 'psu-msi-mag-a750bn-pcie5',
      cooler: 'cooler-thermalright-assassin-x120',
      case: 'case-iceberg-flow-e'
    },
    gaming: 'Excelente',
    ia: 'Excelente',
    future: 'Alta',
    reason: 'Versión económica de la build RTX IA Local manteniendo CUDA y DLSS.'
  }
];

// ========================================
// RENDER TABLE
// ========================================

function renderTable() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  builds.forEach((build, index) => {
    let medal = index + 1;

    if (index === 0) medal = "🥇";
    if (index === 1) medal = "🥈";
    if (index === 2) medal = "🥉";

    const category = getCategory(build.score);
    const data = build.componentData || {};
    const totalPrice = build.price || calculateBuildPrice(data);

    // Clases para Gaming, IA y Future
    const gamingClass = build.gaming === 'Excelente' ? 'good' : build.gaming === 'Muy buena' ? 'good' : 'mid';
    const iaClass = build.ia === 'Excelente' ? 'good' : build.ia === 'Buena' || build.ia === 'Muy buena' ? 'mid' : '';
    const futureClass = build.future === 'Extrema' || build.future === 'Muy alta' ? 'good' : build.future === 'Alta' ? 'mid' : '';

    tbody.innerHTML += `
      <tr>
        <td class="rank">${medal}</td>
        <td><strong>${build.title || 'Build personalizada'}</strong><br><small class="component-price">$${formatPrice(totalPrice)} COP</small></td>
        <td>${data.cpu?.name || '-'}<br><small class="specs">${data.cpu?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.cpu?.price || 0)} COP</small></td>
        <td>${data.board?.name || '-'}<br><small class="specs">${data.board?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.board?.price || 0)} COP</small></td>
        <td>${data.gpu?.name || '-'}<br><small class="specs">${data.gpu?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.gpu?.price || 0)} COP</small></td>
        <td>${data.ram?.name || '-'}<br><small class="specs">${data.ram?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.ram?.price || 0)} COP</small></td>
        <td>${data.ssd?.name || '-'}<br><small class="specs">${data.ssd?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.ssd?.price || 0)} COP</small></td>
        <td>${data.psu?.name || '-'}<br><small class="specs">${data.psu?.specs || ''}</small><br><small class="component-price">$${formatPrice(data.psu?.price || 0)} COP</small></td>
        <td class="${gamingClass}">${build.gaming || '-'}</td>
        <td class="${iaClass}">${build.ia || '-'}</td>
        <td class="${futureClass}">${build.future || '-'}</td>
        <td class="price">${formatPrice(totalPrice)}</td>
        <td class="score">${build.score}</td>
        <td><span class="tag ${category.class}">${category.text}</span></td>
        <td>${build.reason || build.pros || '-'}</td>
      </tr>
    `;
  });
}

// ========================================
// MODAL & LOCALSTORAGE
// ========================================

function populateSelects() {
  COMPONENT_TYPES.forEach(type => {
    const sel = document.getElementById('sel-' + type);
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Seleccionar ' + type.toUpperCase() + ' --</option>';
    COMPONENTS[type].forEach(comp => {
      const opt = document.createElement('option');
      opt.value = comp.id || comp.name;
      opt.textContent = comp.name;
      sel.appendChild(opt);
    });
    updateComponentInfo(type);
  });
  updateTotal();
}

function updateComponentInfo(type) {
  const sel = document.getElementById('sel-' + type);
  const info = document.getElementById('info-' + type);
  if (!sel || !info) return;
  if (!sel.value) {
    info.textContent = '';
  } else {
    const comp = getComponentInfo(type, sel.value);
    info.textContent = comp ? `${formatPrice(comp.price)} • ${comp.specs}` : '';
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  COMPONENT_TYPES.forEach(type => {
    const sel = document.getElementById('sel-' + type);
    if (!sel || !sel.value) return;
    const comp = getComponentInfo(type, sel.value);
    if (comp) total += comp.price;
  });
  document.getElementById('total-price').textContent = 'Total: ' + formatPrice(total);
}

function openModal() {
  populateSelects();
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
  // Limpiar campos
  document.getElementById('input-pros').value = '';
  document.getElementById('input-cons').value = '';
}

function createBuild() {
  const componentIds = {};
  COMPONENT_TYPES.forEach(type => {
    const sel = document.getElementById('sel-' + type);
    if (!sel || !sel.value) {
      componentIds.__missing = type;
      return;
    }
    const comp = getComponentInfo(type, sel.value);
    if (!comp) {
      componentIds.__missing = type;
      return;
    }
    componentIds[type] = comp.id || comp.name;
  });

  if (componentIds.__missing) {
    alert('Selecciona un componente para: ' + componentIds.__missing.toUpperCase());
    return;
  }

  delete componentIds.__missing;

  const pros = document.getElementById('input-pros').value?.trim() || 'Build personalizada por el usuario';
  const cons = document.getElementById('input-cons').value?.trim() || 'Sin contras documentadas';

  const buildConfig = {
    id: Date.now(),
    title: 'Build personalizada',
    components: componentIds,
    pros,
    cons,
    reason: pros,
    isCustom: true
  };

  addBuild(buildConfig);

  const stored = getStoredBuilds();
  stored.push({
    id: buildConfig.id,
    title: buildConfig.title,
    components: buildConfig.components,
    pros,
    cons,
    reason: buildConfig.reason,
    isCustom: true
  });
  saveStoredBuilds(stored);

  closeModal();
  loadCustomBuilds();
}

function loadCustomBuilds() {
  const stored = getStoredBuilds();
  const migrated = stored
    .map(migrateLegacyBuildConfig)
    .filter(Boolean);

  if (migrated.length !== stored.length) {
    saveStoredBuilds(migrated);
  }

  for (let i = builds.length - 1; i >= 0; i--) {
    if (builds[i].isCustom) builds.splice(i, 1);
  }

  migrated.forEach(cfg => addBuild({ ...cfg, isCustom: true }, { silent: true }));
  renderTable();
}

function clearCustomBuilds() {
  if (!confirm('Eliminar todas tus builds personalizadas?')) return;
  saveStoredBuilds([]);
  for (let i = builds.length - 1; i >= 0; i--) {
    if (builds[i].isCustom) builds.splice(i, 1);
  }
  renderTable();
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Botones principales
  document.getElementById('btn-create').addEventListener('click', openModal);
  document.getElementById('btn-clear').addEventListener('click', clearCustomBuilds);
  
  // Modal
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
  document.getElementById('btn-cancel').addEventListener('click', closeModal);
  document.getElementById('btn-create-build').addEventListener('click', createBuild);
  
  // Selects del modal
  COMPONENT_TYPES.forEach(type => {
    const sel = document.getElementById('sel-' + type);
    if (sel) sel.addEventListener('change', () => updateComponentInfo(type));
  });

  // Builds predefinidas
  PREDEFINED_BUILDS.forEach(config => addBuild(config, { silent: true }));
  renderTable();

  // Cargar builds personalizadas del localStorage
  loadCustomBuilds();
});
