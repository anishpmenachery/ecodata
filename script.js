document.getElementById('gdpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const countryCode = document.getElementById('countryCode').value.toUpperCase();
    const year = document.getElementById('year').value;
    const resultDiv = document.getElementById('result');

    fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?date=${year}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data[1]) {
                const gdp = data[1][0].value;
                const gdpBn = gdp / 1_000_000_000;
                resultDiv.textContent = `The GDP of ${countryCode} in ${year} was $${gdp.toLocaleString()}`;
            } else {
                resultDiv.textContent = `No GDP data available for ${countryCode} in ${year}`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.textContent = 'Error fetching data.';
        });
});
