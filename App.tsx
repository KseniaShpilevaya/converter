import React, {useEffect, useState} from 'react';
import './App.css';
import MoneyRow from './MoneyRow';

const BASE_URL = 'https://www.cbr-xml-daily.ru/latest.js'

function App() {
    const [rates, setRates] = useState<string[]>([])
    const [exchange, setExchange] = useState<number[]>([])
    const [fromMoney, setFromMoney] = useState<string>()
    const [toMoney, setToMoney] = useState<string>()
    const [_number, setNumber] = useState(0)
    const [numberInFromMoney, setNumberInFromMoney] = useState(true)
    const [currencyRate, setCurrencyRate] = useState<number>()

    let toNumber = 0, fromNumber = 0
    if (numberInFromMoney) {
        fromNumber = _number
        if (typeof(currencyRate) !== 'undefined')
        {
          toNumber = _number * currencyRate
        }
    }
    else {
        toNumber = _number
        if (typeof(currencyRate) !== 'undefined')
        {
          fromNumber = _number / currencyRate
        }
    }

    useEffect(() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then((data) => {
            const firstMoney = Object.keys(data.rates)[0]
            setRates([data.base, ...Object.keys(data.rates)])
            setFromMoney(data.base)
            setToMoney(firstMoney)
            setCurrencyRate(data.rates[firstMoney])
            let arr: unknown[] = Object.values(data.rates)
            let arrNum: number[] = arr as number[]
            setExchange([1, ...arrNum])
        })
    }, [] )

    function handleFromNumberChange(e:any) {
        setNumber(e.target.value)
        setNumberInFromMoney(true)
    }

    function handleToNumberChange(e:any) {
        setNumber(e.target.value)
        setNumberInFromMoney(false)
    }

    function handleChangeFromMoney(e:any) {
        setFromMoney(e.target.value)
        const currToRUB = exchange[rates.indexOf(e.target.value)]
        console.log(rates.indexOf(e.target.value))
        let currFromRUB: number = 0;
        if (typeof(toMoney) !== 'undefined') {
          currFromRUB = exchange[rates.indexOf(toMoney)]
        }
        setCurrencyRate(currFromRUB / currToRUB)
        setNumberInFromMoney(true)
    }

    function handleChangeToMoney(e:any) {
        setToMoney(e.target.value)
        const currToRUB = exchange[rates.indexOf(e.target.value)]
        let currFromRUB: number = 0;
        if (typeof(fromMoney) !== 'undefined') {
          currFromRUB = exchange[rates.indexOf(fromMoney)]
        }
        setCurrencyRate(currToRUB / currFromRUB)
        setNumberInFromMoney(false)
    }

    return (
        <>
            <h1>Конвертер валют</h1>
            <MoneyRow
                rates={rates}
                selectedMoney={fromMoney}
                onChangeMoney={handleChangeFromMoney}
                number={fromNumber}
                onChangeNumber={handleFromNumberChange}
             />
            <div className='arrow'>►</div>
            <MoneyRow
                rates={rates}
                selectedMoney={toMoney}
                onChangeMoney={handleChangeToMoney}
                number={toNumber}
                onChangeNumber={handleToNumberChange}
             />
        </>
    );
}

export default App;