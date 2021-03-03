import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../Alert/Alert";

const Login = ({ login, isAuthenticated, alert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {!isAuthenticated ? (
        <div className="login">
          <h2 className="form-heading">Admin Login</h2>
          <form className="login-form" onSubmit={onSubmit}>
            <label for="project-title">Email</label>
            <input
              type="text"
              id="project-title"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
              required
            />

            <label for="project-domain">Password</label>
            <input
              type="password"
              id="project-domain"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
              required
            />
            {alert[0] ? (
              <Alert msg={alert[0].msg}></Alert>
            ) : (
              <Fragment></Fragment>
            )}

            <button type="submit" name="" className="btn btn-submit">
              Login
            </button>
          </form>
        </div>
      ) : (
        <Fragment>
          <button type="submit" name="" className="btn btn-submit">
            Logout
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.alert,
});

export default connect(mapStateToProps, { login })(Login);
