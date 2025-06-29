import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie'

const FormCard = ({ type, onClose }) => {
  const [transactionDetails , setTransaction] = useState({ title : '', amount : 0 })
  const [isLoading, setLodingStatus] = useState(false)


  const sendData = async () => {
          try{
            setLodingStatus(true)
            const userId = Cookies.get('user_id')
            const jwtToken = Cookies.get('jwt_token')
            const api = `${process.env.REACT_APP_API}/add-transaction`
            const newTransaction = {
                  userId : userId,
                  type : type,
                  amount : transactionDetails.amount,
                  title : transactionDetails.title
              }
            const options = {
              method : 'POST',
              headers : {
                  'Content-Type' : 'application/json' ,
                  'Accept' : 'application/json',
                  authorization : `Bearer ${jwtToken}`,
              },
              body : JSON.stringify(newTransaction)
            }
            const response = await fetch(api , options);
            setLodingStatus(false)

            if(response.ok){
              onClose()
            }
          }catch(e){
            console.log(e.message)
          }
        }
  
  return (
    <div className="form-card-overlay">
      {isLoading ? 
      <p>Loading...</p> 
      : 
      <div className="form-card">
        <h2>{type === 'income' ? 'Add Income' : 'Add Expense'}</h2>
        <input onChange={(e) => setTransaction(pre => ({...pre, title : e.target.value}))} type="text" placeholder="Title" />
        <input onChange={(e) => setTransaction(pre => ({...pre, amount : parseInt(e.target.value)}))} type="number" placeholder="Amount" />
        <div className="form-actions">
          <button onClick={sendData} className="btn-submit">{type === 'income' ? 'Add Income' : 'Add Expense'}</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div> }
      
    </div>
  )
}

export default FormCard
