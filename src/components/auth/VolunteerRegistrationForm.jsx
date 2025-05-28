import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const VolunteerRegistrationForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    edrpou: "",
    email: "",
    password: "",
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
    if (!formData.edrpou.trim()) newErrors.edrpou = "ЄДРПОУ є обов'язковим.";
    else if (!/^\d{8,10}$/.test(formData.edrpou)) newErrors.edrpou = "Некоректний формат ЄДРПОУ (8-10 цифр).";
    if (!formData.email.trim()) newErrors.email = "Email є обов'язковим.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Некоректний формат email.";
    if (!formData.password.trim()) newErrors.password = "Пароль є обов'язковим.";
    else if (formData.password.length < 6) newErrors.password = "Пароль має містити щонайменше 6 символів.";
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
        edrpou: formData.edrpou,
        email: formData.email,
        uid: user.uid,
        socialLinks: formData.socialLinks.filter((link) => link.trim() !== ""),
      };
      await FirebaseService.saveData("volunteers", dataToSave);
      alert("Реєстрація волонтера успішна!");
      onRegistrationSuccess(user, "volunteer");
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
      <h3 className="mb-3 text-center">Реєстрація волонтера</h3>
      {renderInput("text", "name", "Ім'я", "fa-signature")}
      {renderInput("text", "edrpou", "ЄДРПОУ", "fa-id-card")}
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
              className="form-control"
              placeholder="Посилання на соцмережу"
              value={link}
              onChange={e => handleSocialLinkChange(idx, e.target.value)}
            />
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

export default VolunteerRegistrationForm;