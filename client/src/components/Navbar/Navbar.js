import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navigation = ({ token, logout }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        {" "}
        <a href="/"> Project Manager</a>
      </h1>
      <ul className="navbar-menu">
        <li>
          <a className="wht-link" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="wht-link" href="/projectspage">
            Projects
          </a>
        </li>
        <li>
          <a className="wht-link" href="/filter">
            Search
          </a>
        </li>
        <li>
          <a className="wht-link" href="/addproject">
            Add a Project
          </a>
        </li>
        <li>
          <a className="wht-link" href="/about">
            About us
          </a>
        </li>
      </ul>
      <div className="navbar-login">
        {token ? (
          <a className="wht-link" href="/login" onClick={logout}>
            <i className="far fa-user"></i> Logout
          </a>
        ) : (
          <a className="wht-link" href="/login">
            <i className="far fa-user"></i> Login
          </a>
        )}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { logout })(Navigation);
