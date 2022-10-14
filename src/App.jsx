import React, { useState, useReducer, useEffect } from "react";
import transformTime from "./utils/formatting-utils.js";
import StartStopButton from "./components/ActionButtons/StartStopButton.jsx";
import LapsTable from "./components/LapsTable/LapsTable.jsx";
import reducer from "./utils/reducer-utils.js";
import LapResetButton from "./components/ActionButtons/LapResetButton.jsx";
import "./App.css";

// ------------------------------------- //

// export const isTimerRunningContext = React.createContext();

export const ACTIONS = {
  START_TIMER: "started",
  STOP_TIMER: "stopped",
  ADD_LAP: "added",
  RESET_TIMER: "resetted",
};

export default function IPhoneScreen() {
  const initialState = {
    isTimerRunning: false,
    timestamp: 0,
    lapNumber: 1,
    lapRows: [],
    lapTimes: [],
  };
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

  function startTimer(timestamp) {
    timestamp === 0 ? (timestamp = 0) : (timestamp = timestamp - elapsedTime);
    dispatch({
      type: ACTIONS.START_TIMER,
      payload: true,
      timestamp: timestamp,
    });
  }

  function stopTimer() {
    dispatch({
      type: ACTIONS.STOP_TIMER,
      payload: false,
    });
  }

  function addNewLap() {
    const newLapTime = states.lapTimes.reduce(
      (prevLap, currLap) => prevLap - currLap,
      elapsedTime
    );
    dispatch({
      type: ACTIONS.ADD_LAP,
      payload: states.lapNumber,
      lapTimes: [...states.lapTimes, newLapTime],
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
        lapTimes={states.lapTimes}
        lapRows={states.lapRows}
      />
    </div>
  );
}
