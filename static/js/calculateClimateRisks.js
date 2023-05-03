// Initiate processing of climate data
function processClimateData(maxTemperature, precipitation, solarRadiation, windSpeed, recommendationsData) {
    const climateRisks = calculateClimateRisks(maxTemperature, precipitation, solarRadiation, windSpeed);
    displayClimateRisks(climateRisks, recommendationsData);
    displayRecommendations(climateRisks, recommendationsData);
}

// Calculate climate risk scores
function calculateClimateRisks(maxTemperature, precipitation, solarRadiation, windSpeed) {

    // Drought risk
    const droughtRisk = (precipitation < 50 && maxTemperature > 35) ? 'High' :
                        (precipitation < 100 && maxTemperature > 30) ? 'Medium' : 'Low';

    // Heat wave risk
    const heatWaveRisk = (maxTemperature > 35) ? 'High' :
                        (maxTemperature > 30) ? 'Medium' : 'Low';

    // Flood risk
    const floodRisk = (precipitation > 200) ? 'High' :
                        (precipitation > 100) ? 'Medium' : 'Low';

    // Heavy rainfall risk
    const heavyRainfallRisk = (precipitation > 150) ? 'High' :
                                (precipitation > 75) ? 'Medium' : 'Low';

    // Wildfire risk
    const wildfireRisk = (maxTemperature > 35 && solarRadiation > 150) ? 'High' :
                        (maxTemperature > 30 && solarRadiation > 200) ? 'Medium' : 'Low';

    // Storm risk
    const stormRisk = (windSpeed > 15) ? 'High' :
                        (windSpeed > 10) ? 'Medium' : 'Low';

    return {
        "Drought": droughtRisk,
        "Heat Wave": heatWaveRisk,
        "Flood": floodRisk,
        "Heavy Rainfall": heavyRainfallRisk,
        "Wildfire": wildfireRisk,
        "Storm": stormRisk
    };
}

// Display climate risks on the project page
function displayClimateRisks(climateRisks, recommendationsData) {
    const climateRisksContainer = document.getElementById("climate-risks");

    // Create a canvas element for the radar chart
    const canvas = document.createElement("canvas");
    climateRisksContainer.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Convert risk levels to numerical values for the chart
    function riskValue(risk) {
        if (risk === "Low") {
            return 1;
        } else if (risk === "Medium") {
            return 2;
        } else {
            return 3;
        }
    }

    // Prepare data for the radar chart
    const labels = [];
    const data = [];

    for (const [category, risk] of Object.entries(climateRisks)) {
        labels.push(category);
        data.push(riskValue(risk));
    }

    // Create the radar chart
    new Chart(ctx, {
        type: "radar",
        data: {
        labels: labels,
        datasets: [
            {
            label: "Climate Risk Levels",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            },
        ],
        },
        options: {
        scales: {
            r: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
                max: 3,
                callback: function (value) {
                if (value === 0) {
                    return "Low";
                } else if (value === 1) {
                    return "Low";
                } else if (value === 2) {
                    return "Medium";
                } else if (value === 3) {
                    return "High";
                }
                },
            },
            },
        },
        },
    });
}


// Display policy recommendations based on the provided climate risks and recommendations data.
function displayRecommendations(climateRisks, recommendationsData) {
    // Define the order in which risks should be displayed (High to Medium)
    const riskOrder = ['High', 'Medium'];

    // Loop through each risk level in the specified order
    for (const risk of riskOrder) {
        // Loop through each climate risk category and its associated risk level
        for (const [category, currentRisk] of Object.entries(climateRisks)) {
            // If the current risk level matches the risk being processed, proceed
            if (currentRisk === risk) {
                // Find the corresponding recommendations for the current category and risk level
                const recs = recommendationsData
                    .find(rec => rec.category === category && rec.risk_level === risk)
                    .recommendations;

                // If no recommendations are found, continue to the next iteration
                if (!recs) continue;

                // Create an unordered list element to display the recommendations
                const recList = document.createElement("ul");
                recList.className = "list-disc list-inside mb-4 pl-4";

                // Loop through the recommendations and create a list item for each one
                recs.forEach(rec => {
                    const listItem = document.createElement("li");
                    listItem.textContent = rec;
                    listItem.className = "text-sm";
                    recList.appendChild(listItem);
                });

                // Get the container element to display the risk recommendations
                const riskRecsContainer = document.getElementById("risk-recommendations");

                // Create a title for the current risk level and category
                const riskRecsTitle = document.createElement("h3");
                riskRecsTitle.textContent = `${risk} Risk – ${category}: `;
                riskRecsTitle.className = "text-sm font-semibold mb-2 mt-6";

                // Create a wrapper div to apply the border
                const recWrapper = document.createElement("div");
                recWrapper.className = risk === "High"
                    ? "border-l-4 border-red-600 pl-2"
                    : "border-l-4 border-yellow-600 pl-2";

                // Add the title and list of recommendations to the wrapper element
                recWrapper.appendChild(riskRecsTitle);
                recWrapper.appendChild(recList);

                // Append the wrapper element to the risk recommendations container
                riskRecsContainer.appendChild(recWrapper);
            }
        }
    }
}

