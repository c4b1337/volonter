import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <div className="text-center mt-4">
        <button
          className={`btn btn-${isLogin ? "outline-primary" : "primary"} me-2`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
        <button
          className={`btn btn-${isLogin ? "primary" : "outline-primary"}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
      </div>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};

export default App;