import { useState } from "react";
import axios from "axios";
import ToneAI from "./ToneAI.png";
import "./App.css";
import { Grid } from "@mui/material";
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
        <Grid container spacing={3}>
          <Grid item xs={12} p={2} id="navbar">
            <img src={ToneAI} id="navbar-image" alt="ToneAI" />
          </Grid>
          <Grid item xs={6} p={2} id="form-data">
            <form onSubmit={getData}>
              <textarea
                placeholder="Enter your text here"
                type="text"
                name="paragraph"
                value={analysisForm.paragraph}
                onChange={(e) => onChangeHandler(e.target)}
                cols="50"
                rows="20"
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
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <br />
              <input type="submit" id="submit-button" value="Submit" />
            </form>{" "}
          </Grid>

          <Grid item xs={6} p={2} id="result">
            {/* new line start*/}
            {result && (
              <div>
                <p>Your analysis details: </p>
                {(result.options.spam != null ||
                  result.options.sentiment != null) && (
                  <p>Result: {result.options}</p>
                )}
                {sentimentData && (
                  <div id="sentiment_chart" class="chart">
                    <p>Sentiment analysis</p>
                    <PieChart chartData={sentimentData} />
                  </div>
                )}
                {spamData && (
                  <div id="spam_chart" class="chart">
                    <p>Spam analysis</p>
                    <PieChart chartData={spamData} />
                  </div>
                )}
                {result.paragraph && <p>Summary: {result.paragraph}</p>}
              </div>
            )}
            {/* end of new line */}
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
