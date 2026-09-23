import './BackGroundMusic.css';
import { useRef, useState } from "react";
import themeSong from "../../assets/audio/theme.wav";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleMusic() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="music-control">
      <audio ref={audioRef} src={themeSong} loop onLoadedMetadata={() => {
        audioRef.current.volume = 0.3;
      }} />
      <button onClick={toggleMusic}>
        {isPlaying ? "🔊 Pausar música" : "🔈 Reproducir música"}
      </button>
    </div>
  );
}