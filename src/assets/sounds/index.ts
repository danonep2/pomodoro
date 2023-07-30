import StartSound from "./start.mp3";
import FinishSound from "./finish.mp3";
import Pauseound from "./pause.mp3";

const audioStart = new Audio(StartSound);
const audioFinish = new Audio(FinishSound);
const audioPause = new Audio(Pauseound);

export { audioStart, audioFinish, audioPause };
