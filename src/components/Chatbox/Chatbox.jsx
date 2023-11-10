import React from "react";
import "./Chatbox.scss";

export default function Chatbox({chatLogs}) {
  const reversedLogs = [...chatLogs];
  reversedLogs.reverse();
  return (
    <div className="chatbox-wrapper">
      <div className="chatbox">
        {reversedLogs.map((log) => (
          <div
            className={
              log.id == chatLogs.length - 1 ? "new chatlog" : "chatlog"
            }
            key={log.id}>
            <div className="chatlog__userInfo">
              <img
                className="chatlog__userImage"
                src={log.avatar}
                alt="avatar"
              />
              <p className="chatlog__userName"> {log.username}</p>
              <p className="chatlog__time">{log.date}</p>
            </div>
            <div className="chatlog__message">{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
