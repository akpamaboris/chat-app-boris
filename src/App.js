import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//IMPORT THE DIFFERENT COMPONENTS
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
