import "./LapsTable.css";
import transformTime from "../../utils/formatting-utils";

export default function LapsSection({
  elapsedTime,
  lapNumber,
  lapTimes,
  lapRows,
}) {
  function findSmallestLapTime() {
    const minTimeLap = Math.min(...lapTimes);
    return minTimeLap;
  }

  function findHighestLapTime() {
    const maxTimeLap = Math.max(...lapTimes);
    return maxTimeLap;
  }

  function displayFastestAndSlowestLap(time) {
    if (lapNumber > 2) {
      if (findHighestLapTime() === time) return "slowest-lap";
      if (findSmallestLapTime() === time) return "fastest-lap";
    }
  }

  const listLaps = lapRows
    .map((lap) => {
      return (
        <tbody key={lap.id}>
          <tr className={displayFastestAndSlowestLap(lap.time)}>
            <td>Lap {lap.id}</td>
            <td>{transformTime(lap.time)}</td>
          </tr>
        </tbody>
      );
    })
    .reverse();
  return (
    <div className="lap-table-section">
      <table>
        <tbody>
          <tr>
            <td>Lap {lapNumber}</td>
            <td>
              {transformTime(
                elapsedTime -
                  lapTimes.reduce((prevLap, currLap) => prevLap + currLap, 0)
              )}
            </td>
          </tr>
        </tbody>
        {lapNumber >= 2 && listLaps}
      </table>
    </div>
  );
}
