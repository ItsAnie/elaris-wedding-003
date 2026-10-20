import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getWeddingData(weddingId) {
  const weddingRef = doc(db, "weddings", weddingId);

  const snapshot = await getDoc(weddingRef);

  if (!snapshot.exists()) {
    throw new Error("Wedding data not found");
  }

  return snapshot.data();
}