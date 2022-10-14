export default function transformTime(elapsedTime) {
  return `${addPadStart(Math.floor(elapsedTime / 60000))}:${addPadStart(
    Math.floor((elapsedTime / 1000) % 60)
  )}.${addPadStart(Math.floor((elapsedTime / 10) % 100))}`;
}

function addPadStart(time) {
  return time.toString().padStart(2, "0");
}
