import { useEffect } from "react";
import "./ActionButtons.css";

export default function LapResetButton({
  isTimerRunning,
  timestamp,
  addNewLap,
  resetApp,
}) {
  function handleButtonStyles() {
    if (timestamp === 0) return "buttons lap-reset-button";
    if (isTimerRunning) return "buttons lap-active";
    if (!isTimerRunning) return "buttons reset-active";
  }
  return (
    <button
      className={handleButtonStyles()}
      onClick={isTimerRunning ? () => addNewLap() : () => resetApp()}
    >
      {isTimerRunning || timestamp === 0 ? "Lap" : "Reset"}
    </button>
  );
}
