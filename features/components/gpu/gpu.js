/**
 * Lógica de la feature Components/GPU
 */

const title = "Top GPUs Gaming 2026";

const headers = [
    "Ranking", "GPU", "Precio COP", "VRAM / Memoria", "Tecnologias",
    "Gaming 1440p", "IA Local", "Calidad/Precio", "Por que destaca"
];

const rows = [
    ["🥇", "RTX 5090 24GB", "7,500,000", "24GB GDDR7", "DLSS 4 • Frame Gen", "Extremo", "Maximo", "Premium", "Lo mas potente del mercado, 4K/240Hz sin problemas"],
    ["🥈", "RTX 5080 16GB", "5,500,000", "16GB GDDR7", "DLSS 4 • Frame Gen", "Extremo", "Excelente", "Muy buena", "Potencia bruta para 4K con DLSS 4"],
    ["🥉", "RX 9090 24GB", "7,000,000", "24GB GDDR6", "FSR 4", "Extremo", "Excelente", "Premium", "Alternativa AMD de gama extrema con mucha VRAM"],
    ["4", "RTX 5070 Ti 16GB", "3,800,000", "16GB GDDR7", "DLSS 4 • Frame Gen", "Excelente", "Muy bueno", "Excelente", "Sweet spot 1440p Ultra con IA local"],
    ["5", "RX 9080 16GB", "5,200,000", "16GB GDDR6", "FSR 4", "Excelente", "Muy bueno", "Buena", "Gran rendimiento rasterizado para 4K"],
    ["6", "RTX 5070 12GB", "3,000,000", "12GB GDDR7", "DLSS 4 • Frame Gen", "Muy bueno", "Bueno", "Excelente", "Estandar 1440p Ultra con tecnologias NVIDIA"],
    ["7", "RX 9070 XT 16GB", "3,200,000", "16GB GDDR6", "FSR 4", "Excelente", "Muy bueno", "Excelente", "Mejor calidad/precio para 1440p/4K AMD"],
    ["8", "RTX 5060 Ti 16GB", "2,400,000", "16GB GDDR6", "DLSS • Frame Gen", "Muy bueno", "Bueno", "Muy buena", "IA local barata con 16GB VRAM"],
    ["9", "RX 9070 16GB", "2,600,000", "16GB GDDR6", "FSR 4", "Muy bueno", "Bueno", "Muy buena", "Rendimiento solido con mucha VRAM"],
    ["10", "RX 9060 XT 16GB", "1,900,000", "16GB GDDR6", "FSR 4", "Muy bueno", "Aceptable", "Excelente", "Excelente raster 1440p por el precio"],
    ["11", "RTX 5060 8GB", "1,800,000", "8GB GDDR6", "DLSS • Frame Gen", "Bueno", "Limitado", "Buena", "1080p/1440p alto con DLSS 4"],
    ["12", "RX 9060 8GB", "1,800,000", "8GB GDDR6", "FSR 4", "Bueno", "Limitado", "Buena", "Buena opcion AMD para 1080p Ultra"],
    ["13", "RTX 4060 8GB", "1,500,000", "8GB GDDR6", "DLSS 3", "Correcto", "Muy limitado", "Regular", "1080p Alto, ya envejeciendo"],
    ["14", "RX 7600 8GB", "1,200,000", "8GB GDDR6", "FSR 3", "Correcto", "Muy limitado", "Buena", "Buena entrada 1080p AMD"],
    ["15", "RTX 3050 8GB", "900,000", "8GB GDDR6", "DLSS 2", "Aceptable", "No", "Regular", "Solo para esports y gaming ligero"],
    ["16", "RX 6600 8GB", "800,000", "8GB GDDR6", "FSR 2", "Aceptable", "No", "Muy buena", "La mejor opcion calidad/precio entrada"],
    ["17", "GTX 1660 Super 6GB", "600,000", "6GB GDDR5", "Ninguna", "Limitado", "No", "Regular", "Obsoleto, solo para juegos viejos"]
];

document.getElementById('main-title').innerText = title;

const podiumContainer = document.getElementById('podium-gpus');
rows.slice(0, 3).forEach((row, index) => {
    const card = document.createElement('div');
    card.className = `podium-card rank-${index + 1}`;
    card.innerHTML = `
        <span class="medal">${row[0]}</span>
        <div class="gpu-name">${row[1]}</div>
        <div class="gpu-price">$${row[2]} COP</div>
        <span class="gpu-badge">${row[3]} | ${row[4]}</span>
        <div class="gpu-highlight">"${row[8]}"</div>
    `;
    podiumContainer.appendChild(card);
});

const headerRow = document.getElementById('table-headers');
headers.forEach(header => {
    const th = document.createElement('th');
    th.innerText = header;
    headerRow.appendChild(th);
});

const tableBody = document.getElementById('table-body');
rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach((cellData, index) => {
        const td = document.createElement('td');
        td.innerText = cellData;
        if(index === 0 || index === 5 || index === 6 || index === 7) {
            td.className = "text-center";
        }
        if(index === 2) {
            td.innerText = `$${cellData}`;
            td.className = "price-col";
        }
        tr.appendChild(td);
    });
    tableBody.appendChild(tr);
});
