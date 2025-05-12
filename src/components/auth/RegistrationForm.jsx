import React, { useState } from "react";
import VolunteerRegistrationForm from "./VolunteerRegistrationForm";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import "../../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [formType, setFormType] = useState("volunteer"); // "volunteer" або "organization"

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
        <p className="text-muted">
          Оберіть, чи хочете зареєструватися як <strong>Волонтер</strong> або <strong>Організація</strong>.
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
          className={`btn btn-${formType === "organization" ? "primary" : "outline-primary"}`}
          onClick={() => setFormType("organization")}
        >
          Організація
        </button>
      </div>

      {/* Відображення форми залежно від типу */}
      <div className="form-container">
        {formType === "volunteer" && <VolunteerRegistrationForm />}
        {formType === "organization" && <OrganizationRegistrationForm />}
      </div>
    </div>
  );
};

export default RegistrationForm;