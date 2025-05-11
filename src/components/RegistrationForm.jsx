import React, { useState } from "react";
import FirebaseService from "../firebase/FirebaseService";

const RegistrationForm = () => {
  const [formType, setFormType] = useState("volunteer");
  const [formData, setFormData] = useState({
    name: "",
    foundedDate: "",
    audience: "",
    purpose: "",
    members: "",
    email: "",
    password: "",
    socialLinks: [""],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await FirebaseService.registerUser(formData.email, formData.password);
      const collectionName = formType === "volunteer" ? "volunteers" : "organizations";
      await FirebaseService.saveData(collectionName, { ...formData, uid: user.uid });
      alert("Registration successful!");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        alert("This email is already registered. Please use a different email.");
      } else {
        console.error("Error during registration:", error.message);
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5">
          <i className="fas fa-hands-helping text-primary"></i> Join Us
        </h1>
        <p className="text-muted">
          Register as a <strong>{formType === "volunteer" ? "Volunteer" : "Organization"}</strong> and make a difference!
        </p>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-${formType === "volunteer" ? "primary" : "outline-primary"} me-2`}
          onClick={() => setFormType("volunteer")}
        >
          Volunteer
        </button>
        <button
          className={`btn btn-${formType === "organization" ? "primary" : "outline-primary"}`}
          onClick={() => setFormType("organization")}
        >
          Organization
        </button>
      </div>
      <form className="card p-4 shadow-lg border-0" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-signature"></i> Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        {formType === "organization" && (
          <>
            <div className="mb-3">
              <label className="form-label">
                <i className="fas fa-calendar-alt"></i> Founded Date
              </label>
              <input
                type="date"
                className="form-control"
                name="foundedDate"
                value={formData.foundedDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="fas fa-users"></i> Audience
              </label>
              <input
                type="text"
                className="form-control"
                name="audience"
                value={formData.audience}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="fas fa-bullseye"></i> Purpose
              </label>
              <input
                type="text"
                className="form-control"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <i className="fas fa-user-friends"></i> Members (comma-separated)
              </label>
              <input
                type="text"
                className="form-control"
                name="members"
                value={formData.members}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
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
        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-share-alt"></i> Social Links
          </label>
          {formData.socialLinks.map((link, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="url"
                className="form-control"
                placeholder="Social Media Link"
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="btn btn-outline-secondary" onClick={addSocialLink}>
            <i className="fas fa-plus"></i> Add Social Link
          </button>
        </div>
        <button type="submit" className="btn btn-success w-100">
          <i className="fas fa-paper-plane"></i> Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;