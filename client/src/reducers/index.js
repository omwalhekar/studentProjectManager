import { combineReducers } from "redux";
import project from "./project";
import dept from "./dept";
import subject from "./subject";
import auth from "./auth";
import alert from "./alert";

export default combineReducers({
  project,
  dept,
  subject,
  auth,
  alert,
});
