import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // new line start
  const scanOption = ["Sentiment", "Spam", "Summary"];
  const [checkedState, setCheckedState] = useState(
    new Array(scanOption.length).fill(false)
  );
  const [result, setResultData] = useState(null);

  let initialState = {
    options: [],
  };
  const [analysisForm, setAnalysisForm] = useState(initialState);

  function getData(e) {
    e.preventDefault();
    axios({
      method: "post",
      // url: "http://127.0.0.1:8000/spam",
      url: "https://toneapi.onrender.com/spam",
      data: JSON.stringify(analysisForm),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setResultData({
          paragraph: res.summary ? res.summary : null,
          options: [
            res.sentiment ? res.sentiment : null,
            res.spam ? res.spam : null,
          ],
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

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    setAnalysisForm((prev) => {
      let choices = [];

      for (let i = 0; i < checkedState.length; i++) {
        if (updatedCheckedState[i]) {
          choices.push(scanOption[i].toLowerCase());
        }
      }

      return { ...prev, options: choices };
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      <img src="ToneAI.png" alt="ToneAI" />
        <h1 id="navbar">ToneAI</h1>
        <form onSubmit={getData}>
          <textarea
            placeholder="Enter your text here"
            type="text"
            name="paragraph"
            value={analysisForm.paragraph}
            onChange={(e) => onChangeHandler(e.target)}
            cols="60"
            rows="10"
          />
          <br />
          <div className="checkbox-container">
          <ul className="option-list">
            {scanOption.map((name, index) => {
              return (
                <li key={index}>
                  <div className="list-item">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
          <br />
          <input type="submit" id="submit-button" value="Submit" />
        </form>

        {/* new line start*/}
        {result && (
          <div>
            <p>Your analysis details: </p>
            {result.paragraph && <p>Summary: {result.paragraph}</p>}
            {result.options.spam != null &&
              result.options.sentiment != null && (
                <p>Result: {result.options}</p>
              )}
          </div>
        )}
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;
