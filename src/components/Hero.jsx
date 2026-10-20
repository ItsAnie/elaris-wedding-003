import { useEffect, useState } from "react";
import couple from "../assets/couple.jpg";
import Countdown from "./Countdown";

export default function Hero({ data, startAnimation = false }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!startAnimation) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [startAnimation]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <img
        src={couple}
        alt="Wedding couple"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover object-[center_40%] blur-[1px] transition-transform duration-[12000ms] ease-out motion-reduce:transition-none ${
          show ? "scale-[1.06]" : "scale-100"
        }`}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-8 text-center text-white sm:py-16">
        {/* Couple names */}
        <div className="mb-auto">
          <h1
            className={`font-couple-names text-6xl drop-shadow-md transition-all duration-1000 ease-out delay-700 sm:text-7xl md:text-8xl ${
              show
                ? "translate-y-0 opacity-100"
                : "-translate-y-16 opacity-0"
            }`}
          >
            {data.bride}
          </h1>

          <div
            className={`mt-6 font-couple-names text-4xl italic transition-all duration-700 ease-out delay-700 ${
              show ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            &
          </div>

          <h1
            className={`font-couple-names text-6xl drop-shadow-md transition-all duration-1000 ease-out delay-700 sm:text-7xl md:text-8xl ${
              show
                ? "translate-y-0 opacity-100"
                : "-translate-y-16 opacity-0"
            }`}
          >
            {data.groom}
          </h1>
        </div>

        {/* Countdown */}
        <div
          className={`relative z-10 w-full transform transition-all duration-1000 ease-out delay-700 ${
            show
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          <Countdown targetDate={data.dateISO} />
        </div>
      </div>
    </section>
  );
}