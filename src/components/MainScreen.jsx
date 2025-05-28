import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/main.css";

const MainScreen = ({ showModal, handleCreateAd, handleCloseModal, onAddAd, userType }) => {
  const [adData, setAdData] = useState({
    photo: null,
    purpose: "",
    monobank: "",
    socials: [""],
  });

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
    onAddAd(adData);
    setAdData({
      photo: null,
      purpose: "",
      monobank: "",
      socials: [""],
    });
    handleCloseModal();
  };

  return (
    <>
      <main className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-5 text-center mb-3">Головна сторінка</h1>
        <p className="text-muted text-center mb-2">
          Вітаємо у вашому обліковому записі!<br />
          Тут ви зможете керувати своїми заявками, переглядати інформацію та багато іншого.
        </p>
      </main>

      {(showModal && (userType === "volunteer" || userType === "organization")) && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title"><i className="fas fa-plus me-2"></i>Оголошення</h5>
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
    </>
  );
};

export default MainScreen;