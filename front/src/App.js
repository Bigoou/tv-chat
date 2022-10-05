import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import User from "./User";
import MessagesThread from "./MessagesThread";
import NameInput from "./NameInput";
import MessageInput from "./MessageInput";


function App() {

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    // const newSocket = io("https://whispering-chamber-09886.herokuapp.com/");
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if(socket) {
      socket.on("message", message => setMessages(
        prevMessages => 
        [...prevMessages, message]));
    
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
  
    }
    
  }, [socket]);



  return (
    <div className="App">
      <div class="content">
        <MessagesThread messages={messages} />
        <MessageInput socket={socket}/>
      </div>
        <NameInput socket={socket}/>
    </div>
  );
}

export default App;
