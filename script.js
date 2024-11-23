// Initialize chart with empty data
const ctx = document.getElementById('dimensionChart').getContext('2d');
let chartData = {
    labels: [], // Store photo names
    datasets: [
        {
            label: 'Height (cm)',
            data: [], // Heights will go here
            backgroundColor: '#4caf50',
            borderColor: '#388e3c',
            borderWidth: 1,
        },
        {
            label: 'Width (cm)',
            data: [], // Widths will go here
            backgroundColor: '#2196f3',
            borderColor: '#1976d2',
            borderWidth: 1,
        },
    ],
};

// Create the chart
let dimensionChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Photo Names',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dimensions (cm)',
                },
            },
        },
    },
});

// Handle form submission and update chart
document.getElementById('photoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the form values
    const photoName = document.getElementById('photoName').value;
    const height = parseFloat(document.getElementById('height').value);
    const width = parseFloat(document.getElementById('width').value);

    // Add new data to the chart
    chartData.labels.push(photoName);
    chartData.datasets[0].data.push(height); // Add height data
    chartData.datasets[1].data.push(width);  // Add width data

    // Update the chart with the new data
    dimensionChart.update();

    // Optionally, reset the form
    document.getElementById('photoForm').reset();
});
