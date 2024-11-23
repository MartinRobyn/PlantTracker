// Serve the HTML page
app.get('/', (req, res) => {
    const uploads = getUploadsData();

    // Collect the data for the chart
    const labels = uploads.map(upload => upload.name || 'Unnamed Photo');
    const heights = uploads.map(upload => upload.height);
    const widths = uploads.map(upload => upload.width);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/public/styles.css">
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <title>Photo Gallery</title>
        </head>
        <body>
            <!-- Form Card for uploading photo -->
            <div class="form-card">
                <h1>Upload a Photo</h1>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <label for="photoName">Photo Name:</label>
                    <input type="text" id="photoName" name="photoName" required>
                    <label for="height">Height (cm):</label>
                    <input type="number" id="height" name="height" required>
                    <label for="width">Width (cm):</label>
                    <input type="number" id="width" name="width" required>
                    <input type="file" name="photo" accept="image/*" required>
                    <button type="submit">Upload</button>
                </form>
            </div>

            <!-- Bar Chart -->
            <h2>Width and Height Bar Chart</h2>
            <canvas id="dimensionsChart" width="400" height="200"></canvas>

            <script>
                const ctx = document.getElementById('dimensionsChart').getContext('2d');
                const dimensionsChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ${JSON.stringify(labels)},
                        datasets: [{
                            label: 'Height (cm)',
                            data: ${JSON.stringify(heights)},
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Width (cm)',
                            data: ${JSON.stringify(widths)},
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            </script>

            <h2>Previous Uploads</h2>
            <div class="image-grid">
                ${uploads.map(upload => `
                    <div class="image-card">
                        <img src="/uploads/${upload.filename}" alt="${upload.name}" />
                        <p>
                            Name: ${upload.name} <br>
                            Height: ${upload.height} cm, Width: ${upload.width} cm <br>
                            Date: ${upload.date}
                        </p>
                        <form action="/delete" method="POST" style="display:inline;">
                            <input type="hidden" name="filename" value="${upload.filename}">
                            <button type="submit">Delete</button>
                        </form>
                    </div>
                `).join('')}
            </div>
        </body>
        </html>
    `);
});
