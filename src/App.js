/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, NavLink ,useNavigate } from "react-router-dom";
import { Profile, Home ,Saasusage } from "./pages";
import axios from "axios";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [user, setUser] = useLocalStorageState(null);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useLocalStorageState(false);
  
  useEffect(() => {
    // Check if the user is already authenticated
    axios.get('http://localhost:5000/auth/user',{
      withCredentials: true,
    })
      .then(response => {
        setUser(response.data.user);
        console.log('User:', response.data.user);
      })
      .catch(error => {
        console.error('Authentication error:', error);
      });

  }, []);

  const handleLogin = () => {
    setIsLogin(true);
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout');
      setUser(null);  
      setIsLogin(false);  
      navigate('/'); 
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="App">
     
        <header className="flex flex-row items-center gap-2 justify-between md:container md:mx-auto p-4 bg-blue-200">
          <div className="hover:text-orange-400">
            <h1 className="text-2xl font-bold p-2">Invoice App</h1>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <NavLink to="/profile" className="p-2 bg-slate-200 rounded-md shadow-md">
              Profile
            </NavLink>
            {(user && isLogin)? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={handleLogin}>Login with Google</button>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />  
          <Route path="/saasusage" element={<Saasusage />} />                          
        </Routes>
      
    </div>
  );
}

export default App;
