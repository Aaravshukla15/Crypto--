import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Logo from "./Crypto-logo (2).png";
import './App.css';

function App() {
    
    const [search, setSearch] = useState("");
    // search is for searching and setSearch is for updating it.
    //  use state takes initial element as an argument i.e a call back fucntions and array with depedencies
    // and returns an array with two elements. 
    const [crypto, setCrypto] = useState([]);

    // useEffect for fecthing data from an API using AXIOS.
    
    useEffect(() =>{
        Axios.get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=EUR`)
        .then((res) =>{
            setCrypto(res.data.coins)
        });
    }, []);


return (
    <div className="App">
    <header className="App-header">
        <img src={Logo} alt='h-logo' className='t-logo'/>
        <h1 className='title'> Crypto Trivia</h1>
        <h4 className='titled'>Crypto Currency Searching Web-App</h4>
        <h5 className='titlep'>To know more about any currency... Just click on its logo</h5>
        <input type='text' placeholder='type in lower case...' 
        // an onchange property takes an a callback function where e is eventhanlder 
            onChange={(e) => {
                setSearch(e.target.value)
            }}
        />
        {/* Here we go with crypto currency arranged table */}
        <table>
            <thead>
                <tr>
                    <td>Rank</td>
                    <td>Name</td>
                    <td>Symbol</td>
                    <td>Market Cap</td>
                    <td >Price</td>
                    <td>Available Supply </td>
                </tr>
            </thead>
            {/* Here we go with table body - and also filter to check for an chosen crypto */}
            <tbody>
                {crypto
                    .filter((val) =>{
                        return val.name.toLowerCase()
                        .includes(search)})
                        .map((val, id) =>{
                            return(
                                <>
                                    <tr id="id">
                                        <td className='rank'>{val.rank}</td>
                                        <td className='logo'>
                                        <a href={val.websiteUrl}>
                                            <img src={val.icon} alt='logo' width="30px"/>
                                        </a>
                                        <p>{val.name}</p>
                                        </td>
                                        <td className='symbol'>{val.symbol}</td>
                                        <td >${Math.round(val.marketCap)}</td>
                                        <td className='pri'>${Math.round(val.price)}</td>
                                        <td>{val.availableSupply}</td>
                                    </tr>
                                </>
                            )})
                }
            </tbody>
        </table>

      </header>
    </div>
  );
}

export default App;
