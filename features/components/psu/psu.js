/**
 * Lógica de la feature Components/PSU
 */
const title = "Top Fuentes de Poder";
const headers = ["Ranking", "PSU", "Precio COP", "Potencia", "Certificación", "Por qué destaca"];
const rows = [
    ["🥇", "Corsair RM850e 850W", "490,000", "850W", "80+ Gold", "Modular • Marca premium"],
    ["🥈", "GIGABYTE UD750GM PG5 V2 ICE", "304,322", "750W", "80+ Platinum", "ATX3.1 • Excelente eficiencia"],
    ["🥉", "CORSAIR RM750e ATX 3.1", "380,412", "750W", "80+ Gold", "PCIe5.1 • Modular"],
    ["4", "FSP VITA GM 1000W", "494,546", "1000W", "80+ Gold", "Modular • Alta potencia"],
    ["5", "ASRock PRO 750G", "209,209", "750W", "80+ Gold", "ATX 3.1 • Mejor calidad/precio"]
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
