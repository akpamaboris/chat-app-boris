import { useState } from "react";
import axios from "axios";

/* IMPORT COMPONENTS */
import Header from "./Header";
/* IMPORT COMPONENTS */

/* MATERIAL UI IMPORTS */

import { TextField } from "@material-ui/core";
//import MUI styles
import useStyles from "../style-materialui/style-mui";
/* MATERIAL UI IMPORTS */

const Register = ({ checkIfUserIsConnected }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ERROR MESSAGES STATES */

  //ERROR MESSAGES IF THE EMAIL IS ALREADY TAKEN
  const [errorMessageEmailTaken, setErrorMessageEmailTaken] = useState(false);

  //ERROR MESSAGES IF THE USER HAS NOT FILLED ALL THE FORMS
  const [
    errorMessageSomeFormsAreNotFilled,
    setErrorMessageSomeFormsAreNotFilled,
  ] = useState(false);

  /* ERROR MESSAGES STATES */

  /* SUCCESS MESSAGES STATES */
  const [successMessageRegister, setSuccessMessageRegister] = useState(false);

  /* SUCCESS MESSAGES STATES */
  // THE HOOK FOR STYLES
  const classes = useStyles();

  /*UTILITY FUNCTIONS */
  //UTILITY FUNCTION TO CHECK IF ALL THE FORMS ARE FILLED

  const checkIfAllTheFormsAreFilled = () => {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setErrorMessageSomeFormsAreNotFilled(false);
      return true;
    } else {
      setErrorMessageSomeFormsAreNotFilled(true);
      return false;
    }
  };

  //UTILITY FUNCTION TO EMPTY TEXTFIELD
  const emptyTextField = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };

  let signUpMessages = () => {
    return (
      <>
        {successMessageRegister ? (
          <div>Congratulations 🥳🎉, you can now login </div>
        ) : null}
        {errorMessageEmailTaken ? (
          <div style={{ color: "red" }}>
            The email is already taken, try to login with another email
          </div>
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
      <Header checkIfUserIsConnected={checkIfUserIsConnected} />
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <div className="formCenter">
        <form
          className={classes.root}
          onSubmit={(event) => {
            event.preventDefault();
            const sendForm = async () => {
              setErrorMessageSomeFormsAreNotFilled(false);
              try {
                const response = await axios.post(
                  "https://chat-app-topitech.herokuapp.com/signup",
                  {
                    email: email,
                    username: username,
                    password: password,
                  }
                );

                if (response.data.token) {
                  setErrorMessageEmailTaken(false);
                  setSuccessMessageRegister(true);
                  emptyTextField();
                } else {
                  setSuccessMessageRegister(false);
                  setErrorMessageEmailTaken(true);
                  emptyTextField();
                }
              } catch (error) {
                console.error(error.message);
                setSuccessMessageRegister(false);
                setErrorMessageEmailTaken(true);
                emptyTextField();
              }
            };
            if (checkIfAllTheFormsAreFilled() === true) {
              sendForm();
            }
          }}
        >
          <div>
            <TextField
              placeholder="username"
              variant="filled"
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              type="text"
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              value={email}
              placeholder="email"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              value={password}
              placeholder="password"
              variant="filled"
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

export default Register;
