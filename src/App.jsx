import {useState} from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Chatbox from "./components/Chatbox/Chatbox";

function App() {
  const [chatLogs, setChatLogs] = useState([]);
  return (
    <main className="main">
      <Form setChatLogs={setChatLogs} chatLogs={chatLogs} />
      <Chatbox chatLogs={chatLogs} />
    </main>
  );
}
export default App;
