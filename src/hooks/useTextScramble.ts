import { useState, useEffect } from 'react';

export function useTextScramble(text: string, isActive: boolean, duration: number = 1200) {
  const [displayText, setDisplayText] = useState(text);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!isActive || hasRun) return;
    setHasRun(true);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const totalFrames = 20;
    const frameDelay = duration / totalFrames;
    let currentFrame = 0;

    const interval = setInterval(() => {
      if (currentFrame === totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        return;
      }

      let output = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else {
          const revealThreshold = (i / text.length) * totalFrames;
          if (currentFrame >= revealThreshold) {
            output += text[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }
      }

      setDisplayText(output);
      currentFrame += 1;
    }, frameDelay);

    return () => clearInterval(interval);
  }, [text, isActive, duration, hasRun]);

  return displayText;
}
