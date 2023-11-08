import React from "react";

export default function Chatbox({chatLogs}) {
  const reversedLogs = [...chatLogs];
  reversedLogs.reverse();
  return (
    <div>
      <h1>Chatbox</h1>
      <div className="chatbox">
        {reversedLogs.map((log) => (
          <div key={log.id}>
            {log.username} said {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
