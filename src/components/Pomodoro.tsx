import React, { useEffect, useState } from "react";
import { secondsToTime } from "../utils/Time";
import { Button, Timer } from "../components";
import StartSound from "../assets/sounds/start.mp3";
import FinishSound from "../assets/sounds/finish.mp3";
import Pauseound from "../assets/sounds/pause.mp3";
import { PomodoroStatus } from "../@types/enums";
import { usePomodoro } from "../hooks/usePomodoro";

const audioStart = new Audio(StartSound);
const audioFinish = new Audio(FinishSound);
const audioPause = new Audio(Pauseound);

// memoização
// useMemo, useCallback, memo

interface PomodoroProps {
  timeWorkingInSecs: number;
  pauseTimeInSecs: number;
}

const Pomodoro: React.FC<PomodoroProps> = (props) => {
  const { pauseTimeInSecs, timeWorkingInSecs } = props;

  const [time, setTime] = useState(timeWorkingInSecs);
  const [status, setStatus] = useState<PomodoroStatus>(
    PomodoroStatus.Iniciando
  );
  const [pauseCount, setPauseCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const [cycle, setCycle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const { elapsedTime, timeLeft } = usePomodoro();

  const startPodomoro = () => {
    if (!isPaused) {
      setIsWorking(true);
      setIsPaused(true);
      audioStart.play();
    }
  };

  const pausePodomoro = () => {
    setIsPaused(false);
    audioPause.play();
  };

  const resetPomodoro = () => {
    if (totalTime >= 1) {
      setTime(timeWorkingInSecs);
      setIsPaused(false);
      setIsWorking(false);
      setTotalTime(0);
    }
  };

  // early return
  // context api
  useEffect(() => {
    if (isWorking && isPaused) {
      document.body.classList.add("working");
      setStatus(PomodoroStatus.Trabalhando);
      return;
    }

    if (totalTime === 0) {
      document.body.classList.remove("working");
      setStatus(PomodoroStatus.Iniciando);
      return;
    }

    document.body.classList.remove("working");
    setStatus(PomodoroStatus.Descansando);
  }, [isWorking]);

  useEffect(() => {
    if (time >= 0) {
      return;
    }

    audioFinish.play();

    if (isWorking) {
      setPauseCount((pS) => pS + 1);

      if (pauseCount % 4 === 0) {
        setCycle(cycle + 1);
      }

      setTime(pauseTimeInSecs);
    } else {
      setTime(timeWorkingInSecs);
    }

    setIsWorking(!isWorking);
  }, [
    setCycle,
    setTime,
    setTotalTime,
    time,
    cycle,
    isWorking,
    pauseTimeInSecs,
    timeWorkingInSecs,
  ]);

  return (
    <div className="pomodoro">
      <h1>
        Você está: <span>{status}</span>
      </h1>
      <Timer
        time={time}
        setTime={setTime}
        inWorking={isPaused}
        setTotalTime={setTotalTime}
        totalTime={totalTime}
      />

      <div className="controler">
        <Button
          text={"Iniciar"}
          className={"Start"}
          callback={() => startPodomoro()}
        />

        <Button
          text="Pausar"
          className={totalTime < 1 ? "hidden" : ""}
          callback={() => pausePodomoro()}
        />

        <Button
          text="Reinciar"
          className="reset"
          callback={() => resetPomodoro()}
        />
      </div>

      <div className="details">
        <strong>Detalhes:</strong>
        <p>Ciclos: {cycle}</p>
        <p>Tempo total decorrido: {secondsToTime(totalTime)}</p>
        <p>Podomoros: {pauseCount}</p>
      </div>
    </div>
  );
};

export { Pomodoro };
