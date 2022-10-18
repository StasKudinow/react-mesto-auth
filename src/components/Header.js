import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo" src={logo} alt="Логотип" />
    </header>
  );
}

export default Header;