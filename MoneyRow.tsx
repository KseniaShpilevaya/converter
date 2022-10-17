function MoneyRow(props: any) {
    var rates = props.rates, selectedMoney = props.selectedMoney, onChangeMoney = props.onChangeMoney, number = props.number, onChangeNumber = props.onChangeNumber;
    return (
        <div>
            <input type="number" className='input' value={number} onChange={onChangeNumber} />
            <select value={selectedMoney} onChange={onChangeMoney}>
                {
                    rates.map((rate: any) => (
                        <option key={rate} value={rate}>{rate}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default MoneyRow