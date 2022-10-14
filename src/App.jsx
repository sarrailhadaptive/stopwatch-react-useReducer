import React, { useState, useReducer, useEffect } from "react";
import reducer, { initialState, ACTIONS } from "./reducers/reducer.js";
import transformTime from "./utils/formatting-utils.js";
import LapResetButton from "./components/ActionButtons/LapResetButton.jsx";
import StartStopButton from "./components/ActionButtons/StartStopButton.jsx";
import LapsTable from "./components/LapsTable/LapsTable.jsx";
import "./App.css";

// ------------------------------------- //

export default function IPhoneScreen() {
  const [states, dispatch] = useReducer(reducer, initialState);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (states.isTimerRunning === true) {
      const timerID = setInterval(() => {
        setElapsedTime(Date.now() - states.timestamp);
      }, 10);
      return () => clearInterval(timerID);
    }
  });

  const startTimer = (timestamp) =>
    dispatch({
      type: ACTIONS.START_TIMER,
      timestamp: timestamp !== 0 && (timestamp = timestamp - elapsedTime),
    });

  const stopTimer = () => dispatch({ type: ACTIONS.STOP_TIMER });

  function addNewLap() {
    const newLapTime =
      elapsedTime -
      states.lapRows
        .map((lap) => lap.time)
        .reduce((prevLap, currLap) => prevLap + currLap, 0);
    dispatch({
      type: ACTIONS.ADD_LAP,
      lapRows: [...states.lapRows, { id: states.lapNumber, time: newLapTime }],
    });
  }

  function resetApp() {
    setElapsedTime(0);
    dispatch({
      type: ACTIONS.RESET_TIMER,
    });
  }

  return (
    <div>
      <div className="main-timer-section">
        <h1>{transformTime(elapsedTime)}</h1>
      </div>
      <div className="buttons-wrapper">
        <LapResetButton
          isTimerRunning={states.isTimerRunning}
          timestamp={states.timestamp}
          addNewLap={addNewLap}
          resetApp={resetApp}
        />
        <StartStopButton
          startTimer={startTimer}
          stopTimer={stopTimer}
          isTimerRunning={states.isTimerRunning}
        />
      </div>
      <LapsTable
        elapsedTime={elapsedTime}
        lapNumber={states.lapNumber}
        lapRows={states.lapRows}
      />
    </div>
  );
}
