import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.webp";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="links">
            <Link className="link" to="/?cat=science">
              SCIENCE
            </Link>
            <Link className="link" to="/?cat=cinema">
              CINEMA
            </Link>
            <Link className="link" to="/?cat=design">
              DESIGN
            </Link>
            <Link className="link" to="/?cat=food">
              FOOD
            </Link>
            <Link className="link" to="/?cat=technology">
              TECHNOLOGY
            </Link>
            {currentUser ? (
              <>
                <span>{currentUser.username}</span>
                <span onClick={logout}>LOGOUT</span>
              </>
            ) : (
              <Link className="link" to="/login">
                LOGIN
              </Link>
            )}
            <span>
              <Link className="write" to="/write">
                WRITE
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
