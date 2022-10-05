import React, {useState} from 'react';

const NameInput = ({socket}) => {
    const [value, setValue] = useState("");
    const submitForm = (e) => {
      e.preventDefault();
      socket.emit("setUsername", value);
      setValue("");
    };

    return (
        <form onSubmit={submitForm}>
            <h4>Set your name</h4>
            <input
            value = {value}
            placeholder = "name"
            onChange = {(e) => {
                setValue(e.currentTarget.value);
            }}
            />
        </form>
    );
};

export default NameInput;