import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const OrganizationRegistrationForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    audience: "",
    edrpou: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    socialLinks: [""],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (idx, value) => {
    const links = [...formData.socialLinks];
    links[idx] = value;
    setFormData((prev) => ({ ...prev, socialLinks: links }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, ""] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим.";
    else if (formData.name.length < 3) newErrors.name = "Ім'я має містити щонайменше 3 символи.";
    if (!formData.audience.trim()) newErrors.audience = "Аудиторія є обов'язковою.";
    else if (formData.audience.length < 5) newErrors.audience = "Аудиторія має містити щонайменше 5 символів.";
    if (!formData.edrpou.trim()) newErrors.edrpou = "ЄДРПОУ є обов'язковим.";
    else if (!/^\d{8}$/.test(formData.edrpou)) newErrors.edrpou = "ЄДРПОУ має містити рівно 8 цифр.";
    if (!formData.address.trim()) newErrors.address = "Адреса є обов'язковою.";
    else if (formData.address.length < 10) newErrors.address = "Адреса має містити щонайменше 10 символів.";
    if (!formData.phone.trim()) newErrors.phone = "Телефон є обов'язковим.";
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) newErrors.phone = "Телефон має бути у форматі +380XXXXXXXXX або містити від 10 до 15 цифр.";
    if (!formData.email.trim()) newErrors.email = "Email є обов'язковим.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Некоректний формат email.";
    if (!formData.password.trim()) newErrors.password = "Пароль є обов'язковим.";
    else if (formData.password.length < 6) newErrors.password = "Пароль має містити щонайменше 6 символів.";
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Пароль має містити хоча б одну велику літеру.";
    else if (!/[0-9]/.test(formData.password)) newErrors.password = "Пароль має містити хоча б одну цифру.";
    formData.socialLinks.forEach((link, idx) => {
      if (link.trim() && !/^https?:\/\/\S+\.\S+$/.test(link)) {
        newErrors[`socialLinks_${idx}`] = "Некоректне посилання на соцмережу.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const user = await FirebaseService.registerUser(formData.email, formData.password);
      const dataToSave = {
        name: formData.name,
        audience: formData.audience,
        edrpou: formData.edrpou,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        uid: user.uid,
        socialLinks: formData.socialLinks.filter((link) => link.trim() !== ""),
      };
      await FirebaseService.saveData("organizations", dataToSave);
      alert("Реєстрація організації успішна!");
      onRegistrationSuccess(user, "organization");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        alert("Цей email вже зареєстрований. Будь ласка, використайте інший.");
      } else {
        alert("Реєстрація не вдалася. Спробуйте ще раз.");
      }
    }
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
      <h3 className="mb-3 text-center">Реєстрація організації</h3>
      {renderInput("text", "name", "Ім'я", "fa-signature")}
      {renderInput("text", "audience", "Аудиторія", "fa-users")}
      {renderInput("text", "edrpou", "ЄДРПОУ", "fa-id-card")}
      {renderInput("text", "address", "Адреса", "fa-map-marker-alt")}
      {renderInput("text", "phone", "Телефон", "fa-phone")}
      {renderInput("email", "email", "Email", "fa-envelope")}
      {renderInput("password", "password", "Пароль", "fa-lock")}
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-share-alt"></i> Соцмережі
        </label>
        {formData.socialLinks.map((link, idx) => (
          <div key={idx} className="input-group mb-2">
            <input
              type="url"
              className={`form-control ${errors[`socialLinks_${idx}`] ? "is-invalid" : ""}`}
              placeholder="Посилання на соцмережу"
              value={link}
              onChange={(e) => handleSocialLinkChange(idx, e.target.value)}
            />
            {errors[`socialLinks_${idx}`] && (
              <div className="invalid-feedback">{errors[`socialLinks_${idx}`]}</div>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-secondary" onClick={addSocialLink}>
          <i className="fas fa-plus"></i> Додати соцмережу
        </button>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <i className="fas fa-paper-plane"></i> Зареєструватися
      </button>
    </form>
  );
};

export default OrganizationRegistrationForm;