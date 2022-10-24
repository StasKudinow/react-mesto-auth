import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin }) {
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
    onLogin({ password, email })
      .then(resetForm)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.log(`Ошибка входа: ${err}`);
      })
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input login__input_email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          className="login__input login__input_password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          minLength="7"
          maxLength="30"
          required
        />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;