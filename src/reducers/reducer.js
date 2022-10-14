import { useState } from "react";

export const initialState = {
  isTimerRunning: false,
  timestamp: 0,
  lapNumber: 1,
  lapRows: [],
  elapsedTime: 0,
};

export const ACTIONS = {
  START_TIMER: "started",
  STOP_TIMER: "stopped",
  ADD_LAP: "added",
  RESET_TIMER: "resetted",
};

export default function reducer(states, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER: {
      return {
        ...states,
        isTimerRunning: true,
        timestamp: action.timestamp,
      };
    }
    case ACTIONS.STOP_TIMER: {
      return {
        ...states,
        isTimerRunning: false,
      };
    }
    case ACTIONS.RESET_TIMER: {
      return initialState;
    }
    case ACTIONS.ADD_LAP: {
      return {
        ...states,
        lapNumber: states.lapNumber + 1,
        lapRows: action.lapRows,
      };
    }
    default:
      throw new Error("Error at reducer function.");
  }
}
