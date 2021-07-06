import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

//import axios to make api request
import axios from "axios";

//import js-cookie for authentication
import Cookies from "js-cookie";

/* MATERIAL UI IMPORTS */

import { TextField } from "@material-ui/core";
//import MUI styles
import useStyles from "../style-materialui/style-mui";
/* MATERIAL UI IMPORTS */

/* IMPORT THE DIFFERENT COMPONENTS */
import Header from "./Header";

/* IMPORT THE DIFFERENT COMPONENTS */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const classes = useStyles();
  /* ERROR MESSAGES STATES */

  //ERROR MESSAGES IF THE USER HAS NOT FILLED ALL THE FORMS
  const [
    errorMessageSomeFormsAreNotFilled,
    setErrorMessageSomeFormsAreNotFilled,
  ] = useState(false);

  //ERROR MESSAGES IF THE PASSWORD IS WRONG
  const [errorMessagePasswordIsWrong, setErrorMessagePasswordIsWrong] =
    useState(false);

  /* ERROR MESSAGES STATES */

  /* SUCCESS MESSAGES STATES */
  const [successMessageLogin, setSuccessMessageLogin] = useState(false);

  /* SUCCESS MESSAGES STATES */

  /*UTILITY FUNCTIONS */

  //UTILITY FUNCTION TO CHECK IF ALL THE FORMS ARE FILLED

  const checkIfAllTheFormsAreFilled = () => {
    if (email.length > 0 && password.length > 0) {
      setErrorMessageSomeFormsAreNotFilled(false);
      return true;
    } else {
      setErrorMessageSomeFormsAreNotFilled(true);
      return false;
    }
  };

  let signUpMessages = () => {
    return (
      <>
        {successMessageLogin ? (
          <div>Congratulations 🥳🎉, you are now logged in</div>
        ) : null}

        {errorMessagePasswordIsWrong ? (
          <div style={{ color: "red" }}>The password is wrong</div>
        ) : null}

        {errorMessageSomeFormsAreNotFilled ? (
          <div style={{ color: "red" }}>
            Fill all the text fields before registering
          </div>
        ) : null}
      </>
    );
  };
  /*UTILITY FUNCTIONS */

  return (
    <div>
      <Header />

      <h1 style={{ textAlign: "center" }}>Login</h1>

      <div className="formCenter">
        <form
          className={classes.root}
          onSubmit={(event) => {
            event.preventDefault();
            const sendForm = async () => {
              setErrorMessageSomeFormsAreNotFilled(false);
              try {
                const response = await axios.post(
                  "http://localhost:3010/login",
                  {
                    email: email,
                    password: password,
                  }
                );

                console.log(response.data);
                if (response.data.token) {
                  setErrorMessagePasswordIsWrong(false);
                  setSuccessMessageLogin(true);
                  Cookies.set("tokenChat", response.data.token, { expires: 1 });
                  history.push("/");
                  window.location.reload(false);
                }
              } catch (error) {
                console.error(error.message);
                setSuccessMessageLogin(false);
                setErrorMessagePasswordIsWrong(true);
              }
            };
            if (checkIfAllTheFormsAreFilled() === true) {
              sendForm();
            }
          }}
        >
          <div>
            <TextField
              type="email"
              placeholder="email"
              variant="filled"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              type="password"
              placeholder="password"
              variant="filled"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField type="submit" variant="filled" />
          </div>
        </form>
        {signUpMessages()}
      </div>
    </div>
  );
};

export default Login;
