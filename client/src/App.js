import { useState } from "react";
import axios from "axios";
import "./App.css";
import PieChart from "./PieChart";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  // new line start
  const scanOption = ["Sentiment", "Spam", "Summary"];
  const [checkedState, setCheckedState] = useState(
    new Array(scanOption.length).fill(false)
  );
  const [result, setResultData] = useState(null);

  const [sentimentData, setSentimentData] = useState(null);
  const [spamData, setSpamData] = useState(null);

  let initialState = {
    paragraph: "Enter your text here",
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
          sentimentValue: res.sentimentValue,
        });
        if (res.sentimentValue)
          setSentimentData({
            labels: ["Negative", "Positive", "Neutral"],
            datasets: [
              {
                label: "Sentiment analysis",
                data: res.sentimentValue,
                backgroundColor: ["#ecf0f1", "#50AF95", "#f3ba2f"],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          });
        else setSentimentData(null);
        if (res.spamValue)
          setSpamData({
            labels: ["Spam", "Not spam"],
            datasets: [
              {
                label: "Spam analysis",
                data: res.spamValue,
                backgroundColor: ["#ecf0f1", "#50AF95", "#f3ba2f"],
                borderColor: "black",
                borderWidth: 2,
              },
            ],
          });
        else setSpamData(null);
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
        <form onSubmit={getData}>
          <textarea
            type="text"
            name="paragraph"
            value={analysisForm.paragraph}
            onChange={(e) => onChangeHandler(e.target)}
            cols="60"
            rows="10"
          />
          <br />
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
          <br />
          <input type="submit" value="Submit" />
        </form>

        {/* new line start*/}
        {result && (
          <div>
            <p>Your analysis details: </p>
            {result.paragraph && <p>Summary: {result.paragraph}</p>}
            {(result.options.spam != null ||
              result.options.sentiment != null) && (
              <p>Result: {result.options}</p>
            )}
            {sentimentData && (
              <div id="sentiment_chart">
                <p>Sentiment analysis</p>
                <PieChart chartData={sentimentData} />
              </div>
            )}
            {spamData && (
              <div id="spam_chart">
                <p>Spam analysis</p>
                <PieChart chartData={spamData} />
              </div>
            )}
          </div>
        )}
        {/* end of new line */}
      </header>
    </div>
  );
}

export default App;
