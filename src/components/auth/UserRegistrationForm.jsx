import React, { useState } from "react";

const UserRegistrationForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим.";
    if (!formData.phone.trim()) newErrors.phone = "Номер телефону є обов'язковим.";
    else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = "Введіть коректний номер телефону.";
    if (!formData.email.trim()) newErrors.email = "Email є обов'язковим.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Некоректний формат email.";
    if (!formData.password.trim()) newErrors.password = "Пароль є обов'язковим.";
    else if (formData.password.length < 6) newErrors.password = "Пароль має містити щонайменше 6 символів.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (onRegistrationSuccess) onRegistrationSuccess(formData, "user");
    alert("Реєстрація користувача успішна!");
    setFormData({ name: "", phone: "", email: "", password: "" });
  };

  const renderInput = (type, name, label, icon) => (
    <div className="mb-3">
      <label className="form-label">
        <i className={`fas ${icon}`}></i> {label}
      </label>
      <input
        type={type}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <form className="card p-4 shadow-lg border-0" onSubmit={handleSubmit}>
      <h3 className="mb-3 text-center">Реєстрація користувача</h3>
      {renderInput("text", "name", "Ім'я", "fa-signature")}
      {renderInput("tel", "phone", "Номер телефону", "fa-phone")}
      {renderInput("email", "email", "Email", "fa-envelope")}
      {renderInput("password", "password", "Пароль", "fa-lock")}
      <button type="submit" className="btn btn-primary w-100">
        <i className="fas fa-paper-plane"></i> Зареєструватися
      </button>
    </form>
  );
};

export default UserRegistrationForm;