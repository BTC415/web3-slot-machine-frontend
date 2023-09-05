import { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.muted = true;
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);
  console.log("music------------->")

  return null;
};

export default BackgroundMusic;