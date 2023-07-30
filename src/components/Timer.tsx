import React from "react";
import { secondsToMinutes } from "../utils/Time";

interface TimeProps {
  time: number;
}

const Timer: React.FC<TimeProps> = (props) => {
  const { time } = props;
  return <div className="timer">{secondsToMinutes(time)}</div>;
};

export { Timer };
