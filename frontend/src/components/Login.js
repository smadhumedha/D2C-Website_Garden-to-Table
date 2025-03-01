import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      setMessage(response.data.message); // Success message

      localStorage.setItem("email", formData.email);
      // Redirect to Products (Home) page after successful login
      setTimeout(() => {
        navigate("/"); // Redirects to the default Products page
      }, 1000); // Delay for better user experience

    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Try again!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-btn" type="submit">Login</button>
        <p className="message">{message}</p>
      </form>
    </div>
  );
};


export default Login;