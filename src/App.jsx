import { useState } from "react";

import "./App.css";
import StopWatch from "./components/stopwatch";

function App() {
  const [count, setCount] = useState(0);

  return <StopWatch />;
}

export default App;
