import React from "react";
import Pomodoro from "./components/Pomodoro";

function App(): JSX.Element {
  return (
    <div className="App">
      <Pomodoro timeWorking={1500} pauseTime={300} longPause={900} clycle={4} />
    </div>
  );
}

export default App;
