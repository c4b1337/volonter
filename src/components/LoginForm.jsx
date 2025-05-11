import React, { useState } from "react";
import FirebaseService from "../firebase/FirebaseService";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await FirebaseService.loginUser(formData.email, formData.password);
      alert("Login successful!");
      console.log("Logged in user:", user);
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5">
          <i className="fas fa-sign-in-alt text-primary"></i> Login
        </h1>
        <p className="text-muted">Enter your credentials to access your account.</p>
      </div>
      <form className="card p-4 shadow-lg border-0" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-lock"></i> Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;