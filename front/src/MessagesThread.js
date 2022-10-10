import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import "./MessagesThread.css"

let i = 0;

function MessagesThread ({classMessage, messages, socket }) {

    const [ids, setIds] = useState([]);
    const [positions, setPositions] = useState([]);

    const randomize = () => {
        return Math.floor(Math.random() * 500);
    }

    const useChatScroll = (dep) => {
        const ref = React.useRef();
        React.useEffect(() => {
          if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        }, [dep]);
        return ref;
      }
    
      const ref = useChatScroll(messages);

        console.log(messages)
    //     useEffect(() => {
    //     if(messages.length > 0) {
    //         console.log('hello')
    //         setPositions((prevPositions) => {
    //             return [...prevPositions, {x: randomize(), y: randomize()}]
    //         })
    //         setTimeout(() => {
    //                 setIds((prevIds) => {
    //                     console.log(i)
    //                     return [...prevIds, messages[i - 1].id];  
    //                 })
    //         }, 3000);     
    //         i++
    //     }
    // }, [messages])
        
        
    return (
    
        <div className="messages" ref={ref}>
        {messages.map((message) => (
            <div className={message.user.id === socket.id ? 'my message' : 'message'}  key={message.id}>
                <div class="sender">
                    <span>{message.user.name}</span>
                    <span>{new Date(message.time).toLocaleTimeString()}</span>
                </div>
                <div>{message.value}</div>
                <span className="date">
                    
                </span>
            </div>

        ))}
        </div>
    );
}

export default MessagesThread;