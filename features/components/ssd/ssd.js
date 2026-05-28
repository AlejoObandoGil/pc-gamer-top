/**
 * Lógica de la feature Components/SSD
 */
const title = "Top SSD NVMe";
const headers = ["Ranking", "SSD", "Precio COP", "Capacidad", "Velocidad", "Por qué destaca"];
const rows = [
    ["🥇", "Crucial P310 1TB", "717,785", "1TB", "7100 MB/s", "PCIe Gen4 • TLC • Excelente rendimiento"],
    ["🥈", "WD Black SN7100 1TB", "722,816", "1TB", "7250/6900 MB/s", "PCIe Gen4 • Marca premium"],
    ["🥉", "Kingston NV3 1TB", "579,900", "1TB", "6000/4000 MB/s", "PCIe Gen4 • Mejor calidad/precio"],
    ["4", "Fikwot FN955 1TB", "608,681", "1TB", "7300 MB/s", "PCIe Gen4 • Buen rendimiento"],
    ["5", "Kingston NV3 500GB", "370,000", "500GB", "5000/4000 MB/s", "PCIe Gen4 • Opción económica"]
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
