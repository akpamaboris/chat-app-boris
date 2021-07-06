// import the CSS file
import "./App.css";

//import react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import useState
import { useState } from "react";
//import js-cookie to check if the user is authenticated
import Cookies from "js-cookie";

//IMPORT THE DIFFERENT COMPONENTS
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Chatroom from "./components/Chatroom";

function App() {
  const [userToken] = useState(Cookies.get("tokenChat"));

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
          <Route exact path="/:roomId" component={Chatroom} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
