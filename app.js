// Initialize the map centered on Sumatra
const map = L.map('map-container').setView([-0.5, 101.5], 6);

// Add base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variables to store our layers and charts
let provincesLayer;
let laki_perempuan_pendudukChart, Peng_F_NFChart, laki_perempuan_kerjaChart;

// Fungsi warna berdasarkan nilai (misalnya: kepadatan penduduk)
function getColor(e) {
  return e > 1000 ? '#800026' :
         e > 500  ? '#BD0026' :
         e > 200  ? '#E31A1C' :
         e > 100  ? '#FC4E2A' :
         e > 50   ? '#FD8D3C' :
         e > 20   ? '#FEB24C' :
         e > 10   ? '#FED976' :
                    '#FFEDA0';
}

// Function to style the provinces
function styleProvince(feature) {
    return {
        fillColor: getColor(feature.properties.Kpdt_Pddk),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

var info = L.control();

function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update();
}

// Function to highlight province on hover
function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#666',
        fillOpacity: 0.9
    });
    layer.bringToFront();
    info.update(layer.feature.properties);
}

// Function to reset highlight
function resetHighlight(e) {
    provincesLayer.resetStyle(e.target);
    info.update();
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (province) {
    this._div.innerHTML = '<h4>Kepadatan Penduduk per Provinsi di Pulau Sumatra</h4>' +  (province ?
        '<b>' + province.PROVINSI + '</b><br />' + province.Kpdt_Pddk + ' jiwa / km<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// Function to zoom to province on click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
}

// Function to show province info
function showProvinceInfo(e) {
    const province = e.target.feature.properties;
    updateCharts(province);
    document.getElementById('sidebar').classList.add('active');
}

// Add event listeners to each province
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: showProvinceInfo
    });
}

// Load the GeoJSON data
fetch('sumatra_sangatfix.geojson')
    .then(response => response.json())
    .then(data => {
        // Add GeoJSON layer to the map
        provincesLayer = L.geoJSON(data, {
            style: styleProvince,
            onEachFeature: onEachFeature 
        }).addTo(map);
        
        // Fit map to the bounds of Sumatra
        map.fitBounds(provincesLayer.getBounds());
    })
    .catch(error => {
        console.error('Error loading GeoJSON data:', error);
    });

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get chart contexts
    const laki_perempuan_pendudukCtx = document.getElementById('laki_perempuan_penduduk-chart').getContext('2d');
    const Peng_F_NFCtx = document.getElementById('Peng_F_NF-chart').getContext('2d');
    const laki_perempuan_kerjaCtx = document.getElementById('laki_perempuan_kerja-chart').getContext('2d');
    
    // Initialize charts with empty data
    laki_perempuan_pendudukChart = new Chart(laki_perempuan_pendudukCtx, laki_perempuan_pendudukChartConfig);
    Peng_F_NFChart = new Chart(Peng_F_NFCtx, Peng_F_NFChartConfig);
    laki_perempuan_kerjaChart = new Chart(laki_perempuan_kerjaCtx, laki_perempuan_kerjaChartConfig);
    
    // Close sidebar event
    document.getElementById('close-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });
});

// Function to update charts with province data
function updateCharts(province) {
    // Update population chart
    laki_perempuan_pendudukChart.data.labels = ['Jumlah Populasi Total', 'Jumlah Populasi Laki-laki', 'Jumlah Populasi Perempuan'];
    laki_perempuan_pendudukChart.data.datasets[0].data = [
        province.total,
        province.laki_laki,
        province.perempuan
    ];
    laki_perempuan_pendudukChart.update();
    
    // Update economic chart
    Peng_F_NFChart.data.labels = ['Total Pengeluaran Per Kapita Sebulan', 'Pengeluaran Makanan Sebulan', 'Pengeluaran Non Makanan Sebulan'];
    Peng_F_NFChart.data.datasets[0].data = [
        province.Tot_F_NF,
        province.Food,
        province.No_Food
    ];
    Peng_F_NFChart.update();
    
    // Update land use chart
    laki_perempuan_kerjaChart.data.labels = ['Laki-laki', 'Perempuan'];
    laki_perempuan_kerjaChart.data.datasets[0].data = [
        province.Lk_Kerja,
        province.Prmp_Kerja,
    ];
    laki_perempuan_kerjaChart.update();
    
    // Update sidebar title
    document.querySelector('.sidebar-header h2').textContent = `Statistik ${province.PROVINSI}`;
}