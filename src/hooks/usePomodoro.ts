import { useEffect, useState } from "react";

const TWINTY_FIVE_MINUTES_IN_SECS = 25 * 60;
const ONE_MINUTE_IN_SECS = 1 * 60;

export interface IUsePomodoroProps {
  cycleTotalTimeInSecs?: number;
  isPaused?: boolean;
}

export interface UsePomodoroReturn {
  elapsedTime: number;
  timeLeft: number;
}

const usePomodoro = (props?: IUsePomodoroProps): UsePomodoroReturn => {
  const {
    cycleTotalTimeInSecs = TWINTY_FIVE_MINUTES_IN_SECS,
    isPaused = false,
  } = props || {};

  const [timeLeft, setTimeLeft] = useState<number>(cycleTotalTimeInSecs);

  useEffect(() => {
    const subtractOneMinuteFromTotal = () => {
      if (!isPaused) {
        setTimeLeft((pS) => pS - 1);
      }
    };

    const id = setInterval(subtractOneMinuteFromTotal, ONE_MINUTE_IN_SECS);

    return clearInterval(id);
  }, [isPaused]);

  return {
    elapsedTime: cycleTotalTimeInSecs - timeLeft,
    timeLeft,
  };
};

export { usePomodoro };
