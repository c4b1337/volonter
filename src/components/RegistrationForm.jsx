import React, { useState } from "react";
import { registerUser } from "../firebase/authService";
import { saveUserData } from "../firebase/firestoreService";

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
      const user = await registerUser(formData.email, formData.password);
      const collectionName = formType === "volunteer" ? "volunteers" : "organizations";
      await saveUserData(collectionName, { ...formData, uid: user.uid });
      alert("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register as {formType === "volunteer" ? "Volunteer" : "Organization"}</h2>
      <div>
        <button onClick={() => setFormType("volunteer")}>Volunteer</button>
        <button onClick={() => setFormType("organization")}>Organization</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        {formType === "organization" && (
          <>
            <label>
              Founded Date:
              <input
                type="date"
                name="foundedDate"
                value={formData.foundedDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Audience:
              <input
                type="text"
                name="audience"
                value={formData.audience}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Purpose:
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Members (comma-separated):
              <input
                type="text"
                name="members"
                value={formData.members}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Social Links:
          {formData.socialLinks.map((link, index) => (
            <div key={index}>
              <input
                type="url"
                placeholder="Social Media Link"
                value={link}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addSocialLink}>
            Add Social Link
          </button>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;