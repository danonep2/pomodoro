import { useState, useEffect } from "react";
import { audioFinish, audioPause, audioStart } from "../assets/sounds/index";
import { useInterval } from "./use-interval";
import { PomodoroStatus } from "../@types/enums";

const one_secs_in_ms = 1000;

interface ReturnUsePomodoro {
  leftTime: number;
  totalTime: number;
  cycle: number;
  pauseCount: number;
  pomodoroStatus: PomodoroStatus;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
}

const usePomodoro = (): ReturnUsePomodoro => {
  const timeWorkingInSecs = 1500;
  const timePauseInSecs = 600;
  const longPauseInSecs = 900;

  const [leftTime, setLeftTime] = useState(timeWorkingInSecs);
  const [totalTime, setTotalTime] = useState(0);

  const [isPause, setIsPause] = useState(true);
  const [inWorking, setInWorking] = useState(false);
  const [pomodoroStatus, setPomodoroStatus] = useState(PomodoroStatus.STARTING);

  const [pauseCount, setPauseCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useInterval(
    () => {
      setLeftTime((pS) => pS - 1);
      setTotalTime((pS) => pS + 1);
    },
    !isPause ? one_secs_in_ms : null
  );

  const startPomodoro = () => {
    if (isPause) {
      setInWorking(true);
      setIsPause(false);
      audioStart.play();
    }
  };

  const pausePomodoro = () => {
    setIsPause(true);
    audioPause.play();
  };

  const resetPomodoro = () => {
    if (totalTime >= 1) {
      setLeftTime(timeWorkingInSecs);
      setIsPause(true);
      setInWorking(false);
      setTotalTime(0);
      setCycle(0);
      setPauseCount(0);
    }
  };

  useEffect(() => {
    if (inWorking) {
      setPomodoroStatus(PomodoroStatus.WORKING);
    } else if (totalTime === 0) {
      setPomodoroStatus(PomodoroStatus.STARTING);
    } else {
      setPomodoroStatus(PomodoroStatus.RESTING);
    }

    const bodyClass = document.body.classList;

    if (pomodoroStatus === PomodoroStatus.WORKING) {
      bodyClass.add("working");
      return;
    }

    bodyClass.remove("working");
  }, [inWorking, setPomodoroStatus, totalTime, pomodoroStatus]);

  useEffect(() => {
    if (leftTime >= 0) {
      return;
    }

    audioFinish.play();

    if (inWorking) {
      const aux = pauseCount + 1; // Gambiarra pra corrigir um bug
      setPauseCount(aux);

      if (aux % 4 === 0) {
        setLeftTime(longPauseInSecs);
        setCycle((pS) => pS + 1);
      } else {
        setLeftTime(timePauseInSecs);
      }
    } else {
      setLeftTime(timeWorkingInSecs);
    }

    setInWorking(!inWorking);
  }, [setCycle, setLeftTime, setPauseCount, leftTime, inWorking, pauseCount]);

  return {
    leftTime,
    totalTime,
    cycle,
    pauseCount,
    pomodoroStatus,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
  };
};

export { usePomodoro };
