import { useState } from "react";
import Header from "./Header";
import useChat from "../customHooks/useChat";

//import js-cookie for authentication
import Cookies from "js-cookie";

const Chatroom = (props) => {
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [name] = useState(Cookies.get("name"));

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, name);
    setNewMessage("");
  };
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Room {roomId} </h1>
      <div
        style={{
          backgroundColor: "white",
          width: "70%",
          height: "500px",
          margin: "0 auto",
          marginBottom: "100px",
          overflow: "scroll",
        }}
      >
        <div className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.realName} {"          "}
                {message.body}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{ width: "70%", height: "500px", textAlign: "center" }}>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field"
        />
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chatroom;
