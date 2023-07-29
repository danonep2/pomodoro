import React from "react";
import { Pomodoro } from "./components";

function App(): JSX.Element {
  return (
    <div className="App">
      <Pomodoro timeWorkingInSecs={1500} pauseTimeInSecs={300} />
    </div>
  );
}

export default App;
