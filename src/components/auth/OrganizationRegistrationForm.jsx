import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const OrganizationRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    foundedDate: "",
    audience: "",
    purpose: "",
    members: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    website: "",
    socialLinks: [""],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = value;
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const addSocialLink = () => {
    setFormData({ ...formData, socialLinks: [...formData.socialLinks, ""] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим.";
    }

    if (!formData.foundedDate.trim()) {
      newErrors.foundedDate = "Дата заснування є обов'язковою.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некоректний формат email.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Пароль є обов'язковим.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль має містити щонайменше 6 символів.";
    }

    if (!formData.audience.trim()) {
      newErrors.audience = "Аудиторія є обов'язковою.";
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Мета є обов'язковою.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Адреса є обов'язковою.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон є обов'язковим.";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Вебсайт є обов'язковим.";
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
      const user = await FirebaseService.registerUser(formData.email, formData.password);
      const dataToSave = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        uid: user.uid,
        socialLinks: formData.socialLinks.filter((link) => link.trim() !== ""),
        foundedDate: formData.foundedDate,
        audience: formData.audience,
        purpose: formData.purpose,
        members: formData.members,
        address: formData.address,
        phone: formData.phone,
        website: formData.website,
      };

      await FirebaseService.saveData("organizations", dataToSave);
      alert("Реєстрація організації успішна!");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        alert("Цей email вже зареєстрований. Будь ласка, використайте інший.");
      } else {
        console.error("Error during registration:", error.message);
        alert("Реєстрація не вдалася. Спробуйте ще раз.");
      }
    }
  };

  return (
    <form className="card p-4 shadow-lg border-0" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-signature"></i> Ім'я
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-calendar-alt"></i> Дата заснування
        </label>
        <input
          type="date"
          className={`form-control ${errors.foundedDate ? "is-invalid" : ""}`}
          name="foundedDate"
          value={formData.foundedDate}
          onChange={handleInputChange}
          required
        />
        {errors.foundedDate && <div className="invalid-feedback">{errors.foundedDate}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-users"></i> Аудиторія
        </label>
        <input
          type="text"
          className={`form-control ${errors.audience ? "is-invalid" : ""}`}
          name="audience"
          value={formData.audience}
          onChange={handleInputChange}
          required
        />
        {errors.audience && <div className="invalid-feedback">{errors.audience}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-bullseye"></i> Мета
        </label>
        <input
          type="text"
          className={`form-control ${errors.purpose ? "is-invalid" : ""}`}
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          required
        />
        {errors.purpose && <div className="invalid-feedback">{errors.purpose}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-user-friends"></i> Члени (через кому)
        </label>
        <input
          type="text"
          className="form-control"
          name="members"
          value={formData.members}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-map-marker-alt"></i> Адреса
        </label>
        <input
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-phone"></i> Телефон
        </label>
        <input
          type="text"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-globe"></i> Вебсайт
        </label>
        <input
          type="url"
          className={`form-control ${errors.website ? "is-invalid" : ""}`}
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          required
        />
        {errors.website && <div className="invalid-feedback">{errors.website}</div>}
      </div>
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
      <div className="mb-3">
        <label className="form-label">
          <i className="fas fa-share-alt"></i> Соцмережі
        </label>
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="url"
              className="form-control"
              placeholder="Посилання на соцмережу"
              value={link}
              onChange={(e) => handleSocialLinkChange(index, e.target.value)}
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

export default OrganizationRegistrationForm;