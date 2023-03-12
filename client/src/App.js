import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // new line start
  const [result, setResultData] = useState(null);

  let initialState = {
    paragraph: "Enter your text here",
    options: ["spam", "ham"],
  };
  const [analysisForm, setAnalysisForm] = useState(initialState);

  function getData(e) {
    e.preventDefault();
    axios({
      method: "post",
      // url: "http://127.0.0.1:8000/spam",
      url: "https://fraudapi.onrender.com/spam",
      data: JSON.stringify(analysisForm),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setResultData({
          paragraph: res.paragraph,
          options: res.options,
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
    setAnalysisForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={getData}>
          <textarea
            type="text"
            name="paragraph"
            value={analysisForm.paragraph}
            onChange={(e) => onChangeHandler(e.target)}
            cols="60"
            rows="5"
          />
          <br />
          <input type="submit" value="Submit" />
        </form>

        {/* new line start*/}
        <p>Your analysis details: </p>
        {result && (
          <div>
            <p>Received text: {result.paragraph}</p>
            <p>Options chosen: {result.options}</p>
          </div>
        )}
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;
