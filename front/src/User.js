import React, { useEffect, useState } from "react";
import "./User.css"

function User({users}) {

    let anonymousUsers = users.filter(user => user.name === "Anonymous");

    return (
        <div className="user-list">
            <h4>Utilisateurs connectés</h4>
                {users.filter(user => user.name != 'Anonymous').map((user) => (
                    <div key={user.id} className="user">
                    {user.name}
                    </div>
                ))}
                <div className="anonymous-users">
                    {anonymousUsers.length} anonymous users
        </div>
        </div>
    );
}

export default User;