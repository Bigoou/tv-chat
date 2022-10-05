import React, { useEffect, useState } from 'react';

function MessagesThread ({ messages }) {
    
    return (
        <div className="messages">
        {messages.slice(messages.length-20, messages.length).map((message) => (
            <div key={message.id}>
            <span>{message.user.name} : {message.value} </span>
            <span className="date">
                {new Date(message.time).toLocaleTimeString()}
            </span>
            </div>

        ))}
        </div>
    );
}

export default MessagesThread;