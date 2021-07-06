import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const Header = ({ checkIfUserIsConnected }) => {
  const [userToken] = useState(Cookies.get("tokenChat"));
  let history = useHistory();
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        height: "130px",
        marginBottom: "50px",
      }}
    >
      <div
        style={{
          paddingTop: "20px",
          width: "80%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button className="btn" id="specialbtn">
          CHAT APPLICATION
        </button>

        {userToken ? (
          <button className="btn btn-1" onClick={() => history.push("/")}>
            HOME
          </button>
        ) : null}

        {userToken ? null : (
          <button className="btn btn-1" onClick={() => history.push("/login")}>
            LOGIN
          </button>
        )}

        {userToken ? null : (
          <button
            className="btn btn-1"
            onClick={() => history.push("/register")}
          >
            REGISTER
          </button>
        )}

        {userToken ? (
          <button
            className="btn btn-1"
            id="specialLogout"
            onClick={() => {
              Cookies.remove("tokenChat");
              Cookies.remove("name");
              history.push("/login");
            }}
          >
            LOGOUT
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
