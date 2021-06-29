import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <form
        style={{
          margin: "0 auto",
          width: "30%",
          marginLeft: "540px",
          marginTop: "100px",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const sendForm = async () => {
            try {
              const response = await axios.post(
                "http://localhost:3010/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                }
              );

              console.log(response.data);
            } catch (error) {
              console.error(error.message);
            }
          };
          sendForm();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </div>
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
  );
};

export default Register;
