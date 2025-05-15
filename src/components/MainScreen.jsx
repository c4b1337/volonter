import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/main.css";

const MainScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [adData, setAdData] = useState({
    photo: null,
    purpose: "",
    monobank: "",
    socials: [""],
  });

  const handleLogout = () => {
    window.location.reload();
  };

  const handleCreateAd = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAdData({
      photo: null,
      purpose: "",
      monobank: "",
      socials: [""],
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setAdData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setAdData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSocialChange = (idx, value) => {
    const newSocials = [...adData.socials];
    newSocials[idx] = value;
    setAdData((prev) => ({ ...prev, socials: newSocials }));
  };

  const handleAddSocial = () => {
    setAdData((prev) => ({ ...prev, socials: [...prev.socials, ""] }));
  };

  const handleRemoveSocial = (idx) => {
    const newSocials = adData.socials.filter((_, i) => i !== idx);
    setAdData((prev) => ({ ...prev, socials: newSocials }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут ваша логіка відправки даних
    alert("Оголошення створено!");
    handleCloseModal();
  };

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
            <a href="#ads" className="nav-link px-2 text-muted">Оголошення</a>
            <span className="text-muted align-self-center ms-2">Головна</span>
          </nav>
          {/* Додаємо більший відступ між навігацією та кнопками */}
          <div className="d-flex align-items-center ms-4">
            <button
              className="btn btn-primary ms-2"
              type="button"
              onClick={handleCreateAd}
              title="Створити оголошення"
            >
              <i className="fas fa-plus me-1"></i> Оголошення
            </button>
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

      {/* Основний контент */}
      <main className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-5 text-center mb-3">Головна сторінка</h1>
        <p className="text-muted text-center mb-2">
          Вітаємо у вашому обліковому записі!<br />
          Тут ви зможете керувати своїми заявками, переглядати інформацію та багато іншого.
        </p>
      </main>

      {/* Модальне вікно для створення оголошення */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title"><i className="fas fa-plus me-2"></i>Створити оголошення</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* Фото */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-image me-1"></i> Фото
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="photo"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                    {adData.photo && (
                      <img
                        src={URL.createObjectURL(adData.photo)}
                        alt="preview"
                        className="img-thumbnail mt-2"
                        style={{ maxHeight: 120 }}
                      />
                    )}
                  </div>
                  {/* Мета */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-bullseye me-1"></i> Мета
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="purpose"
                      value={adData.purpose}
                      onChange={handleInputChange}
                      placeholder="Ваша мета"
                      required
                    />
                  </div>
                  {/* Monobank */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-university me-1"></i> Посилання на банку Monobank
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      name="monobank"
                      value={adData.monobank}
                      onChange={handleInputChange}
                      placeholder="https://send.monobank.ua/..."
                      required
                    />
                  </div>
                  {/* Соцмережі */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-share-alt me-1"></i> Соцмережі
                    </label>
                    {adData.socials.map((link, idx) => (
                      <div key={idx} className="input-group mb-2">
                        <input
                          type="url"
                          className="form-control"
                          placeholder="Посилання на соцмережу"
                          value={link}
                          onChange={e => handleSocialChange(idx, e.target.value)}
                          required={idx === 0}
                        />
                        {adData.socials.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleRemoveSocial(idx)}
                            title="Видалити"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={handleAddSocial}
                    >
                      <i className="fas fa-plus"></i> Додати соцмережу
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Скасувати
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane me-1"></i> Створити
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Футер */}
      <footer className="text-center text-muted py-3 mt-auto" style={{ background: "#f8f9fa" }}>
        &copy; {new Date().getFullYear()} Добро. Всі права захищені.
      </footer>
    </div>
  );
};

export default MainScreen;