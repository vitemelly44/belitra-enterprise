import { useState, useEffect } from 'react';

interface SlotNumberProps {
  value: number;
  inView: boolean;
}

export default function SlotNumber({ value, inView }: SlotNumberProps) {
  const [display, setDisplay] = useState('0');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [shufflesRemaining, setShufflesRemaining] = useState(0);

  useEffect(() => {
    if (inView && !hasPlayed) {
      setHasPlayed(true);
      setShufflesRemaining(15);
    }
  }, [inView, hasPlayed]);

  useEffect(() => {
    if (shufflesRemaining > 0) {
      const timeout = setTimeout(() => {
        setDisplay(`${Math.floor(Math.random() * (value * 1.5))}`);
        setShufflesRemaining((prev) => prev - 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else if (shufflesRemaining === 0 && hasPlayed) {
      setDisplay(`${value}`);
    }
  }, [shufflesRemaining, hasPlayed, value]);

  return (
    <span className="tabular-nums inline-block min-w-[1.5ch]">
      {display}
    </span>
  );
}
