import { zeroLeft } from "./zero-left";

function secondsToTime(n: number): string {
  const hou = zeroLeft((n / 3600) % 60);
  const min = zeroLeft(((n % 3600) / 60) % 60);
  const sec = zeroLeft(((n % 3600) % 60) % 60);
  return `${hou}:${min}:${sec}`;
}
export default secondsToTime;
