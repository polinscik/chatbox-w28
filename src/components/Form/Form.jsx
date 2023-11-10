import React, {useState} from "react";
import "./Form.scss";

export default function Form({setChatLogs, chatLogs}) {
  const [formData, setFormData] = useState({
    username: "",
    isAnon: false,
    avatar: "",
    message: "",
  });

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [messageInvalid, setMessageInvalid] = useState(false);
  const usernameClassname = usernameInvalid ? "invalid" : "";
  const messageClassname = messageInvalid ? "invalid" : "";

  const handleChange = (e) => {
    const type = e.target.type;
    if (type === "checkbox") {
      if (!formData.isAnon) {
        setFormData({
          ...formData,
          username: "Аноним",
          [e.target.name]: e.target.checked,
        });
      } else if (formData.isAnon) {
        setFormData({
          ...formData,
          username: "",
          [e.target.name]: e.target.checked,
        });
      } else setFormData({...formData, [e.target.name]: e.target.checked});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
      if (e.target.value.trim()) {
        if (e.target.name === "username") {
          setUsernameInvalid(false);
        }
        if (e.target.name === "message") {
          setMessageInvalid(false);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "") {
      setUsernameInvalid(true);
    } else if (formData.message === "") {
      setMessageInvalid(true);
    } else {
      setChatLogs([
        ...chatLogs,
        {
          username: makeFirstLetterBig(formData.username.trim()),
          isAnon: formData.isAnon,
          avatar: validateUrl(formData.avatar),
          message: checkSpam(formData.message.trim()),
          id: chatLogs.length,
          date: getTimeAndDate(),
        },
      ]);
      setFormData({...formData, message: ""});
    }
  };

  return (
    <div>
      <h1>Чат со спам-фильтром</h1>
      <form noValidate className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-wr">
          <label htmlFor="username">Введите имя*: </label>
          <input
            value={formData.username}
            onChange={(e) => handleChange(e)}
            name="username"
            type="text"
            className={usernameClassname}
          />
        </div>
        <div className="input-wr">
          <label htmlFor="isAnon">Отправить анонимно: </label>
          <input
            value={formData.isAnon}
            onChange={(e) => handleChange(e)}
            name="isAnon"
            type="checkbox"
          />
        </div>
        <div className="input-wr">
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
        <div className="input-wr">
          <label htmlFor="message">Введите текст сообщения*: </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange(e)}
            name="message"
            type="text"
            className={messageClassname}
            cols="30"
            rows="10"
          />
        </div>
        {(messageInvalid || usernameInvalid) && (
          <p className="error">Заполните нужные поля</p>
        )}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

let options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

function checkSpam(string) {
  let stringChecked;
  stringChecked = string.replace(/viagra/gim, "***");
  stringChecked = stringChecked.replace(/xxx/gim, "***");
  return stringChecked;
}
function makeFirstLetterBig(string) {
  let newString =
    string.toUpperCase().slice(0, 1) + string.slice(1).toLowerCase();
  return newString;
}

function getTimeAndDate() {
  const date = new Date();
  const viewDate = date.toLocaleString("ru", options);
  return viewDate;
}

function assignRandomAvatar() {
  const randomAvatar =
    defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
  return randomAvatar;
}

function validateUrl(url) {
  const regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  if (regex.test(url)) {
    return url;
  } else return assignRandomAvatar();
}

const defaultAvatars = [
  "/src/assets/images/pfp-butterflies.jpg",
  "/src/assets/images/pfp-cat.jpg",
  "/src/assets/images/pfp-clouds.jpg",
  "/src/assets/images/pfp-devil.jpg",
  "/src/assets/images/pfp-orange-sky.jpg",
  "/src/assets/images/pfp-sunset.jpg",
];
