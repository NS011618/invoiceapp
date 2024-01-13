import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Login, Profile } from "./pages";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [isLogin, setIsLogin] = useLocalStorageState(false);

  useEffect(() => {
    // Check the login status when the component mounts
    const checkLoginStatus = () => {
      const storedLoginStatus = localStorage.getItem("isLogin");
      setIsLogin(storedLoginStatus === "true");
    };

    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    // Handle login and update isLoggedIn state
    localStorage.setItem("isLogin", "true");
    setIsLogin(true);
  };

  const handleLogout = () => {
    // Handle logout and update isLoggedIn state
    localStorage.setItem("isLoggedIn", "false");
    setIsLogin(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header className="flex flex-row items-center gap-2 justify-between md:container md:mx-auto p-4 bg-blue-200">
          <div className="hover:text-orange-400">
            <h1 className="text-2xl font-bold p-2">Invoice App</h1>
          </div>
          <div className="flex flex-row justify-between gap-2">
            {isLogin ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 bg-slate-200 rounded-md shadow-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-inter font-medium bg-white p-3 shadow-md  text-black px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/" className="p-2 bg-slate-200 rounded-md shadow-md">
                Login
              </Link>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile"
            element={isLogin ? <Profile /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
