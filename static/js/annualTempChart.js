// Define the annualTempChart function which takes three arrays as input: annualMeanTempsData, annualMaxTempsData and annualMinTempsData
function annualTempChart(annualMeanTempsData, annualMaxTempsData, annualMinTempsData) {
    // Generate an array of labels for the x-axis corresponding to the years 2010 to the last year of data
    const chart_labels = annualMeanTempsData.map((_, idx) => 2010 + idx);

    // Get the canvas element with the ID "annual-mean-temperature-chart" and its 2D rendering context
    const ctx = document.getElementById("annual-mean-temperature-chart").getContext("2d");

    // Create a new Chart.js instance passing in the canvas context and a configuration object
    const chart = new Chart(ctx, {
        // Set the chart type to "line"
        type: "line",

        // Define the chart data and its properties
        data: {
            // Set the x-axis labels
            labels: chart_labels,

            // Define the datasets to be displayed on the chart
            datasets: [
                {
                    // Mean Temperature dataset
                    label: "Mean Temperature (°C)",
                    data: annualMeanTempsData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: false
                },
                {
                    // Max Temperature dataset
                    label: "Max Temperature (°C)",
                    data: annualMaxTempsData,
                    borderColor: "rgba(255, 159, 64, 1)",
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                    fill: false
                },
                {
                    // Min Temperature dataset
                    label: "Min Temperature (°C)",
                    data: annualMinTempsData,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: false
                }
            ]
        },

        // Define the chart options
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

