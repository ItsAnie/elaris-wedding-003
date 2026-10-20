
import { createContext, useContext } from "react";

export const MusicContext = createContext(null);

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic-ը պետք է օգտագործվի MusicContext-ի ներսում");
  }

  return context;
}
