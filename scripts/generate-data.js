const fs = require('fs');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHeartRateData(numRows) {
  const data = [];
  const minHeartRate = 60; // Minimum heart rate
  const maxHeartRate = 100; // Maximum heart rate

  // Generate data for each row
  for (let i = 1; i <= numRows; i++) {
    const heartRate = getRandomInt(minHeartRate-30, maxHeartRate+30);
    const row = {
      id: i,
      heart_rate: heartRate,
      min: minHeartRate,
      max: maxHeartRate
    };
    data.push(row);
  }

  return data;
}

// Function to write data to a CSV file
function writeDataToCSV(data, filename) {
  const csvHeader = Object.keys(data[0]).join(',') + '\n';
  const csvRows = data.map(row => Object.values(row).join(',')).join('\n');
  const csvData = csvHeader + csvRows;

  fs.writeFile(filename, csvData, err => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log(`CSV file "${filename}" has been successfully generated!`);
    }
  });
}

const numRows = 20;
const heartRateData = generateHeartRateData(numRows);

const filename = 'heart_rate_data.csv';
writeDataToCSV(heartRateData, filename);

