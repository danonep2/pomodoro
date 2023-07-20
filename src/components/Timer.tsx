import useInterval from "../hooks/use-interval";
import React from "react";
import secondsToMinutes from "../utils/seconds-to-minutes";

interface Props {
  time: number;
  totalTime: number;
  inWorking: boolean;
  setTime: CallableFunction;
  setTotalTime: CallableFunction;
}

function Timer(props: Props): JSX.Element {
  useInterval(
    () => {
      props.setTotalTime(props.totalTime + 1);
      props.setTime(props.time - 1);
    },
    props.inWorking ? 1000 : null
  );
  return <div className="timer">{secondsToMinutes(props.time)}</div>;
}

export default Timer;
