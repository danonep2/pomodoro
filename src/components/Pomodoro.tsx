import React from "react";
import { Timer, Button } from "../components";

import { usePomodoro } from "../hooks/use-pomodoro";
import { secondsToTime } from "../utils/Time";

const Pomodoro: React.FC = () => {
  const {
    leftTime,
    totalTime,
    cycle,
    pomodoroStatus,
    pauseCount,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
  } = usePomodoro();

  return (
    <div className="pomodoro">
      <h1>Você está: {pomodoroStatus}</h1>
      <Timer time={leftTime} />

      <div className="controler">
        <Button
          text={"Iniciar"}
          className={"start"}
          callback={() => startPomodoro()}
        />

        <Button
          text="Pausar"
          className={"pause"}
          callback={() => pausePomodoro()}
        />

        <Button
          text="Reinciar"
          className={"reset"}
          callback={() => resetPomodoro()}
        />
      </div>
      <div className="details">
        <strong>Detalhes:</strong>
        <p>Ciclos: {cycle}</p>
        <p>Tempo total decorrido: {secondsToTime(totalTime)}</p>
        <p>Pomodoros: {pauseCount}</p>
      </div>
    </div>
  );
};

export { Pomodoro };
