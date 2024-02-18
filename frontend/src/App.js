import ForgotPassword from "./components/Forgotpassword/ForgotPassword";
import UpdatePassword from "./components/Forgotpassword/ForgotPassword";
import Login from "./components/RegisterAndLoginPage/Login";
import Register from "./components/RegisterAndLoginPage/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Home from "./components/Home/Home";
import { useSelector } from "react-redux"; 
 
function App() {
 
  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <Router>    
    <Routes>
      
      <Route path="/" element={ isAuthenticated ?<Home /> :<Login />} />
       
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <>
              <Navigate to="/" />
              <Home />
            </>
          ) : (
            <Register />
          )
        }
      />
       <Route path="/forgot/password" element={<ForgotPassword />}   />
       <Route path="/password/reset/:token" element={ <ResetPassword />} />
       <Route path="/update/password" element={ <UpdatePassword /> }  />

</Routes>

  </Router>
  );
}

export default App;
