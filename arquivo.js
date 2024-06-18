document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('studyChart').getContext('2d');
    var studyChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Horas de Estudo',
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                datalabels: {
                    color: '#fff',
                    formatter: function (value, context) {
                        return context.chart.data.labels[context.dataIndex];
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    document.getElementById('studyForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var subject = document.getElementById('subject').value.toUpperCase(); // Transforma para maiúsculas
        var hours = document.getElementById('hours').value.toUpperCase(); // Transforma para maiúsculas

        if (subject && hours) {
            studyChart.data.labels.push(subject);
            studyChart.data.datasets[0].data.push(hours);
            studyChart.update();
            document.getElementById('subject').value = '';
            document.getElementById('hours').value = '';
        }
    });

    document.getElementById('downloadChart').addEventListener('click', function () {
        // Obtém o canvas do gráfico
        var canvas = document.getElementById('studyChart');

        // Cria um link para download
        var downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL(); // Converte o canvas em uma URL de dados

        // Define o nome do arquivo a ser baixado
        downloadLink.download = 'estudo_diario.jpg';

        // Simula o clique no link para iniciar o download
        downloadLink.click();
    });
});
