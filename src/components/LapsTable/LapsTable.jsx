import "./LapsTable.css";
import { displayFastestAndSlowestLap } from "../../utils/lap-speed-utils";
import transformTime from "../../utils/formatting-utils";

export default function LapsSection({ elapsedTime, lapNumber, lapRows }) {
  const listLaps = lapRows
    .map((lap) => {
      return (
        <tbody key={lap.id}>
          <tr
            className={displayFastestAndSlowestLap(
              lap.time,
              lapNumber,
              lapRows
            )}
          >
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
                  lapRows
                    .map((lap) => lap.time)
                    .reduce((prevLap, currLap) => prevLap + currLap, 0)
              )}
            </td>
          </tr>
        </tbody>
        {lapNumber >= 2 && listLaps}
      </table>
    </div>
  );
}
