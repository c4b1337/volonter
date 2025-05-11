import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Валідація email
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некоректний формат email.";
    }

    // Валідація пароля
    if (!formData.password.trim()) {
      newErrors.password = "Пароль є обов'язковим.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль має містити щонайменше 6 символів.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Пароль має містити хоча б одну велику літеру.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Пароль має містити хоча б одну цифру.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const user = await FirebaseService.loginUser(formData.email, formData.password);
      alert("Вхід успішний!");
      console.log("Logged in user:", user);
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Вхід не вдався. Перевірте email та пароль.");
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
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-lock"></i> Пароль
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          <i className="fas fa-sign-in-alt"></i> Увійти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;