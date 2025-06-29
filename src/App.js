import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
const App = () =>(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
)

export default App