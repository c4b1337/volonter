import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import VolunteerRegistrationForm from "./VolunteerRegistrationForm";
import OrganizationRegistrationForm from "./OrganizationRegistrationForm";
import "../../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [formType, setFormType] = useState("volunteer"); // "volunteer" або "organization"

  return (
    <div className="container mt-5 registration-container">
      <div className="text-center mb-4">
        <CSSTransition
          in={formType === "volunteer"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <h1 className="display-5">
            <i className="fas fa-user text-primary"></i> Реєстрація Волонтера
          </h1>
        </CSSTransition>
        <CSSTransition
          in={formType === "organization"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <h1 className="display-5">
            <i className="fas fa-building text-primary"></i> Реєстрація Організації
          </h1>
        </CSSTransition>
        <p className="text-muted">
          Оберіть, чи хочете зареєструватися як <strong>Волонтер</strong> або <strong>Організація</strong>.
        </p>
      </div>
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
      <div className="form-container">
        <CSSTransition
          in={formType === "volunteer"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <VolunteerRegistrationForm />
        </CSSTransition>
        <CSSTransition
          in={formType === "organization"}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <OrganizationRegistrationForm />
        </CSSTransition>
      </div>
    </div>
  );
};

export default RegistrationForm;