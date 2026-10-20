import { useState } from "react";
import shoot from "../assets/shoot.jpg";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import WeddingDay from "../components/WeddingDay";
// import Ceremony from "../components/Ceremony";
// import Reception from "../components/Reception";
import DressCode from "../components/DressCode";
import WeddingPlan from "../components/WeddingPlan";
import InvitationMessage from "../components/InvitationMessage";
import RSVP from "../components/RSVP";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import MusicPlayer from "../components/MusicPlayer";
import bg from "../assets/bg.png"


export default function Invitation({ data, weddingId, isOpen }) {
  const [ceremonyDone, setCeremonyDone] = useState(false);

  return (
    <main className="min-h-screen bg-[#deddd5] px-0 sm:px-5 md:px-8 lg:px-12">
      <div className="w-full overflow-hidden bg-[#f5f1e9] wedding-card sm:mx-auto sm:max-w-2xl sm:rounded-[28px] md:max-w-3xl lg:max-w-4xl">

        <Hero data={data} />
        <InvitationMessage data={data} />
        <Gallery />
        <WeddingDay date={data.dateISO} />
        <WeddingPlan data={data} />

        {/* Այստեղ պահիր քո մնացած բաժինները */}
        <div className="px-6 py-20 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }} >
          <img src={shoot} />
        </div>

        <RSVP weddingId={weddingId} deadline={data.rsvpDeadline} />
        <DressCode />
        <Footer />
      </div>

      {isOpen && <MusicPlayer />}
    </main>
  );
}
