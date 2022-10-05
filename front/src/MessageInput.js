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
            <h4>Utilisateur nnn</h4>
            <input
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