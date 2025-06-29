import { useState } from 'react'
import { useNavigate , Navigate} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'


const LoginPage = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [userDetails, setUserDetails] = useState({email : '', password : ''})
  const [isLoading , setLoadingStatus] = useState(false)
  const [messages , setMessages] = useState({error : '', message : ''})

  const toggleCard = () => {
    setIsLogin(!isLogin)
  }

  const onSubmit = async (e) =>{
    try{
      setLoadingStatus(true)
      const apiExtention = e.target.value === "login" ? 'login' : 'register';
      const api = `${process.env.REACT_APP_API}/${apiExtention}`;
      const newUserData = {
        email : userDetails.email.toLocaleLowerCase(),
        password : userDetails.password
      }
      console.log(newUserData)
      const options = {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body : JSON.stringify(newUserData)
      }
      const response = await fetch(api, options);
      const data = await response.json()
      setLoadingStatus(false)
      if(response.ok){
        Cookies.set('jwt_token', data.jwtToken,{expires : 10})
        Cookies.set('user_id', data.userId , {expires : 10})
        setMessages(pre => ({error : '', message : data.message}))
        navigate("/",{ replace: true })
      }else{
        console.log(data.errorMsg)
        setMessages(pre => ({message : '', error : data.errorMsg}))
      }
    }catch(e){
      console.log({error : e.message})
    }  }

  const onUpdateEmail = (e) => setUserDetails(pre => ({...pre, email : e.target.value}))
  const onUpdatePassword = (e) => setUserDetails(pre => ({...pre, password : e.target.value}))
    const jwtToken = Cookies.get('jwt_token')
    if(!jwtToken){
        return (
            <div className="login-page">
              {isLoading ? <p className='loding-text'>Loading...</p> : 
                <div className="auth-card">
                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
                
                <div className="input-group">
                  <input onChange={onUpdateEmail} type="email" required />
                  <label>Gmail</label>
                </div>

                <div className="input-group">
                  <input onChange={onUpdatePassword} type="password" required />
                  <label>Password</label>
                </div>

                <button onClick={onSubmit} value={isLogin ? 'login' : 'create-account'} className="btn-submit">{isLogin ? 'Login' : 'Create Account'}</button>

                <p className="toggle-text">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <span onClick={toggleCard}>
                    {isLogin ? ' Create Account' : ' Login'}
                  </span>
                </p>
                {messages.error !== '' && <p className='error-text'>{messages.error}</p>}
                {messages.message !== '' && <p className='success-text'>{messages.message}</p>}
              </div>
              }
              
            </div>
        )  
    }

    return <Navigate to='/' />


  
}

export default LoginPage
