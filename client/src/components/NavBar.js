import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link nav-link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link nav-link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link nav-link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link nav-link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link nav-link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link nav-link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {currentUser && (<span className="userName">{currentUser?.username}</span>)}
          {currentUser ? (
            <>
            <span className="logout-flex" onClick={logout}>Logout<CiLogout className="logout-icon" /></span>
            <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
            </>            
          ) : (
            <Link className="link login-flex" to="/login">
              Login <CiLogin className="login-icon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;