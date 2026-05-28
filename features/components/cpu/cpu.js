/**
 * Lógica de la feature Components/CPU
 */

// Estructura de datos idéntica a tu script de Python
const title = "Top CPUs AM5 Amazon";

const headers = [
    "Ranking", "Procesador", "Precio Amazon COP", "Núcleos/Hilos", 
    "Arquitectura", "Gaming 1440p", "IA Local", "Consumo/Eficiencia", "Por qué destaca"
];

const rows = [
    ["🥇", "AMD Ryzen 7 7800X3D", "1,429,693", "8C / 16T", "Zen 4 X3D", "El mejor gaming CPU", "Muy bueno", "Excelente eficiencia", "La mejor experiencia gaming posible y enorme longevidad"],
    ["🥈", "AMD Ryzen 5 9600X", "684,429", "6C / 12T", "Zen 5", "Excelente", "Muy bueno", "Muy eficiente", "El rey calidad/precio actual para gaming e IA ligera/media"],
    ["🥉", "AMD Ryzen 7 7700X", "890,253", "8C / 16T", "Zen 4", "Excelente", "Muy bueno", "Consumo moderado", "Excelente multitarea y productividad"],
    ["4", "AMD Ryzen 5 7600X", "616,329", "6C / 12T", "Zen 4", "Muy bueno", "Bueno", "Muy eficiente", "Sigue siendo brutal para 1440p y bastante económico"],
    ["5", "AMD Ryzen 5 8500G", "532,630", "6C / 12T", "Zen 4 APU", "Aceptable", "Limitado", "Muy eficiente", "Solo vale la pena sin GPU dedicada"],
    ["6", "AMD Ryzen 5 5500", "319,578", "6C / 12T", "Zen 3", "Correcto", "Limitado", "Muy eficiente", "Muy barato, pero plataforma AM4 ya envejecida"]
];

// Asignar título
document.getElementById('main-title').innerText = title;

// Renderizar las "Boards" del Top 3 de manera visual
const podiumContainer = document.getElementById('podium-boards');
rows.slice(0, 3).forEach((row, index) => {
    const card = document.createElement('div');
    card.className = `podium-card rank-${index + 1}`;
    
    card.innerHTML = `
        <span class="medal">${row[0]}</span>
        <div class="cpu-name">${row[1]}</div>
        <div class="cpu-price">$${row[2]} COP</div>
        <span class="cpu-badge">${row[4]} | ${row[3]}</span>
        <div class="cpu-highlight">"${row[8]}"</div>
    `;
    podiumContainer.appendChild(card);
});

// Renderizar Encabezados de la Tabla
const headerRow = document.getElementById('table-headers');
headers.forEach(header => {
    const th = document.createElement('th');
    th.innerText = header;
    headerRow.appendChild(th);
});

// Renderizar Filas de la Tabla Completa
const tableBody = document.getElementById('table-body');
rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach((cellData, index) => {
        const td = document.createElement('td');
        td.innerText = cellData;
        
        // Centrar columnas cortas o medallas
        if(index === 0 || index === 3) {
            td.className = "text-center";
        }
        // Resaltar precio
        if(index === 2) {
            td.innerText = `$${cellData}`;
            td.className = "price-col";
        }
        
        tr.appendChild(td);
    });
    tableBody.appendChild(tr);
});
