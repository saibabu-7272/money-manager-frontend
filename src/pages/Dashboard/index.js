import { useState } from 'react'
import './index.css'
import MainMoneyBox from '../../components/MainMoneyBox'
import FormCard from '../../components/Form'
import History from '../../components/History'

const Dashboard = () =>{
  const [showForm, formToggle] = useState({show : false , wichForm : ''})
  
  
  const toggleForms = (e) => {
    formToggle(pre => ({whichForm : e.target.value, show: !pre.show}))
  }

  const onCloseForm =() => formToggle({show : false, wichForm : ''})


  return(
  <div className='dashboard'>
    {showForm.show ? 
      <FormCard type={showForm.whichForm} onClose={onCloseForm} />
    :
    <>

      <h1>Dashboard</h1>
      <MainMoneyBox />
      <div>
        <button value="income" onClick={toggleForms} className='btn bg-green'>+ Income</button> 
        <button value="expense"  onClick={toggleForms} className='btn bg-red'>- Expense</button>
      </div>
      <h1>History</h1>
      <History />
      
    </>  
  }
    
    
  </div>
)
}

export default Dashboard