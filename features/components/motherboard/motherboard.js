/**
 * Lógica de la feature Components/Motherboard
 */
const title = "Top Motherboards AM5";
const headers = ["Ranking", "Motherboard", "Precio COP", "Chipset", "Formato", "Por qué destaca"];
const rows = [
    ["🥇", "Gigabyte X870 Eagle WiFi7", "646,726", "X870", "ATX", "VRM robusto para Ryzen 9"],
    ["🥈", "MSI B850 Gaming Plus WiFi", "570,636", "B850", "ATX", "Muy solido para gaming e IA"],
    ["🥉", "ASUS Prime X870-P WiFi", "627,057", "X870", "ATX", "14+2+1 DrMOS 80A"],
    ["4", "ASRock AMD B850M-X", "550,000", "B850", "mATX", "WiFi integrado • PCIe 4.0"],
    ["5", "ASRock X870 Pro RS WiFi", "684,771", "X870", "ATX", "VRM premium • 4x M.2"],
    ["6", "ASUS TUF Gaming X870-PLUS WiFi", "715,246", "X870", "ATX", "16+2+1 SPS 80A"],
    ["7", "MSI MAG B850 Tomahawk MAX WiFi", "760,861", "B850", "ATX", "80A SPS VRM • LAN 5G"],
    ["8", "Gigabyte B850 Eagle WiFi6E", "559,261", "B850", "ATX", "VRM competente • WiFi 6E"],
    ["9", "Gigabyte B850M DS3H", "456,501", "B850", "mATX", "VRM basico • 2x M.2"]
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
