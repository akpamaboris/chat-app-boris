import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import useChat from "../customHooks/useChat";
import socketIOClient from "socket.io-client";

//IMPORT HISTORY FROM REACT-ROUTER DOM
import { useHistory, Redirect } from "react-router-dom";

//import js-cookie for authentication
import Cookies from "js-cookie";

const SOCKET_SERVER_URL = "http://localhost:3010";

const Chatroom = (props) => {
  let history = useHistory(); // rappel
  const messageRef = useRef();
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [oldMessages, setOldMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [name] = useState(Cookies.get("name"));

  const socketRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    socketRef.current.emit("history", {
      query: { roomId },
    });
    socketRef.current.on("history", (data) => {
      console.log("on room connect");
      if (data.length > 0) {
        setOldMessages(data);
        console.log(data);
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, name);
    setNewMessage("");
  };

  return name ? (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Room {roomId} </h1>
      <div
        style={{
          backgroundColor: "white",
          width: "70%",
          height: "400px",
          margin: "0 auto",
          marginBottom: "20px",
          overflow: "scroll",
        }}
      >
        <div className="messages-container">
          <ol className="messages-list" ref={messageRef}>
            {oldMessages.length > 0
              ? oldMessages.map((message, i) => {
                  return (
                    <li
                      key={i}
                      className={`message-item ${
                        message.ownedByCurrentUser
                          ? "my-message"
                          : "received-message"
                      }`}
                    >
                      <div>
                        {"<  "} {message.realName} {"  >"}
                      </div>
                      <div>{message.text}</div>
                    </li>
                  );
                })
              : null}
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                <div>
                  {"<  "} {message.realName} {"  >"}
                </div>
                <div>{message.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{ width: "90%", height: "500px" }}>
        <div
          style={{
            display: "flex",
            width: "57%",
            margin: "0 auto",
          }}
        >
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
            style={{ height: "90px", width: "200px" }}
          />
          <button
            style={{ marginBottom: "90px", height: "90px" }}
            onClick={handleSendMessage}
            className="send-message-button"
          >
            Send
          </button>

          <button
            style={{
              marginBottom: "90px",
              marginLeft: "300px",
              height: "90px",
            }}
            onClick={() => history.push("/")}
            className="quit-chat-button"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/register" />
  );
};
export default Chatroom;
