import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import socketIOClient from "socket.io-client";

//IMPORT THE COMPONENTS
import Header from "./Header";

import { TextField } from "@material-ui/core";

//import MUI styles

const SOCKET_SERVER_URL = "https://chat-app-topitech.herokuapp.com";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit("wantroom");
    socketRef.current.on("wantroom", (data) => {
      console.log("on room connect");
      if (data.length > 0) {
        setRooms(data);
        console.log(data);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: "white",
          width: "70%",
          height: "500px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          overflow: "scroll",
        }}
      >
        {/* first div*/}
        <div
          style={{
            paddingTop: "40px",
          }}
        >
          <TextField
            type="text"
            placeholder="Room"
            value={roomName}
            variant="filled"
            onChange={handleRoomNameChange}
          ></TextField>
          <Link to={`/${roomName}`}>
            <button
              className="btn btn-1"
              style={{ height: "60px", marginTop: "-1px" }}
            >
              Join a room{" "}
            </button>
          </Link>
        </div>
        {/* first div*/}
        {/* second div*/}
        <div
          style={{
            paddingTop: "20px",
            cursor: "pointer",
            color: "black",
            fontWeight: "bold",
          }}
        >
          <button className="btn" id="specialbtn">
            ROOMS CREATED :
          </button>
          <div>
            {rooms.length > 0 ? (
              rooms.map((room, id) => {
                return (
                  <div key={room._id}>
                    <div>
                      <button
                        onClick={() => {
                          setRoomName(room.name);
                        }}
                        className="btnChat"
                        id="specialbtn2"
                      >
                        - {room.name}
                      </button>
                      <button
                        onClick={() => {
                          socketRef.current.emit("deleteRoom", {
                            roomName: room.name,
                          });
                          window.location.reload();
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>no rooms yet</span>
            )}
          </div>
        </div>
        {/* second div*/}
      </div>
    </div>
  );
};

export default Home;
