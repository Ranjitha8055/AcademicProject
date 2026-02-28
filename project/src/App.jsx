import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login'
import Signup from '../Login/Signup'
import Frontpage from '../Home/Frontpage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TableOrder from '../TableOrder/TableOrdering.jsx'
import PaymentPage from '../Payment/PaymentDetails.jsx'
import UserDash from '../UserDash/UserDash.jsx'
import Admin from '../AbminDash/Admin.jsx'
import Homepage1 from '../Home/HomePage1.jsx'
import Navbar from './components/Navbar';
import { useLocation } from 'react-router-dom';
import Menu1 from '../Menu/Menu1.jsx'
import CartPage from '../Menu/Cartpage.jsx'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './context/ProtectedRoute'


function App() {
  const [count, setCount] = useState(0)

  // wrapper so we can call useLocation inside Router
  function NavbarWrapper() {
    const location = useLocation();
    // hide navbar only on base landing page
    return location.pathname !== "/" ? <Navbar /> : null;
  }

  return (
    <>
      <AuthProvider>
        <Router>
          <NavbarWrapper />
          <Routes>
            <Route path='/' element={<Frontpage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Homepage1' element={<Homepage1 />} />
            <Route path='/Menu1' element={<ProtectedRoute><Menu1 /></ProtectedRoute>} />
            <Route path="/Cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path='/TableOrder' element={<ProtectedRoute><TableOrder /></ProtectedRoute>} />
            <Route path='/PaymentDetails' element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path='/UserDash' element={<ProtectedRoute><UserDash /></ProtectedRoute>} />
            <Route path='/Admin' element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
