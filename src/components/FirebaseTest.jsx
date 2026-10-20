import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const weddingData = {
  bride: "Էլեն",
  groom: "Նարեկ",

  date: "20.05.2027",
  dateISO: "2027-05-20T17:00:00",

  intro: "Մեր սիրո ամենագեղեցիկ սկիզբը",

  ceremony: {
    time: "17:00",
    title: "Պսակադրություն",
    venue: "Սուրբ Հովհաննես Եկեղեցի",
    address: "Երևան, Հայաստան",
    mapUrl: "https://maps.app.goo.gl/X3RsTSnoDTjpwWi48",
},

 reception: {
  time: "19:00",
  title: "Հանդիսություն",
  venue: "The Garden",
  address: "Երևան, Հայաստան",
  mapUrl: "https://maps.app.goo.gl/gmiwBNgoWiADQFnJA",
},

plan: {
  title: "Ծրագիր",

  fiance: {
    title: "Փեսայի տուն",
    time: "14:00",
    address: "Երևան, Արամի 25",
  },

  bride: {
    title: "Հարսի տուն",
    time: "15:30",
    address: "Երևան, Մաշտոցի 40",
  },
},

  mapUrl: "https://maps.google.com",

  rsvpDeadline: "10.05.2027",
};

export default function FirebaseTest() {
  const uploadWedding = async () => {
    try {
      await setDoc(
        doc(db, "weddings", "wedding_003"),
        weddingData
      );

      alert("Wedding data-ն ուղարկվեց Firestore");
    } catch (error) {
      console.error(error);
      alert("Սխալ՝ " + error.message);
    }
  };

  return (
    <button
      onClick={uploadWedding}
      className="rounded-lg bg-[#555846] px-5 py-3 text-white"
    >
      Upload Wedding Data
    </button>
  );
}