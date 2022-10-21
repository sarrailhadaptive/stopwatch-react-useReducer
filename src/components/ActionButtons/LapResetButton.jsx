import handleLapResetStyles from '../../utils/handle-lap-reset.js'
import './ActionButtons.css'

export default function LapResetButton({
  isTimerRunning,
  timestamp,
  addNewLap,
  resetApp,
}) {
  return (
    <button
      className={handleLapResetStyles(timestamp, isTimerRunning)}
      onClick={isTimerRunning ? () => addNewLap() : () => resetApp()}
    >
      {isTimerRunning || timestamp === 0 ? 'Lap' : 'Reset'}
    </button>
  )
}
