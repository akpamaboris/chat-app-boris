import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <div>
        <form
          style={{
            margin: "0 auto",
            width: "30%",
            marginLeft: "340px",
            marginTop: "100px",
          }}
          onSubmit={(event) => {
            event.preventDefault();
            const sendForm = async () => {
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
                  Cookies.set("tokenMern", response.data.token, { expires: 1 });
                  history.push("/");
                  window.location.reload(false);
                }
              } catch (error) {
                console.error(error.message);
              }
            };
            sendForm();
          }}
        >
          <div>
            <input
              type="email"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
