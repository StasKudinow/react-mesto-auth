import React from 'react';

function Login() {

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input
          className="login__input login__input_email"
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="off"
        />
        <input
          className="login__input login__input_password"
          type="password"
          name="password"
          placeholder="Password"
          minLength="7"
          maxLength="30"
          required
          autoComplete="off"
        />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;