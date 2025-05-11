import React, { useState } from "react";
import RegistrationForm from "./auth/RegistrationForm";
import LoginForm from "./auth/LoginForm";

const App = () => {
  const [activeForm, setActiveForm] = useState("login"); // "login" або "registration"

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5">
          <i className="fas fa-hands-helping text-primary"></i> Ласкаво просимо
        </h1>
        <p className="text-muted">
          Оберіть, чи хочете <strong>увійти</strong> або <strong>зареєструватися</strong>.
        </p>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-${activeForm === "login" ? "primary" : "outline-primary"} me-2`}
          onClick={() => setActiveForm("login")}
        >
          Вхід
        </button>
        <button
          className={`btn btn-${activeForm === "registration" ? "primary" : "outline-primary"}`}
          onClick={() => setActiveForm("registration")}
        >
          Реєстрація
        </button>
      </div>
      {activeForm === "login" && <LoginForm />}
      {activeForm === "registration" && <RegistrationForm />}
    </div>
  );
};

export default App;