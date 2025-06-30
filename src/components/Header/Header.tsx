import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../../hook/useAuth";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import ModalWindow from "../ModalWindow/ModalWindow";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import BaseButton from "../BaseButton/BaseButton";
import s from "./Header.module.css";

const Header = () => {
  const [registerFormIsOpen, setRegisterFormIsOpen] = useState(false);
  const [loginFormIsOpen, setLoginFormIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  function closeRegisterForm() {
    setRegisterFormIsOpen(false);
  }

  function closeLoginForm() {
    setLoginFormIsOpen(false);
  }
  function closeLogout() {
    setIsLogout(false);
  }

  async function handleLogout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      closeLogout();
      toast.success("User signed out");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <header className={s.header}>
        <Container className={s.headerContainer}>
          <div className={s.logo}>
            <img src="ukraine.svg" alt="Logo" sizes="28" />
            <span>LearnLingo</span>
          </div>
          <div>
            <Navigation isLogin={!!user} />
          </div>
          {!user ? (
            <div className={s.buttonBox}>
              <button
                className={s.logInBtn}
                onClick={() => {
                  setLoginFormIsOpen(true);
                }}
                type="button"
              >
                <FiLogIn size={20} className={s.logoutIcon} />
                Log in
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegisterFormIsOpen(true);
                }}
                className={s.registerBtn}
              >
                Registration
              </button>
            </div>
          ) : (
            <div className={s.buttonBox}>
              <button
                className={s.logOutBtn}
                onClick={() => {
                  setIsLogout(true);
                }}
                type="button"
              >
                <LuLogOut size={20} className={s.logoutIcon} />
                Log out
              </button>
              {user ? (
                <p className={s.user}>Welcome, {user?.displayName}</p>
              ) : (
                <p className={s.user}>Your profile</p>
              )}
            </div>
          )}
        </Container>
      </header>
      <ModalWindow
        modalIsOpen={registerFormIsOpen}
        title="Registration"
        closeModal={closeRegisterForm}
        description="Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."
        className={s.registerForm}
      >
        <RegistrationForm onClose={closeRegisterForm} />
      </ModalWindow>
      <ModalWindow
        modalIsOpen={loginFormIsOpen}
        title="Log In"
        description="Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
        closeModal={closeLoginForm}
        className={s.loginForm}
      >
        <LoginForm onClose={closeLoginForm} />
      </ModalWindow>
      <ModalWindow
        modalIsOpen={isLogout}
        title="Log out"
        description="Do you really want to log out of your account?"
        closeModal={closeLogout}
        className={s.logOutForm}
      >
        <BaseButton
          className={s.cancelBtn}
          type="button"
          name="Cancel "
          onClick={closeLogout}
        />
        <BaseButton
          className={s.comfirmBtn}
          type="button"
          name="Sign out "
          onClick={handleLogout}
        />
      </ModalWindow>
    </>
  );
};

export default Header;
