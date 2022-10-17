import React, { useReducer, useEffect } from "react";
import reducer, { initialState, ACTIONS } from "./reducers/reducer.js";
import transformTime from "./utils/formatting-utils.js";
import LapResetButton from "./components/ActionButtons/LapResetButton.jsx";
import StartStopButton from "./components/ActionButtons/StartStopButton.jsx";
import LapsTable from "./components/LapsTable/LapsTable.jsx";
import "./App.css";

// ------------------------------------- //

export default function IPhoneScreen() {
  const [states, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (states.isTimerRunning === true) {
      const timerID = setInterval(() => {
        dispatch({
          type: ACTIONS.SET_ELAPSEDTIME,
          elapsedTime: Date.now() - states.timestamp,
        });
      }, 10);
      return () => clearInterval(timerID);
    }
  });

  const startTimer = (timestamp) =>
    dispatch({
      type: ACTIONS.START_TIMER,
      timestamp: timestamp,
    });

  const stopTimer = () => dispatch({ type: ACTIONS.STOP_TIMER });

  const addNewLap = () => dispatch({ type: ACTIONS.ADD_LAP });

  const resetApp = () => dispatch({ type: ACTIONS.RESET_TIMER });

  return (
    <div>
      <div className="main-timer-section">
        <h1>{transformTime(states.elapsedTime)}</h1>
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
        elapsedTime={states.elapsedTime}
        lapNumber={states.lapNumber}
        lapRows={states.lapRows}
      />
    </div>
  );
}
