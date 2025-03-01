import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Validation Functions
  const validateFullName = (name) => name.length >= 3 ? "" : "Full name must be at least 3 characters.";
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email address.";
  const validatePhone = (phone) => /^\d{10}$/.test(phone) ? "" : "Enter a valid 10-digit phone number.";
  const validatePassword = (password) => 
    /^(?=.*[0-9])(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/.test(password) 
      ? "" 
      : "Password must be 8+ chars, contain a number & a special character.";
  const validateConfirmPassword = (confirmPassword) => 
    confirmPassword === formData.password ? "" : "Passwords do not match.";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    switch (name) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      try {
        const response = await axios.post("http://localhost:5000/SignUp", {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        alert(response.data.message);
        console.log("Signup successful:", response.data);

        // Reset form after successful signup
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Signup error:", error.response?.data || error);
        alert(error.response?.data?.message || "Signup failed! Check console for details.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <p className="error">{errors.fullName}</p>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <p className="error">{errors.email}</p>

        <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
        <p className="error">{errors.phone}</p>

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <p className="error">{errors.password}</p>

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <p className="error">{errors.confirmPassword}</p>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;