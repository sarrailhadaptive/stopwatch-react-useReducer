import "./ActionButtons.css";

export default function StartStopButton({
  startTimer,
  stopTimer,
  isTimerRunning,
}) {
  return (
    <div>
      <button
        className={
          isTimerRunning ? "buttons stop-button" : "buttons start-button"
        }
        onClick={
          isTimerRunning ? () => stopTimer() : () => startTimer(Date.now())
        }
      >
        {isTimerRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}
