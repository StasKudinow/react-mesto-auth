import React from 'react';

function Login() {

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form">
        <input className="login__input login__input_email" placeholder="Email" />
        <input className="login__input login__input_password" placeholder="Password" />
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;