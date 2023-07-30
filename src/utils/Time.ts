const zeroLeft = (n: number): string =>
  Math.floor(n).toString().padStart(2, "0");
export { zeroLeft };

function secondsToMinutes(n: number): string {
  const min = zeroLeft((n / 60) % 60);
  const sec = zeroLeft((n % 60) % 60);
  return `${min}:${sec}`;
}

function secondsToTime(n: number): string {
  const hou = zeroLeft((n / 3600) % 60);
  const min = zeroLeft(((n % 3600) / 60) % 60);
  const sec = zeroLeft(((n % 3600) % 60) % 60);
  return `${hou}:${min}:${sec}`;
}

export { secondsToMinutes, secondsToTime };
