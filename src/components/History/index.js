import './index.css'
import { useState , useEffect} from 'react'
import Cookies from 'js-cookie'
import TransactionItem from '../TransactionItem'

const History = () =>{
    const [isLoading, setLodingStatus] = useState(false)
    const [transactions , setTransactions] = useState([])

        const fetchData = async () => {
        try{
          setLodingStatus(true)
          const userId = Cookies.get('user_id')
          const jwtToken = Cookies.get('jwt_token')
          const api = `${process.env.REACT_APP_API}`
          const options = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json' ,
                'Accept' : 'application/json',
                authorization : `Bearer ${jwtToken}`,
            },
            body : JSON.stringify({userId})
          }
          const response = await fetch(api , options);
          const data = await response.json();
          setLodingStatus(false)
          if(response.ok){
            setTransactions(data)
          }
        }catch(e){
          console.log(e.message)
        }
      }
    
      useEffect(() =>  {fetchData()} , [])
    return(
    <>
    {isLoading ? 
    <p>Loading...</p> 
    :
    <div className='history-section'>
        {transactions.length > 0 ?
        <ul className='transactions-container'>
            {transactions.map(each => <TransactionItem transaction={each} />)}
        </ul>
        : 
        <p>No transactions to show!</p>}
    </div>}
    </>
      )
}

export default History