import bg from "../assets/bg.png"
import { useEffect, useMemo, useRef, useState } from "react";
import heart from "../assets/heart.png";

const weekDays = ["Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ", "Կիր"];

const armenianMonths = [
  "Հունվար",
  "Փետրվար",
  "Մարտ",
  "Ապրիլ",
  "Մայիս",
  "Հունիս",
  "Հուլիս",
  "Օգոստոս",
  "Սեպտեմբեր",
  "Հոկտեմբեր",
  "Նոյեմբեր",
  "Դեկտեմբեր",
];

export default function WeddingDay({ date }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const calendar = useMemo(() => {
    const weddingDate = new Date(date);

    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    const weddingDay = weddingDate.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return {
      month: armenianMonths[month],
      year,
      weddingDay,
      days,
    };
  }, [date]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden"
    >
      {/* Museum-style calendar */}
      <section className="px-6 pb-20 sm:px-10 sm:py-24 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>
        <div
          className={`mx-auto max-w-md transition-all duration-[1400ms] ease-out motion-reduce:transition-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >

              <div className="text-center">
                <h2 className="font-heading text-[32px] font-normal sm:text-5xl">
                  {calendar.month}
                </h2>

              </div>

              <div className="my-7 h-px bg-[#262626]/70" />

              {/* Weekdays */}
              <div className="grid grid-cols-7 text-center">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className={`py-2 font-heading text-xl transition-all duration-700 ease-out sm:text-xs ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${200 + index * 70}ms`,
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-y-3 text-center sm:gap-y-4">
                {calendar.days.map((day, index) => {
                  const isWeddingDay = day === calendar.weddingDay;

                  return (
                    <div
                      key={index}
                      className={`relative flex h-9 items-center justify-center transition-all duration-700 ease-out motion-reduce:transition-none sm:h-10 ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${450 + index * 22}ms`,
                      }}
                    >
                      {day && isWeddingDay && (
                        <span
                          className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-[1200ms] ease-out motion-reduce:transition-none ${
                            isVisible
                              ? "scale-100 opacity-100"
                              : "scale-75 opacity-0"
                          } ${isVisible ? "animate-heart-beat" : ""}`}
                          style={{
                            backgroundImage: `url(${heart})`,
                            transitionDelay: "800ms",
                          }}
                        />
                      )}

                      {day && (
                        <span
                          className={`relative z-10 font-serif text-lg sm:text-xl ${
                            isWeddingDay
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#262626]" />
                <span className="font-serif text-[10px] italic tracking-widest text-[#262626]">
                  Together, forever
                </span>
                <span className="h-px w-8 bg-[#262626]" />
              </div>  
        </div>
      </section>
    </div>
  );
}
