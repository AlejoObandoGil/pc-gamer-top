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

// ========================================
// AGREGAR BUILD
// ========================================

function addBuild(build) {
  build.score = calculateScore(build);
  builds.push(build);
  builds.sort((a, b) => b.score - a.score);
  renderTable();
}

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

    tbody.innerHTML += `
      <tr>
        <td class="rank">${medal}</td>
        <td>${build.cpu}</td>
        <td>${build.board}</td>
        <td>${build.gpu}</td>
        <td>${build.ram}</td>
        <td>${build.ssd}</td>
        <td>${build.psu}</td>
        <td>${build.extras}</td>
        <td class="price">${formatPrice(build.price)}</td>
        <td class="score">${build.score}</td>
        <td><span class="tag ${category.class}">${category.text}</span></td>
        <td class="good">${build.pros}</td>
        <td class="bad">${build.cons}</td>
      </tr>
    `;
  });
}

// ========================================
// MODAL & LOCALSTORAGE
// ========================================

function populateSelects() {
  Object.keys(COMPONENTS).forEach(type => {
    const sel = document.getElementById('sel-' + type);
    sel.innerHTML = '<option value="">-- Seleccionar ' + type.toUpperCase() + ' --</option>';
    COMPONENTS[type].forEach((comp, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = comp.name;
      sel.appendChild(opt);
    });
  });
  updateTotal();
}

