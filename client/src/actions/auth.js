import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "./types";
import { setAlert } from "../actions/alert";

//Admin login
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) dispatch(setAlert(errors[0].msg, "danger"));
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
