import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import Cats from "./components/Cats";
import Favorites from "./components/Favorites";
import LoginComponent from "./components/Login";
import Logged from "./components/Logged";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
        <BrowserRouter>
          <NavBar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/logged" element={<Logged />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/favourites" element={<Favorites />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
