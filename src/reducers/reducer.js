export const initialState = {
  isTimerRunning: false,
  timestamp: 0,
  lapNumber: 1,
  lapRows: [],
  elapsedTime: 0,
}

export const ACTIONS = {
  START_TIMER: 'started',
  STOP_TIMER: 'stopped',
  ADD_LAP: 'added',
  RESET_TIMER: 'resetted',
  SET_ELAPSEDTIME: 'setted',
}

export default function reducer(states, action) {
  const newLapTime =
    states.elapsedTime -
    states.lapRows
      .map(lap => lap.time)
      .reduce((prevLap, currLap) => prevLap + currLap, 0)

  switch (action.type) {
    case ACTIONS.START_TIMER: {
      return {
        ...states,
        isTimerRunning: true,
        timestamp:
          action.timestamp === 0
            ? action.timestamp
            : action.timestamp - states.elapsedTime,
        elapsedTime: states.elapsedTime,
      }
    }
    case ACTIONS.STOP_TIMER: {
      return {
        ...states,
        isTimerRunning: false,
      }
    }
    case ACTIONS.RESET_TIMER: {
      return initialState
    }
    case ACTIONS.ADD_LAP: {
      return {
        ...states,
        lapNumber: states.lapNumber + 1,
        lapRows: [
          ...states.lapRows,
          { id: states.lapNumber, time: newLapTime },
        ],
      }
    }
    case ACTIONS.SET_ELAPSEDTIME: {
      return { ...states, elapsedTime: action.elapsedTime }
    }
    default:
      throw new Error('Error at reducer function.')
  }
}
