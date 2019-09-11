import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // moves to selected state and saves previous state to history array
  function transition(forward) {
    history.push(mode);
    setMode(forward);
  }
  
  // moves to previous selected state and removes that from the history array
  function back() {
    setMode(history.pop());
    setHistory(history);
  }

  return { mode, transition, back };
}
