import React, { useState } from "react";
import RegistrationForm from "./auth/RegistrationForm";
import LoginForm from "./auth/LoginForm";
import MainScreen from "./MainScreen";
import AdsPage from "./AdsPage";
import FirebaseService from "../firebase/FirebaseService"; // Додайте свій сервіс

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const [activeTab, setActiveTab] = useState("main");
  const [ads, setAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(null);

  // Динамічно отримуємо тип користувача з БД після логіну
  const handleLoginSuccess = async (user, typeFromForm) => {
    setIsAuthenticated(true);
    let type = typeFromForm;
    if (!type) {
      type = await FirebaseService.getUserType(user.uid);
    }
    setUserType(type);
  };

  // Зберігаємо тип користувача у БД при реєстрації
  const handleRegistrationSuccess = async (user, type) => {
    setIsAuthenticated(true);
    setUserType(type);
    // Зберегти тип у БД (наприклад, Firebase)
    await FirebaseService.saveUserType(user.uid, type);
  };

  const handleAddAd = (ad) => {
    setAds((prev) => [
      { ...ad, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveForm("login");
    setActiveTab("main");
    setUserType(null);
  };

  const handleCreateAd = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (isAuthenticated) {
    return (
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <header className="py-3 mb-4 border-bottom" style={{ background: "#f8f9fa" }}>
          <div className="container d-flex flex-wrap justify-content-center align-items-center">
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
              <i className="fas fa-hands-helping fa-2x text-primary me-2"></i>
              <span className="fs-4 fw-bold">Добро</span>
            </a>
            <nav className="d-none d-md-flex align-items-center">
              <a href="#contacts" className="nav-link px-2 text-muted">Контакти</a>
              <a href="#faq" className="nav-link px-2 text-muted">FAQ</a>
              <button
                className={`btn btn-link nav-link px-2 ${activeTab === "ads" ? "fw-bold text-primary" : "text-muted"}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveTab("ads")}
              >
                Оголошення
              </button>
              <button
                className={`btn btn-link nav-link px-2 ${activeTab === "main" ? "fw-bold text-primary" : "text-muted"}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveTab("main")}
              >
                Головна
              </button>
            </nav>
            <div className="d-flex align-items-center ms-4">
              {/* Кнопка бачить лише волонтер/організація */}
              {activeTab === "main" && (userType === "volunteer" || userType === "organization") && (
                <button
                  className="btn btn-primary ms-2"
                  type="button"
                  onClick={handleCreateAd}
                  title="Створити оголошення"
                >
                  <i className="fas fa-plus me-1"></i> Оголошення
                </button>
              )}
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={handleLogout}
                title="Вийти з акаунта"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Контент вкладок */}
        {activeTab === "main" && (
          <MainScreen
            showModal={showModal}
            handleCreateAd={handleCreateAd}
            handleCloseModal={handleCloseModal}
            onAddAd={handleAddAd}
            userType={userType}
          />
        )}
        {activeTab === "ads" && <AdsPage ads={ads} />}
        <footer className="text-center text-muted py-3 mt-auto" style={{ background: "#f8f9fa" }}>
          &copy; {new Date().getFullYear()} Добро. Всі права захищені.
        </footer>
      </div>
    );
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