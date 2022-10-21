export default function handleLapResetStyles(timestamp, isTimerRunning) {
  if (timestamp === 0) return 'buttons lap-reset-button'
  if (isTimerRunning) return 'buttons lap-active'
  if (!isTimerRunning) return 'buttons reset-active'
}
