/**
 * Lógica de la feature Components/RAM
 */
const title = "Top RAM DDR5";
const headers = ["Ranking", "RAM", "Precio COP", "Capacidad", "Velocidad", "Por qué destaca"];
const rows = [
    ["🥇", "PUSKILL DDR5 32GB (2x16) 6000 CL30", "1,366,157", "32GB", "6000MHz CL30", "Dual Channel • Mejor relación precio/rendimiento"],
    ["🥈", "Corsair Vengeance RGB DDR5 32GB", "1,600,000", "32GB", "6000MHz", "RGB • Marca premium"],
    ["🥉", "GIGASTONE Game PRO DDR5 32GB", "1,327,732", "32GB", "6000MHz", "Estética gamer • Buena calidad"],
    ["4", "Kingston Fury Beast RGB 16GB", "1,019,415", "16GB", "6000MHz CL36", "RGB • Marca confiable"],
    ["5", "Patriot Viper Elite 5 DDR5 16GB 6000 CL30", "735,000", "16GB", "6000MHz CL30", "AMD EXPO • Excelente timings"]
];
document.getElementById('main-title').innerText = title;
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
        if(index === 0) td.className = "text-center";
        if(index === 2) {
            td.innerText = `$${cellData}`;
            td.className = "price-col";
        }
        tr.appendChild(td);
    });
    tableBody.appendChild(tr);
});
