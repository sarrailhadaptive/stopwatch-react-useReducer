export function findSmallestLapTime(lapRows) {
  const minTimeLap = Math.min(...lapRows.map(lap => lap.time))
  return minTimeLap
}

export function findHighestLapTime(lapRows) {
  const maxTimeLap = Math.max(...lapRows.map(lap => lap.time))
  return maxTimeLap
}

export function displayFastestAndSlowestLap(time, lapNumber, lapRows) {
  if (lapNumber > 2) {
    if (findHighestLapTime(lapRows) === time) return 'slowest-lap'
    if (findSmallestLapTime(lapRows) === time) return 'fastest-lap'
  }
}
