import { useState, useRef, useEffect } from "react";

const StopWatch = () => {
  // 1. State
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // 2. Ref to keep interval ID
  const intervalRef = useRef(null);

  // 3. Derive minutes and seconds
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = (elapsedSec % 60).toString().padStart(2, "0");

  // 4. Effect: start or stop the interval when isRunning changes
  useEffect(() => {
    if (isRunning) {
      // start ticking
      intervalRef.current = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } else {
      // stop ticking
      clearInterval(intervalRef.current);
    }

    // cleanup on unmount or before next effect run
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // 5. Handlers
  const handleStartStop = () => {
    setIsRunning((running) => !running);
  };

  const handleReset = () => {
    // stop and reset
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedSec(0);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>

      <div className="time-display">
        <span>Time: </span>
        <span>
          {minutes}:{seconds}
        </span>
      </div>
      <br />
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default StopWatch;
