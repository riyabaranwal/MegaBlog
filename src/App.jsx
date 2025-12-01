import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-col  bg-[#030626] text-white">
      <Header />
      <main className="h-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
