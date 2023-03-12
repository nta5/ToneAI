import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // new line start
  const [profileData, setProfileData] = useState(null);

  let initialState = {
    name: "Enter your text here",
  };
  const [person, setPerson] = useState(initialState);

  function getData(e) {
    e.preventDefault();
    axios({
      method: "post",
      // url: "http://127.0.0.1:8000/spam",
      url: "https://fraudapi.onrender.com/spam",
      data: JSON.stringify(person),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setProfileData({
          profile_name: res.message,
          about_me: res.message,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  //end of new line

  const onChangeHandler = (event) => {
    const { name, value } = event;
    setPerson((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={getData}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={person.name}
              onChange={(e) => onChangeHandler(e.target)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {/* new line start*/}
        <p>To get your analysis details: </p>
        {profileData && (
          <div>
            <p>Profile name: {profileData.profile_name}</p>
            <p>About me: {profileData.about_me}</p>
          </div>
        )}
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;
