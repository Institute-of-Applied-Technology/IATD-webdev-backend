import { useState } from 'react'
import './css/LoginPage.css'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleButtonClick = (identifier) => {
    navigate(`/main?button=${identifier}`);
  };

  return (
    <div>
      <div className='app-header'> IATD Student Expense Tracker</div>
      <fieldset className="login-container card">
        <legend className="login-title">Login</legend>
        <div className='login-header'>Click on the User Name button to login as that user</div>
        <div className="app-buttons text-center">
          <button className="btn btn-primary app-button-hover-effect" onClick={() => handleButtonClick('Harry Scriptor')}>
            <span className="visually-hidden">Harry Scriptor</span>
          </button>
          <button className="btn btn-primary app-button-hover-effect" onClick={() => handleButtonClick('Java Scripton')}>
            <span className="visually-hidden">Java Scripton</span>
          </button>
        </div>
        <div className="app-buttons text-center">
          <button className="btn btn-primary app-button-hover-effect" onClick={() => handleButtonClick('CSSandra Styles')}>
            <span className="visually-hidden">CSSandra Styles</span>
          </button>
          <button className="btn btn-primary app-button-hover-effect" onClick={() => handleButtonClick('Reacto Nator')}>
            <span className="visually-hidden">Reacto Nator</span>
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default LoginPage;