import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo" src={logo} alt="Логотип" />
      <div className="header__info">
        {/* <p className="header__email">dedbanzai91@mail.ru</p> */}
        <a className="header__link" href="#">Регистрация</a>
      </div>
    </header>
  );
}

export default Header;