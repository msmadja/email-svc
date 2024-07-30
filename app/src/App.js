import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SendEmail from './Email/SendEmail';
import Login from './Auth/Login';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to="/email" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email" element={<ProtectedRoute element={<SendEmail />} />} />
      </Routes>
    </BrowserRouter>
   </>
   ) 
}

export default App;
