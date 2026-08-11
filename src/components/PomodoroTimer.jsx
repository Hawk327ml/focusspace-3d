import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const FOCUS_SECONDS = 25 * 60;

function PomodoroTimer({ isFeatured = false }) {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsRunning(false);
          return 0;
        }
        return currentSeconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const timerLabel = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const resetTimer = () => {
    setSecondsLeft(FOCUS_SECONDS);
    setIsRunning(false);
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isFeatured ? 'border-info/50 bg-info/10' : 'border-base-300 bg-base-200/80'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/50">
            Pomodoro
          </p>
          <strong className="mt-1 block font-display text-4xl font-bold tabular-nums text-primary">
            {timerLabel}
          </strong>
        </div>
        <span className={`badge ${isRunning ? 'badge-success' : 'badge-outline'}`}>
          {isRunning ? 'Running' : 'Ready'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsRunning((currentValue) => !currentValue)}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" className="btn btn-outline border-base-300" onClick={resetTimer}>
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
