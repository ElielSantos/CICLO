        const canvas = document.getElementById('container');
        const ctx = canvas.getContext('2d');
        const data = [];

        const wrapText = (text, x, y, maxWidth, lineHeight) => {
            const words = text.split(' ');
            let line = '';
            let lineCount = 0;

            words.forEach(word => {
                const testLine = line + word + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && line !== '') {
                    ctx.fillText(line, x, y);
                    line = word + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            });

            ctx.fillText(line, x, y);
        };

        const renderChart = () => {
            const segments = data.length;
            const anglePerSegment = 2 * Math.PI / segments;
            let startAngle = -0.5 * Math.PI;
            const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
            const innerRadius = radius * 0.4;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            data.forEach((item, index) => {
                const endAngle = startAngle + anglePerSegment;

                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
                ctx.arc(canvas.width / 2, canvas.height / 2, innerRadius, endAngle, startAngle, true);
                ctx.closePath();
                ctx.fillStyle = ['#ff5d0d', '#ff3800'][index % 2];
                ctx.fill();

                ctx.strokeStyle = 'transparent';
                ctx.lineWidth = 4;
                ctx.stroke();

                const midAngle = startAngle + anglePerSegment / 2;
                const textX = canvas.width / 2 + Math.cos(midAngle) * (radius - (radius - innerRadius) / 2);
                const textY = canvas.height / 2 + Math.sin(midAngle) * (radius - (radius - innerRadius) / 2);

                ctx.fillStyle = '#333';
                ctx.font = 'bold 18px Roboto';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                wrapText(item.hours + 'H', textX, textY - 10, radius / 2 - 10, 16);
                wrapText(item.subject, textX, textY + 15, radius / 2 - 10, 16);

                startAngle = endAngle;
            });
        };

        document.getElementById('studyForm').addEventListener('submit', (event) => {
            event.preventDefault();

            const subjectInput = document.getElementById('subject');
            const hoursInput = document.getElementById('hours');
            const subject = subjectInput.value.trim().toUpperCase();
            const hours = parseInt(hoursInput.value, 10);

            data.push({ subject, hours });

            renderChart();

            subjectInput.value = '';
            hoursInput.value = '';
        });

        document.getElementById('downloadButton').addEventListener('click', () => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'grafico-estudos.png';
            link.click();
        });

        canvas.width = 500;
        canvas.height = 500;
    </script>
