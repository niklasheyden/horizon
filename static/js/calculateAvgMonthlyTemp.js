// Define the calculateAvgMonthlyTemp function which takes a single array as input: data
function calculateAvgMonthlyTemp(data) {
    // Calculate the number of years in the dataset
    let years = (2018 - 2010) + 1;

    // Initialize two arrays of length 12 filled with zeros: one for the sum of temperatures per month and one for the count of temperatures per month
    let monthSums = Array(12).fill(0);
    let monthCounts = Array(12).fill(0);

    // Iterate through the data array, summing up the temperatures for each month and counting the number of temperatures for each month
    data.forEach((temp, i) => {
        // Calculate the month index (0-11) based on the current index i
        let monthIndex = i % 12;

        // Add the current temperature to the sum of temperatures for the current month
        monthSums[monthIndex] += temp;

        // Increment the count of temperatures for the current month
        monthCounts[monthIndex]++;
    });

    // Calculate and return the average monthly temperature by dividing the sum of temperatures for each month by the count of temperatures for each month
    return monthSums.map((sum, index) => sum / monthCounts[index]);
}
