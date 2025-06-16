// Population Chart Configuration
const laki_perempuan_pendudukChartConfig = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Jumlah Penduduk',
            data: [],
            backgroundColor: [
                'rgba(21, 223, 75, 0.7)',
                'rgba(22, 11, 216, 0.7)',
                'rgba(224, 9, 9, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1

            
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Penduduk'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        }
    }
};

// Economic Chart Configuration
const Peng_F_NFChartConfig = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Jumlah Penduduk',
            data: [],
            backgroundColor: [
                'rgba(141, 57, 5, 0.7)',
                'rgba(226, 116, 12, 0.7)',
                'rgba(238, 217, 52, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1

            
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Penduduk'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        }
    }
};

// Land Use Chart Configuration
const laki_perempuan_kerjaChartConfig = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'Jumlah Bekerja (ribuan)',
            data: [],
            backgroundColor: [
                'rgba(46, 0, 251, 0.75)',
                'rgba(255, 59, 95, 0.7)'
            ],
            borderColor: [
                'rgb(33, 151, 255)',
                'rgb(255, 59, 59)'

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
};