import React from 'react';
import { Link } from 'react-router-dom';

function Register() {

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input
          className="register__input register__input_email"
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="off"
        />
        <input
          className="register__input register__input_password"
          type="password"
          name="password"
          placeholder="Password"
          minLength="7"
          maxLength="30"
          required
          autoComplete="off"
        />
        <button className="register__button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__signin-link"> Войти</Link>
      </div>
    </div>
  );
}

export default Register;