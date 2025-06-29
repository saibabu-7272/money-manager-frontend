import './index.css'

const TransactionItem = (props) => {
 
    const transaction = props.transaction
    const date = new Date(transaction.date)
    return(
        <li className='transaction-item'>
            <p>{transaction.title}</p>
            <p>{transaction.type}</p>
            <p>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</p>
            <p>{transaction.amount}</p>
        </li>
    )
}

export default TransactionItem