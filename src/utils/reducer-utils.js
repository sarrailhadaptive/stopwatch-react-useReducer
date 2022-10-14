import { ACTIONS } from "../App";

export default function reducer(states, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER: {
      return {
        ...states,
        isTimerRunning: action.payload,
        timestamp: action.timestamp,
      };
    }
    case ACTIONS.STOP_TIMER: {
      return {
        ...states,
        isTimerRunning: action.payload,
      };
    }
    case ACTIONS.RESET_TIMER: {
      return {
        ...states,
        isTimerRunning: false,
        timestamp: 0,
        lapNumber: 1,
        lapRows: [],
        lapTimes: [],
      };
    }
    case ACTIONS.ADD_LAP: {
      return {
        ...states,
        lapNumber: action.payload + 1,
        lapTimes: action.lapTimes,
        lapRows: action.lapRows,
      };
    }
    default:
      return states;
  }
}
