        anychart.onDocumentReady(function () {
            var chartData = []; // Array global para armazenar os dados
            var chart = anychart.pie(chartData);
            chart.innerRadius('40%'); // Ajusta para criar um gráfico de donut

            // Define a paleta de cores personalizada
            var palette = anychart.palettes.distinctColors();
            palette.items([
                { color: '#ff5d0d' },
                { color: '#ff3800' }
            ]);
            chart.palette(palette);

            // Função para formatar o texto das etiquetas
            function formatLabelText(value, name) {
                return value + 'H\n' + name;
            }

            // Configura o formato das etiquetas
            chart.labels().format(function() {
                var value = this.value; // Usa o valor real das horas
                var name = this.x;
                return formatLabelText(value, name);
            });
            chart.labels().fontSize(12);
            chart.labels().fontWeight('normal');
            chart.labels().textOverflow('wrap'); // Permite quebra de linha automática
            chart.tooltip().format('{%x}: {%y}H');
            chart.tooltip().fontWeight('bold');

            chart.container('container');
            chart.draw(); // Desenha o gráfico inicialmente

            document.getElementById('studyForm').addEventListener('submit', function (event) {
                event.preventDefault();

                var subject = document.getElementById('subject').value.trim().toUpperCase();
                var hours = parseInt(document.getElementById('hours').value, 10);

                if (subject && hours) {
                    try {
                        var found = false;

                        // Verifica se a matéria já está no gráfico
                        for (var i = 0; i < chartData.length; i++) {
                            if (chartData[i][0] === subject) {
                                chartData[i][1] += hours; // Adiciona as horas à entrada existente
                                found = true;
                                console.log(`Matéria encontrada: ${subject}. Valor atualizado.`);
                                break;
                            }
                        }

                        if (!found) {
                            chartData.push([subject, hours]); // Adiciona nova entrada com horas
                            console.log(`Matéria não encontrada: ${subject}. Nova entrada adicionada.`);
                        }

                        // Remove entradas com valor fixo de 100 horas
                        chartData = chartData.filter(function(entry) {
                            return entry[1] !== 100;
                        });

                        // Atualiza o gráfico com os dados acumulados
                        chart.data(chartData);

                        // Força a reinicialização do gráfico
                        chart.dispose();
                        chart = anychart.pie(chartData);
                        chart.innerRadius('40%');
                        chart.palette(palette);

                        // Reaplica o formato das etiquetas
                        chart.labels().format(function() {
                            var value = this.value; // Usa o valor real das horas
                            var name = this.x;
                            return formatLabelText(value, name);
                        });
                        chart.labels().fontSize(12);
                        chart.labels().fontWeight('normal');
                        chart.labels().textOverflow('wrap');
                        chart.tooltip().format('{%x}: {%y}H');
                        chart.tooltip().fontWeight('bold');

                        chart.container('container');
                        chart.draw();

                        // Log dos dados após a atualização
                        console.log("Dados do gráfico após atualização:", chartData);

                        // Limpa os campos do formulário
                        document.getElementById('subject').value = '';
                        document.getElementById('hours').value = '';
                    } catch (error) {
                        console.error("Erro ao atualizar os dados do gráfico:", error);
                    }
                } else {
                    console.error("Dados inválidos no formulário.");
                }
            });
        });
