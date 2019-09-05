import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(forward) {
    history.push(mode);
    setMode(forward);
  }
  function back() {
    setMode(history.pop());
    setHistory(history);
  }

  return { mode, transition, back };
}
