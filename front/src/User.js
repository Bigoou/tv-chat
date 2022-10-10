import React, { useEffect, useState } from "react";
import "./User.css"

function User({className, users}) {

    let anonymousUsers = users.filter(user => user.name === "Anonymous");

    const useChatScroll = (dep) => {
        const ref = React.useRef();
        React.useEffect(() => {
          if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        }, [dep]);
        return ref;
      }
    
      const ref = useChatScroll(users);

    return (
        <div className={className} ref={ref}>
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