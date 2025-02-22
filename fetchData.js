const fs = require("fs");

fetch("https://v6.exchangerate-api.com/v6/580e2decb3db56b53f3091e9/latest/USD")
  .then(response => response.json())
  .then(data => {
    fs.writeFileSync("exchangeRates.json", JSON.stringify(data, null, 2)); // Save to file
    console.log("Data saved successfully!");
  })
  .catch(error => console.error("Error fetching data:", error));
