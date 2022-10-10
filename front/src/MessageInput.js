import React, { useEffect, useState } from "react";
import './MessageInput.css';

const MessageInput = ({socket}) => {
    const [value, setValue] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit("message", value);
        setValue("");
        console.log(value)
    };



    return (
        <form onSubmit={submitForm}>
            <input
                id="messageInput"
                class="message-input"
                autoFocus
                value={value}
                placeholder="Type your message"
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
            />
        </form>
    );
}

export default MessageInput;