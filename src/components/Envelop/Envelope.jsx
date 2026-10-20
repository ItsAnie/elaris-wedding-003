
import { useRef, useState } from "react";
import "./Envelope.css";
import envelope_button from "../../assets/envelope_button.png";
import weddingMusic from "../../assets/wedding-music.mp3";
import { MusicContext } from "../MusicContext";

export default function Envelope({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Երաժշտությունը չհաջողվեց միացնել:", error);
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleOpen = async () => {
    setIsOpen(true);
    await playMusic();
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, toggleMusic }}
    >
      <div className={`envelop-page ${isOpen ? "opened" : ""}`}>
        <audio
          ref={audioRef}
          src={weddingMusic}
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className={`envelop-hero ${isOpen ? "hero-opened" : ""}`}>
          {typeof children === "function"
            ? children({ isOpen })
            : children}
        </div>

        {!isOpen && (
          <img
            src={envelope_button}
            alt="Open wedding invitation"
            className="envelop-open-button fixed z-[120] top-[57%] left-[50%] cursor-pointer w-36"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
          />
        )}

        <div className="envelop-cover fixed inset-0 w-screen h-screen overflow-hidden bg-black/5 flex items-center justify-center z-[100]">
          <div className="panel-top absolute top-0 left-0 w-full h-[60%] z-30 shadow-[0_15px_60px_rgba(0,0,0,0.1)] bg-[#e8e1d5]" />

          <div className="panel-bottom absolute bottom-0 left-0 w-full h-[90%] shadow-inner bg-[#262626]/60" />
        </div>
      </div>
    </MusicContext.Provider>
  );
}
