import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Button from "./Button";
import secondsToTime from "../utils/seconds-to-time";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const start = require("../sounds/start.mp3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const finish = require("../sounds/finish.mp3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pause = require("../sounds/pause.mp3");

const audioStart = new Audio(start);
const audioFinish = new Audio(finish);
const audioPause = new Audio(pause);

interface Props {
  timeWorking: number;
  pauseTime: number;
  longPause: number;
  clycle: number;
}

let pauseCount = 0;

function Pomodoro(props: Props): JSX.Element {
  const [time, setTime] = useState(props.timeWorking);
  const [count, setCount] = useState(false);
  const [working, setWorking] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const startPodomoro = () => {
    if (!count) {
      setWorking(true);
      setCount(true);
      audioStart.play();
    }
  };

  const pausePodomoro = () => {
    setCount(false);
    audioPause.play();
  };

  const resetPomodoro = () => {
    if (totalTime >= 1) {
      setTime(props.timeWorking);
      setCount(false);
      setWorking(false);
      setTotalTime(-1);
    }
  };

  useEffect(() => {
    if (working) {
      document.body.classList.add("working");
      document.getElementsByClassName("status")[0].innerHTML = "Trabalhando";
    } else {
      document.body.classList.remove("working");
      document.getElementsByClassName("status")[0].innerHTML = "Descancando";
    }
  }, [working]);

  useEffect(() => {
    if (time === -1) {
      audioFinish.play();
      if (working) {
        pauseCount++;
        const newTime = props.pauseTime;
        if (pauseCount % 4 === 0) {
          setCycle(cycle + 1);
        }
        setTime(newTime);
      } else {
        setTime(props.timeWorking);
      }
      setWorking(!working);
    }
  }, [
    setCycle,
    setTime,
    setTotalTime,
    time,
    cycle,
    working,
    props.pauseTime,
    props.timeWorking,
  ]);

  return (
    <div className="pomodoro">
      <h1>
        Você está: <span className="status">Em pausa</span>
      </h1>
      <Timer
        time={time}
        setTime={setTime}
        inWorking={count}
        setTotalTime={setTotalTime}
        totalTime={totalTime}
      ></Timer>

      <div className="controler">
        <Button
          text={"Iniciar"}
          className={"Start"}
          callback={() => startPodomoro()}
        ></Button>

        <Button
          text="Pausar"
          className={totalTime < 1 ? "hidden" : ""}
          callback={() => pausePodomoro()}
        ></Button>

        <Button
          text="Reinciar"
          className="reset"
          callback={() => resetPomodoro()}
        ></Button>
      </div>
      <div className="details">
        <strong>Detalhes:</strong>
        <p>Ciclos: {cycle}</p>
        <p>Tempo total decorrido: {secondsToTime(totalTime)}</p>
        <p>Podomoros: {pauseCount}</p>
      </div>
    </div>
  );
}

export default Pomodoro;
