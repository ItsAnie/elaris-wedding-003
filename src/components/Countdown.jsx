import { useEffect, useRef, useState } from "react";

function getTimeLeft(targetDate) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const values = [
    { label: "Օր", value: time.days },
    { label: "Ժամ", value: time.hours },
    { label: "Րոպե", value: time.minutes },
    { label: "Վայրկյան", value: time.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-cover bg-no-repeat text-white"
    >
      <div
        className={`relative mx-auto w-full sm:px-10 sm:py-20 transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        {/* Նուրբ դեկորատիվ անկյուններ */}
        {/* <span className="absolute left-2 top-2 h-5 w-5 border-l border-t border-[#a18a68]" />
        <span className="absolute right-2 top-2 h-5 w-5 border-r border-t border-[#a18a68]" />
        <span className="absolute bottom-2 left-2 h-5 w-5 border-b border-l border-[#a18a68]" />
        <span className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-[#a18a68]" /> */}

        <h2 className="text-center mb-6 font-heading text-3xl font-normal tracking-wide sm:text-3xl md:text-4xl">
          Հարսանիքին մնաց
        </h2>

        {/* Հետհաշվարկ */}
        <div className="grid grid-cols-4">
          {values.map(({ label, value }, index) => (
            <div
              key={label}
              className={`flex min-w-0 flex-col items-center justify-center border-r border-white/40 px-1 last:border-r-0 transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 120}ms` }}
            >
              <span className="font-heading text-2xl font-normal tabular-nums sm:text-4xl md:text-5xl">
                {String(value).padStart(2, "0")}
              </span>

              <span className="mt-3 font-heading text-[9px] tracking-wide sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}