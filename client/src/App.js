import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  function exit() {
    setShowChat(false);
  }
  return (
    <div className="App">
      <div className="circles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="center">
        <div class="mobile">
          {!showChat ? (
            <div className="joinChatContainer">
              <h3>Let's get Chatting</h3>
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                autoFocus
                required
              />
              <input
                type="text"
                placeholder="Room ID"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                required
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          ) : (
            <div>
              <Chat socket={socket} username={username} room={room} />
              <button onClick={exit} className="exit-btn">
                <KeyboardReturnIcon
                  sx={{
                    color: "white",
                  }}
                />
              </button>
            </div>
          )}

          <div class="screen-active"></div>
          <div class="inner"></div>
          <ul class="volume">
            <li></li>
            <li></li>
          </ul>
          <ul class="silent">
            <li></li>
          </ul>
          <ul class="sleep">
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
