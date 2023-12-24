// App.js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch the exchange rates from the API
    const fetchExchangeRates = async () => {
      try {
        const apiKey = '176e9b38164e4048b2cad3ba0c995cb5'; // Replace with your API key
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`);
        const data = await response.json();

        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    // Update the converted amount when exchange rate or amount changes
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [exchangeRate, amount]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <h2>Converted Amount:</h2>
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default App;
