import { zeroLeft } from "./zero-left";

function secondsToMinutes(n: number): string {
  const min = zeroLeft((n / 60) % 60);
  const sec = zeroLeft((n % 60) % 60);
  return `${min}:${sec}`;
}
export default secondsToMinutes;
