// Create a bar chart displaying average monthly temperatures
function monthlyAvgTempChart(avgMonthlyTemps) {
    // Define an array of month labels for the chart
    const chartLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get the canvas context for the chart element with ID "monthly-avg-temperature-chart"
    const ctx = document.getElementById("monthly-avg-temperature-chart").getContext("2d");
    
    // Create a new Chart.js instance
    const chart = new Chart(ctx, {
        type: "bar", // Specify the chart type as "bar"
        data: {
            labels: chartLabels, // Assign the month labels to the chart
            datasets: [
                {
                    label: "Average Daily Temperature (°C)", // Label for the dataset
                    data: avgMonthlyTemps, // Use the average monthly temperatures as the data source
                    borderColor: "rgba(153, 102, 255, 1)", // Set the border color of the bars
                    backgroundColor: "rgba(153, 102, 255, 0.2)" // Set the background color of the bars
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Start the y-axis scale at zero
                }
            }
        }
    });
}
