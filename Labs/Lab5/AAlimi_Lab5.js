function populateForm() {
    let fromCurrency = document.getElementById('fromCurrencyId');
    let toCurrency = document.getElementById('toCurrencyId');

    fetch("https://api.frankfurter.dev/v1/currencies")
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        

        for (const [code, name] of Object.entries(res)){
            const fromCur = document.createElement('option');
            const toCur = document.createElement('option');

            fromCur.value = code;
            fromCur.textContent = `${name}`;

            toCur.value = code;
            toCur.textContent = `${name}`;

            fromCurrency.appendChild(fromCur);
            toCurrency.appendChild(toCur);
        }
    });
}

function iterateJson() {
    let fromCurrency = document.getElementById('fromCurrencyId').value;
    let toCurrency = document.getElementById('toCurrencyId').value;
    let numberConvert = document.getElementById('numberConvertId').value;
    let result = document.getElementById('result');

    if(fromCurrency === toCurrency){
        alert("You cannot convert to and form the same currency!");
        return;
    }

    fetch(`https://api.frankfurter.dev/v1/latest?amount=${numberConvert}&from=${fromCurrency}&to=${toCurrency}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let convertedValue = data.rates[toCurrency];
        result.textContent = `${numberConvert} ${fromCurrency} is equal to ${convertedValue} ${toCurrency}`;
    });
}

window.onload = populateForm;