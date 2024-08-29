import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/layouts/Header";
import Footer from "./assets/components/layouts/Footer";
import Home from "./assets/pages/Home";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import ForgotPassword from "./assets/pages/ForgotPassword";
import ResetPassword from "./assets/pages/ResetPassword";
import "./assets/styles/styles.scss";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
