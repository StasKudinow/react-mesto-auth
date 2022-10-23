import logo from '../images/logo.svg';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header__logo" src={logo} alt="Логотип" />
      <Switch>
        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>
        <Route path="/">
          <div className="header__info">
            <p className="header__email">dedbanzai91@mail.ru</p>
            <Link to="/signin" className="header__link">Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;