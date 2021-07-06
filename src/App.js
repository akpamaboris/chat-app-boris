// import the CSS file
import "./App.css";

//import react router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
//import useState
import { useState } from "react";
//import js-cookie to check if the user is authenticated
import Cookies from "js-cookie";

//IMPORT THE DIFFERENT COMPONENTS
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("tokenChat"));

  const setUser = (token) => {
    if (token) {
      Cookies.set("tokenChat", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("tokenChat");
      setUserToken(null);
    }
  };

  /* utility function to check if the user is connected */

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {userToken ? <Home /> : <Register />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
