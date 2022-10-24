import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register({ onRegister }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const resetForm = useCallback(() => {
    setPassword('');
    setEmail('');
  }, []);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ password, email })
      .then(resetForm)
      .then(() => {
        history.push('/signin');
        console.log('вылезает попап ОК')
      })
      .catch(() => {
        console.log('вылезает попап НЕ ОК');
      })
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input register__input_email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          autoComplete="off"
        />
        <input
          className="register__input register__input_password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
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
        <Link to="signin" className="register__signin-link"> Войти</Link>
      </div>
    </div>
  );
}

export default Register;