import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import socketIOClient from "socket.io-client";

//IMPORT THE COMPONENTS
import Header from "./Header";

const SOCKET_SERVER_URL = "https://chat-app-topitech.herokuapp.com/";

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
        }}
      >
        <input
          type="text"
          placeholder="Room"
          value={roomName}
          onChange={handleRoomNameChange}
        ></input>
        <Link to={`/${roomName}`}> Join room</Link>
        <div>
          {rooms.length > 0
            ? rooms.map((room, id) => {
                return (
                  <div key={room._id}>
                    <div
                      onClick={() => {
                        setRoomName(room.name);
                      }}
                    >
                      {room.name}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