function updateComponentInfo(type) {
  const sel = document.getElementById('sel-' + type);
  const info = document.getElementById('info-' + type);
  const idx = sel.value;
  if (idx === "") {
    info.textContent = "";
  } else {
    const comp = COMPONENTS[type][idx];
    info.textContent = formatPrice(comp.price) + ' • ' + comp.specs;
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  Object.keys(COMPONENTS).forEach(type => {
    const sel = document.getElementById('sel-' + type);
    if (sel.value !== "") total += COMPONENTS[type][sel.value].price;
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
  const selections = {};
  let total = 0;
  for (const type of Object.keys(COMPONENTS)) {
    const sel = document.getElementById('sel-' + type);
    if (sel.value === "") {
      alert('Selecciona un componente para: ' + type.toUpperCase());
      return;
    }
    selections[type] = COMPONENTS[type][sel.value];
    total += selections[type].price;
  }
  const extras = selections.cooler.name + ' | ' + selections.case.name;
  const build = {
    cpu: selections.cpu.name,
    board: selections.board.name,
    gpu: selections.gpu.name,
    ram: selections.ram.name,
    ssd: selections.ssd.name,
    psu: selections.psu.name,
    extras: extras,
    price: total,
    pros: document.getElementById('input-pros').value || 'Build personalizada por el usuario',
    cons: document.getElementById('input-cons').value || 'Sin contras documentadas',
    isCustom: true,
    id: Date.now()
  };
  build.score = calculateScore(build);
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  stored.push(build);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  closeModal();
  loadCustomBuilds();
}

function loadCustomBuilds() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  for (let i = builds.length - 1; i >= 0; i--) {
    if (builds[i].isCustom) builds.splice(i, 1);
  }
  stored.forEach(b => builds.push(b));
  builds.sort((a, b) => b.score - a.score);
  renderTable();
}

function clearCustomBuilds() {
  if (!confirm('Eliminar todas tus builds personalizadas?')) return;
  localStorage.removeItem(STORAGE_KEY);
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
  Object.keys(COMPONENTS).forEach(type => {
    const sel = document.getElementById('sel-' + type);
    sel.addEventListener('change', () => updateComponentInfo(type));
  });

  // Builds predefinidas
  addBuild({
    cpu: "Ryzen 5 9600X",
    board: "B650M",
    gpu: "RTX 5070 12GB",
    ram: "16GB DDR5 6000",
    ssd: "1TB SSD",
    psu: "800W Bronze",
    extras: "Líquida 240 + 7 Fans",
    price: 5920000,
    pros: "Excelente balance general, GPU muy potente, AM5 sólida",
    cons: "Fuente no especificada"
  });

  addBuild({
    cpu: "Ryzen 5 9600X",
    board: "MSI B850-S",
    gpu: "RTX 5070 ASUS PRIME",
    ram: "16GB G.Skill 6000",
    ssd: "1TB Patriot",
    psu: "Cooler Master Gold Modular",
    extras: "Thermalright + Cougar Panorámico",
    price: 6990000,
    pros: "La build más refinada y premium",
    cons: "Precio bastante elevado"
  });

  addBuild({
    cpu: "Ryzen 5 9600X",
    board: "X870 Gigabyte WiFi",
    gpu: "RTX 5060Ti 16GB",
    ram: "16GB DDR5",
    ssd: "1TB SSD",
    psu: "750W Bronze",
    extras: "Thermalright",
    price: 5720000,
    pros: "La mejor motherboard del listado",
    cons: "La RTX 5070 envejece mucho mejor"
  });

  addBuild({
    cpu: "Ryzen 7 8700F",
    board: "MSI PRO B840-B",
    gpu: "RTX 5070 12GB",
    ram: "16GB DDR5",
    ssd: "500GB SSD",
    psu: "800W 80+",
    extras: "Monitor MSI 144Hz + periféricos",
    price: 5780000,
    pros: "Excelente valor total incluyendo monitor",
    cons: "SSD corto y componentes ocultos"
  });

  addBuild({
    cpu: "Ryzen 7 8700F",
    board: "B650M",
    gpu: "RX 9060 XT 16GB",
    ram: "16GB DDR5",
    ssd: "1TB SSD",
    psu: "650W Bronze",
    extras: "4 Fans RGB",
    price: 5550000,
    pros: "Muy buena multitarea y raster",
    cons: "RT y DLSS inferiores"
  });

  addBuild({
    cpu: "Ryzen 5 7600X",
    board: "A620M ASRock",
    gpu: "RTX 5060Ti 16GB",
    ram: "16GB 5600",
    ssd: "1TB SSD",
    psu: "750W Bronze",
    extras: "Thermalright",
    price: 5250000,
    pros: "Muy buena económica",
    cons: "A620 limita upgrades"
  });

  addBuild({
    cpu: "Ryzen 5 9600X",
    board: "MSI B650M",
    gpu: "RTX 5060Ti 16GB PNY",
    ram: "16GB DDR5 Patriot",
    ssd: "512GB NVMe Patriot",
    psu: "700W Bronze AZZA",
    extras: "Líquida GameMax + Antec 5 ARGB",
    price: 5520000,
    pros: "Muy equilibrada y con marcas reales",
    cons: "SSD corto y PSU normalita"
  });

  addBuild({
    cpu: "Ryzen 5 7600X",
    board: "B650",
    gpu: "RTX 5060Ti 16GB",
    ram: "16GB DDR5",
    ssd: "480GB SSD",
    psu: "650W Bronze",
    extras: "Disipador de aire",
    price: 5390000,
    pros: "Buen combo CPU/GPU",
    cons: "Muy poca especificación real"
  });

  addBuild({
    cpu: "Ryzen 7 8700F",
    board: "B650M",
    gpu: "RTX 5060Ti 16GB",
    ram: "16GB DDR5",
    ssd: "480GB SSD",
    psu: "650W Bronze",
    extras: "4 Fans",
    price: 5650000,
    pros: "Buen CPU multitarea",
    cons: "Cara para la GPU"
  });

  addBuild({
    cpu: "Ryzen 5 7500F",
    board: "Gigabyte B650M Gaming WiFi",
    gpu: "RX 9060 XT 16GB",
    ram: "16GB XPG 5600",
    ssd: "1TB Kingston NV3",
    psu: "650W Gold",
    extras: "Cooler Master Elite 502",
    price: 6036000,
    pros: "Buena PSU y board",
    cons: "CPU flojo para el precio"
  });

  addBuild({
    cpu: "Ryzen 5 7600X",
    board: "B850M WiFi6",
    gpu: "RTX 5060Ti MSI",
    ram: "16GB Viper",
    ssd: "1TB Kingston NV3",
    psu: "750W Cougar Bronze",
    extras: "Thermalright + Cougar",
    price: 6610000,
    pros: "Board moderna",
    cons: "Demasiado cara para una 5060Ti"
  });

  addBuild({
    cpu: "Ryzen 5 4800F",
    board: "B650M",
    gpu: "RTX 5060Ti 16GB",
    ram: "16GB DDR5",
    ssd: "480GB NVMe",
    psu: "650W Bronze",
    extras: "4 Fans",
    price: 5350000,
    pros: "GPU competente",
    cons: "CPU muy dudoso"
  });

  // Cargar builds personalizadas del localStorage
  loadCustomBuilds();
});
