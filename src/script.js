import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import img1 from './Image/currency-conversion.png';
import data from '../exchangeRates.json';

function App() {
    const [data, setData] = useState({ conversion_rates: {} });
    const [from, setFromC] = useState("");
    const [to, setToC] = useState("");
    const [amount, setAmount] = useState("");
    const [ans, setAns] = useState(0);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/580e2decb3db56b53f3091e9/latest/USD`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);

    const currencyUnitKey = Object.keys(data.conversion_rates);

    function Convert() { 
        if (from && to && amount) {
            const fromRate = data.conversion_rates[from];
            const toRate = data.conversion_rates[to];
            const result = (amount / fromRate) * toRate; // Correct conversion formula
            console.log(result);
            setAns(result);
        }
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <img src={img1} alt="currency-img" />
                    <h1>Currency Converter</h1>
                </div>
                <div className="input-section">
                    <div className="input-box">
                        <label>Amount</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="Enter Amount"
                        />
                    </div>
                    <div className="input-box">
                        <label>From Currency</label>
                        <select onChange={(e) => setFromC(e.target.value)}>
                            {currencyUnitKey.map((currencyUnit1) => (
                                <option key={currencyUnit1} value={currencyUnit1}>
                                    {currencyUnit1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-box">
                        <label>To Currency</label>
                        <select onChange={(e) => setToC(e.target.value)}>
                            {currencyUnitKey.map((currencyUnit2) => (
                                <option key={currencyUnit2} value={currencyUnit2}>
                                    {currencyUnit2}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={Convert}>Convert</button>
                <div>
                    <h2>Converted Amount: {ans.toFixed(2)}</h2>
                </div>
            </div>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
