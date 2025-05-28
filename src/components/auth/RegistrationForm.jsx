import React, { useState } from "react";
import VolunteerRegistrationForm from "./VolunteerRegistrationForm";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import UserRegistrationForm from "./UserRegistrationForm";
import "../../styles/RegistrationForm.css";

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [formType, setFormType] = useState("volunteer"); // "volunteer", "organization", "user"

  return (
    <div className="container mt-5 registration-container">
      <div className="text-center mb-4">
        {/* Заголовок залежно від типу форми */}
        {formType === "volunteer" && (
          <h1 className="display-5">
            <i className="fas fa-user text-primary"></i> Реєстрація Волонтера
          </h1>
        )}
        {formType === "organization" && (
          <h1 className="display-5">
            <i className="fas fa-building text-primary"></i> Реєстрація Організації
          </h1>
        )}
        {formType === "user" && (
          <h1 className="display-5">
            <i className="fas fa-user-circle text-primary"></i> Реєстрація Користувача
          </h1>
        )}
        <p className="text-muted">
          Оберіть, чи хочете зареєструватися як <strong>Волонтер</strong>, <strong>Організація</strong> або <strong>Користувач</strong>.
        </p>
      </div>

      {/* Кнопки перемикання між формами */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-${formType === "volunteer" ? "primary" : "outline-primary"} me-2`}
          onClick={() => setFormType("volunteer")}
        >
          Волонтер
        </button>
        <button
          className={`btn btn-${formType === "organization" ? "primary" : "outline-primary"} me-2`}
          onClick={() => setFormType("organization")}
        >
          Організація
        </button>
        <button
          className={`btn btn-${formType === "user" ? "primary" : "outline-primary"}`}
          onClick={() => setFormType("user")}
        >
          Користувач
        </button>
      </div>

      {/* Відображення форми залежно від типу */}
      <div className="form-container">
        {formType === "volunteer" && <VolunteerRegistrationForm onRegistrationSuccess={onRegistrationSuccess} />}
        {formType === "organization" && <OrganizationRegistrationForm onRegistrationSuccess={onRegistrationSuccess} />}
        {formType === "user" && <UserRegistrationForm onRegistrationSuccess={onRegistrationSuccess} />}
      </div>
    </div>
  );
};

export default RegistrationForm;