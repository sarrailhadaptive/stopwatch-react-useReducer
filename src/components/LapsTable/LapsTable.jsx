import "./LapsTable.css";
import { displayFastestAndSlowestLap } from "../../utils/lap-speed-utils";
import transformTime from "../../utils/formatting-utils";

export default function LapsSection({ elapsedTime, lapNumber, lapRows }) {
  const listLaps = lapRows
    .map(({ id, time }) => {
      return (
        <tbody key={id}>
          <tr className={displayFastestAndSlowestLap(time, lapNumber, lapRows)}>
            <td>Lap {id}</td>
            <td>{transformTime(time)}</td>
          </tr>
        </tbody>
      );
    })
    .reverse();

  const currentLap = () => {
    return (
      <tbody>
        <tr>
          <td>Lap {lapNumber}</td>
          <td>
            {transformTime(
              elapsedTime -
                lapRows
                  .map((lap) => lap.time)
                  .reduce((prevLap, currLap) => prevLap + currLap, 0)
            )}
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <div className="lap-table-section">
      <table>
        {elapsedTime === 0 && lapNumber === 1 ? "" : currentLap()}
        {lapNumber >= 2 && listLaps}
      </table>
    </div>
  );
}
