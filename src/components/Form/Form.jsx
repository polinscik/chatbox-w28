import React, {useState} from "react";
import "./Form.scss";

export default function Form({setChatLogs, chatLogs}) {
  const [formData, setFormData] = useState({
    username: "",
    isAnon: false,
    avatar: "",
    message: "",
  });

  const handleChange = (e) => {
    const type = e.target.type;
    if (type === "checkbox") {
      if (!formData.isAnon) {
        setFormData({
          ...formData,
          username: "Аноним",
          [e.target.name]: e.target.checked,
        });
      } else setFormData({...formData, [e.target.name]: e.target.checked});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value.trim()});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username == "" || formData.message == "") {
      console.log("invalid");
    } else {
      console.log(formData);
      setChatLogs([
        ...chatLogs,
        {
          username: formData.username,
          isAnon: formData.isAnon,
          avatar: formData.avatar,
          message: formData.message,
          id: chatLogs.length,
        },
      ]);
    }
  };

  return (
    <div>
      <h1>Form</h1>
      <form noValidate className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Введите имя: </label>
          <input
            value={formData.username}
            onChange={(e) => handleChange(e)}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="isAnon">Отправить анонимно: </label>
          <input
            value={formData.isAnon}
            onChange={(e) => handleChange(e)}
            name="isAnon"
            type="checkbox"
          />
        </div>
        <div>
          <label htmlFor="avatar">
            Введите ссылку на аватар (необязательно):{" "}
          </label>
          <input
            value={formData.avatar}
            onChange={(e) => handleChange(e)}
            name="avatar"
            type="url"
          />
        </div>
        <div>
          <label htmlFor="message">Введите текст сообщения: </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange(e)}
            name="message"
            type="text"
          />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
