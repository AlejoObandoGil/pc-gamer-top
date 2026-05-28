/**
 * Lógica de la feature Components/Cooler
 */
const title = "Top Coolers CPU";
const headers = ["Ranking", "Cooler", "Precio COP", "Tipo", "Características", "Por qué destaca"];
const rows = [
    ["🥇", "Thermalright Phantom Spirit 120 SE", "136,581", "Aire", "Dual Tower • 7 Heatpipes", "Muy silencioso • Mejor rendimiento/precio"],
    ["🥈", "Thermalright Peerless Assassin 120 SE", "125,168", "Aire", "Dual Tower • 6 Heatpipes", "Silencioso • Excelente valor"],
    ["🥉", "Thermalright Peerless Assassin 140 SE", "163,213", "Aire", "Dual Tower • 6 Heatpipes • 140mm", "Mejor disipación para 140mm"],
    ["4", "Thermalright Phantom Spirit 120 Digital EVO", "212,671", "Aire", "Dual Tower • 7 Heatpipes", "Pantalla digital • Premium"],
    ["5", "Thermalright Peerless Assassin 120 SE ARGB", "140,386", "Aire", "Dual Tower • 6 Heatpipes", "ARGB • Estética"]
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
