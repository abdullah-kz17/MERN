import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const defaultForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Include formData in the body
      });

      if (res.ok) {
        const data = await res.json(); // Await the response
        console.log("User Data", data);
        // Handle successful login (e.g., redirect or show success message)
        setFormData(defaultForm);
      } else {
        const errorData = await res.json(); // Get error details
        setError(errorData.message || "Registration failed"); // Set error message
      }
    } catch (error) {
      alert(error.message);
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading is stopped in both success and error cases
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          {error && <div style={{ color: "red" }}>{error}</div>}{" "}
          {/* Display error message */}
          <div className="content">
            <h1 className="text">Login Form</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email:</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password:</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <div className="sign-up">
              Don't have an account? <a href="#">Sign Up</a>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
