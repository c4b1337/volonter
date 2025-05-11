import React, { useState } from "react";
import FirebaseService from "../../firebase/FirebaseService";

const VolunteerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      };

      await FirebaseService.saveData("volunteers", dataToSave);
      alert("Реєстрація волонтера успішна!");
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

export default VolunteerRegistrationForm;