import React from "react";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-secondary rounded">
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            className="App-logo d-inline-block align-top img-responsive"
            alt="logo"
          />
          <span className="text-white">Stack Inflow</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
