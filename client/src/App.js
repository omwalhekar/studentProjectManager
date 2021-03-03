import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import ProjectForm from "./components/Projects/ProjectForm";
import FilteredProjects from "./components/Projects/FilteredProjects";
import About from "./components/About/about";
import Login from "./components/Login/Login";
import SubjectWise from "./components/Projects/SubjectWise";

// REDUXX
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/projectspage" component={Projects}></Route>
              <Route
                exact
                path="/subjects/:dept"
                component={SubjectWise}></Route>
              <Route exact path="/filter" component={FilteredProjects}></Route>
              <Route exact path="/addproject" component={ProjectForm}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/about" component={About}></Route>
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
