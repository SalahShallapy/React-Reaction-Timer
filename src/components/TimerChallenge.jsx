import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const Timer = useRef();
  const dialog = useRef();
  const [timeRemaning, setTimeRemaning] = useState(targetTime * 1000);

  const timerIsActive = timeRemaning > 0 && timeRemaning < targetTime * 1000;

  if (timeRemaning <= 0) {
    clearInterval(Timer.current);
    dialog.current.open();
  }

  const handleReset = function () {
    setTimeRemaning(targetTime * 1000);
  };

  const handleStart = function () {
    Timer.current = setInterval(() => {
      setTimeRemaning((prevTime) => prevTime - 10);
    }, 10);
  };

  const handleStop = function () {
    clearInterval(Timer.current);
    dialog.current.open();
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remaningTime={timeRemaning}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running...." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
