
import React, { useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startTimer = () =>{
    if(!running){
      setRunning(true);
      timerRef.current = setInterval(() =>{
        setTime(prev => prev+1);
      }, 10);
    }
  };

  const stopTimer = () =>{
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const recordlap = () =>{
    setLaps(prev => [...prev,time]);
  };

  const resetTimer = () =>{
    stopTimer();
    setTime(0);
    setLaps([]);
  }

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (centiseconds) =>{
    const minutes = Math.floor(centiseconds/6000);
    const seconds = Math.floor((centiseconds%6000)/100);
    const cs = centiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(cs).padStart(2, '0')}`;
  };

  return (
    <div>
        <p>{formatTime(time)}</p>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordlap }>Lap</button>
        <button onClick={resetTimer}>Reset</button>

        <ul>
          {laps.map(lap => (
            <li>{formatTime(lap)}</li>
          ))}
        </ul>
    </div>
  )
}

export default App
