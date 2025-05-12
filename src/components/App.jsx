import React, { useState } from "react";
import RegistrationForm from "./auth/RegistrationForm";
import LoginForm from "./auth/LoginForm";
import MainScreen from "./MainScreen";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Стан для перевірки автентифікації
  const [activeForm, setActiveForm] = useState("login"); // "login" або "registration"

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Успішний вхід
  };

  const handleRegistrationSuccess = () => {
    setIsAuthenticated(true); // Успішна реєстрація
  };

  if (isAuthenticated) {
    // Якщо користувач автентифікований, показуємо головну сторінку
    return <MainScreen />;
  }

  return (
    <div className="container mt-5">
      {/* Заголовок */}
      <div className="text-center mb-4">
        <h1 className="display-5">
          <i className="fas fa-hands-helping text-primary"></i> Ласкаво просимо
        </h1>
        <p className="text-muted">
          Оберіть, чи хочете <strong>увійти</strong> або <strong>зареєструватися</strong>.
        </p>
      </div>

      {/* Кнопки перемикання між формами */}
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

      {/* Відображення форми */}
      <div className="card shadow-lg p-4">
        {activeForm === "login" ? (
          <LoginForm key="login" onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegistrationForm key="registration" onRegistrationSuccess={handleRegistrationSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;