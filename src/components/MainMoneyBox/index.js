import './index.css'
import { useState , useEffect} from 'react'
import Cookies from 'js-cookie'


const MainMoneyBox = () =>{
    const [isLoading, setLodingStatus] = useState(false)
    const [displayMoney, setMoney] = useState(0)

    const fetchData = async () => {
    try{
      setLodingStatus(true)
      const userId = Cookies.get('user_id')
      const jwtToken = Cookies.get('jwt_token')
      const apiExtention = 'getUserData'
      const api = `${process.env.REACT_APP_API}/${apiExtention}/${userId}`
      const options = {
        method : 'GET',
        headers : {
          'Accept' : 'application/json',
          authorization : `Bearer ${jwtToken}`,

        }
      }
      const response = await fetch(api , options);
      const data = await response.json();
      setLodingStatus(false)
      if(response.ok){
        setMoney(data.money)
      }
    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(() => {fetchData()} , [])

    return(
    <section className='main-money-box'>
        {isLoading ? <p>Loading...</p> : <h1>{displayMoney} ₹</h1>}
        
    </section>
)
}

export default MainMoneyBox