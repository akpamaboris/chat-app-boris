import { Link } from "react-router-dom";
import { useState } from "react";

//IMPORT THE COMPONENTS
import Header from "./Header";

const Home = () => {
  const [roomName, setRoomName] = useState("");

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
      </div>
    </div>
  );
};

export default Home;
