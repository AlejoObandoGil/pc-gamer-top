/**
 * Lógica de la feature Components/Case
 */
const title = "Top Gabinetes";
const headers = ["Ranking", "Gabinete", "Precio COP", "Formato", "Características", "Por qué destaca"];
const rows = [
    ["🥇", "Lian Li Lancool 207 RW White", "360,000", "ATX", "4 Fans", "Excelente airflow • Marca premium"],
    ["🥈", "Iceberg Flow X ATX", "320,000", "ATX", "4 Fans", "Excelente calidad/precio"],
    ["🥉", "Iceberg Titan M4 ATX", "359,000", "ATX", "6 Fans", "Airflow excelente"],
    ["4", "Antec C5 Curve ARGB Blanco", "494,547", "ATX", "4 Fans", "Vidrio curvo premium"],
    ["5", "Lian Li V100 Mini Black", "320,000", "Mini ITX", "4 Fans", "Compacto premium"]
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
