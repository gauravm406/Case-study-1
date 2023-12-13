import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to /register if userInfo is null */}
        <Route
          path="/"
          element={userInfo ? <Home /> : <Navigate to="/register" replace />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
