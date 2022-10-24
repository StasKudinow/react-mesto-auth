import '../App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from "../utils/api";
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from './AddCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    setisImagePopupOpen(true);
  };

  function handleConfirmDeleteClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsConfirmDeletePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  };

  // API
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleAddCardSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  function onRegister({ password, email }) {
    return auth.register(password, email)
      .then((res) => {
        return res;
      })
  };

  function onLogin({ password, email }) {
    return auth.authorize(password, email)
      .then((data) => {
        if(data.jwt) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.jwt);
        }
      })
  };

  function checkToken(jwt) {
    return auth.getToken(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
        }
      })
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      checkToken(jwt);
    }
  }, []);

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, []);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Switch>

          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardDelete={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />

          {/* <Route exact path="/">
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardDelete={handleConfirmDeleteClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
            />
          </Route> */}

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="signin" />}
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={ isEditProfilePopupOpen && 'popup_opened' }
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddCardPopup
          isOpen={ isAddCardPopupOpen && 'popup_opened' }
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
        />

        <EditAvatarPopup
          isOpen={ isEditAvatarPopupOpen && 'popup_opened' }
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          isOpen={ isImagePopupOpen && 'popup_opened' }
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <ConfirmDeletePopup
          isOpen={ isConfirmDeletePopupOpen && 'popup_opened' }
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={selectedCard}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;