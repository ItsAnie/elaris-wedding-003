
import { createPortal } from "react-dom";
import music from "../assets/music.png";
import { useMusic } from "./MusicContext";

export default function MusicPlayer() {
  const { isPlaying, toggleMusic } = useMusic();

  return createPortal(
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={
        isPlaying
          ? "Անջատել երաժշտությունը"
          : "Միացնել երաժշտությունը"
      }
      title={
        isPlaying
          ? "Անջատել երաժշտությունը"
          : "Միացնել երաժշտությունը"
      }
      className="fixed right-0 top-1/2 z-[99999]
        flex -translate-y-1/2
        items-center justify-center
        rounded-l-xl bg-black/50 text-[#f5f1e9]
        backdrop-blur-sm transition-colors duration-300
        hover:bg-black/70 gap-2 p-2"
    >
      <h2 className="font-couple-names text-xl pb-2"> Perfect</h2>
      <img src={music} className="w-6 rotate-[1.5deg]" />
    </button>,
    document.body
  );
}
