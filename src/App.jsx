import { useState, useEffect, useRef } from "react";

function App() {
  const START_TIME = 15;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(START_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textAreaRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setText(value);
    setIsTimeRunning(true);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsTimeRunning(false);
      setWordCount(calculateWordCount(text));
    }
  }, [isTimeRunning, timeRemaining]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        onChange={handleChange}
        value={text}
        ref={textAreaRef}
        onClick={(e) => (!timeRemaining ? e.target.blur() : "")}
        disabled={!isTimeRunning}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button
        disabled={isTimeRunning}
        onClick={(e) => {
          if (e.target.innerHTML === "Start") {
            setIsTimeRunning(true);
            textAreaRef.current.disabled = false;
            textAreaRef.current.focus();
          } else {
            location.reload();
          }
        }}
      >
        {timeRemaining ? "Start" : "Replay"}
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
