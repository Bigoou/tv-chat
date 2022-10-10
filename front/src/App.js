import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import User from "./User";
import MessagesThread from "./MessagesThread";
import MessageInput from "./MessageInput";
import "./assets/VCR.woff";
import tv from "./assets/EcranTv.png";


function App() {

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hidden, setHidden] = useState('user-list');
  const [stroke, setStroke] = useState('message');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("setUsername", username);
    setUsername("");
    setIsConnected(true);
  };

  const btnClickUser = () => {
    hidden === 'user-list' ? setHidden('user-list hidden') : setHidden('user-list');
    console.log(hidden)
  }

  useEffect(() => {
    // setTimeout(() => {
      hidden === 'user-list' ? setStroke("message") : setStroke("message stroke");      
    // }, 1700);
    console.log(stroke)
  }, [hidden])

  const btnClickLogin = () => {
    setIsConnected(false);
  }

  
  useEffect(() => {

    const newSocket = io("https://whispering-chamber-09886.herokuapp.com/");
    // const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if(socket) {
      socket.on("message", message => setMessages(
        prevMessages => 
        [...prevMessages, message],

        ));

    
      socket.on("messages", setMessages);
      socket.emit("getMessages");
  
      socket.emit("getUsers");
      const getUsers = (users) => {
          setUsers(users);
      }
  
      const newUser = (user) => {
          setUsers(prevUsers => {
              return [...prevUsers, user]
          })
      }
  
      const updateUsername = (user) => {
          setUsers(prevUsers => 
            [...prevUsers.filter(u => u.id !== user.id), user])
      }
  
      socket.on("users", getUsers);
      socket.on("userConnection", newUser);
      socket.on("updateUsername", updateUsername);
      
      window.onkeydown = inputFocus

    }
    
  }, [socket]);

  const inputFocus = () => {
    document.getElementById("messageInput").focus();
  };

  useEffect(() => {
    window.onkeydown = inputFocus
  }, [])


  return (

    <div className="App">
      <img src={tv} className="tv" alt="logo" />
      {!isConnected ? 
        <><div class="background-login"></div>
        <div class="content">
          <div class="login">
            <form onSubmit={submitForm}>
              <input
                id="messageInput"
                class="login-input"
                value={username}
                placeholder="PSEUDO"
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                } } />
            </form>
          </div>
        </div></>

    :
    <>
    <div class="background"></div>
    <span className="content">
      <span class="message-thread">
      <MessagesThread classMessage={stroke} className="thread" messages={messages} socket={socket} />
            <MessageInput socket={socket} />
      </span>
        <span className="user-list-component">
            <User className={hidden} users={users} />
        </span>
        </span>
        <button  onClick={btnClickUser} className="user-list-btn"></button>
        <button  onClick={btnClickLogin} className="login-btn"></button>

        </>
      
    
    }

    </div>
  );
}

export default App;
