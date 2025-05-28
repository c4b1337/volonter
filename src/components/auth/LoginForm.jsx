import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const LoginForm = ({ onLoginSuccess }) => {
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

    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некоректний формат email.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Пароль є обов'язковим.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль має містити щонайменше 8 символів.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const user = await FirebaseService.loginUser(formData.email, formData.password);
      // Отримуємо тип з БД
      const type = await FirebaseService.getUserType(user.uid);
      onLoginSuccess(user, type);
    } catch (error) {
      alert("Вхід не вдався. Перевірте email та пароль.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label>Пароль</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;