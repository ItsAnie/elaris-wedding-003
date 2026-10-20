import { useEffect, useRef, useState } from "react";
import ring from "../assets/rings.png";
import groom from "../assets/groom.png";
import bride from "../assets/bride.png";
import reception from "../assets/reception.png";
import bg from "../assets/bg.png"
import we from "../assets/we.png"


export default function WeddingPlan({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Քանի պիקסել է բաժինը բարձրացել էկրանի վերևի մասի նկատմամբ
      const scrolled = windowHeight - rect.top;
      // Ընդհանուր հեռավորությունը, որը պետք է անցնի բաժինը (բաժնի բարձրություն + էկրանի բարձրություն)
      const total = rect.height + windowHeight;

      // Հաշվում ենք խիստ 0-ից 1 պրոգրեսը
      const progress = scrolled / total;

      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const steps = [
    {
      id: "fiance",
      title: data.plan.fiance.title,
      time: data.plan.fiance.time,
      address: data.plan.fiance.address,
      icon: groom,
      wrapperClass: "mr-auto text-left pl-4 md:pl-16",
      align: "items-start",
    },
    {
      id: "bride",
      title: data.plan.bride.title,
      time: data.plan.bride.time,
      address: data.plan.bride.address,
      icon: bride,
      wrapperClass: "ml-auto text-right pr-4 md:pr-16 mt-28",
      align: "items-end",
    },
    {
      id: "ceremony",
      title: data.ceremony.title,
      time: data.ceremony.time,
      address: data.ceremony.address,
      icon: ring,
      wrapperClass: "mr-auto text-left pl-4 md:pl-16",
      align: "items-start",
    },
    {
      id: "reception",
      title: data.reception.title,
      time: data.reception.time,
      address: data.reception.address,
      icon: reception,
      wrapperClass: "ml-auto text-right pr-4 md:pr-16",
      align: "items-end",
    },
  ];

  // Սրտիկը շարժվում է ուղիղ 0%-ից (ամենավերև) մինչև 100% (ամենաներքև)
  const pathRef = useRef(null);

  const [heartPosition, setHeartPosition] = useState({
    x: 180,
    y: 45,
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const point = path.getPointAtLength(scrollProgress * length);

    setHeartPosition({
      x: point.x,
      y: point.y,
    });
  }, [scrollProgress]);

  return (
    <section ref={sectionRef} className="relative px-6 pb-20 overflow-hidden bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      {/* Բաժնի վերնագիր */}
      <h2
        className={`mb-6 text-center font-heading text-[32px] transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {data.plan.title}
      </h2>

      <div className="relative mx-auto max-w-xl flex flex-col gap-24 py-10">
        
        {/* SVG կոր գիծը ֆոնին */}
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-0" viewBox="0 0 400 1850" fill="none" preserveAspectRatio="none">
            <path ref={pathRef} id="wedding-path" d="M 180 45 C 200 250, 340 300, 340 480 S 60 650, 60 850 S 340 1050, 340 1200 S 60 1400, 60 1550 S 200 1750, 200 1850" stroke="#e0caca" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" opacity="0.8"></path>
        </svg>

        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${(heartPosition.x / 400) * 100}%`,
            top: `${(heartPosition.y / 1850) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={we} className="w-15" />
        </div>

        {/* Քայլերի ցանկ */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`relative z-10 flex flex-col w-1/2 transition-all duration-1000 ease-out ${
              step.align
            } ${step.wrapperClass} ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 border border-[#e3dcd0] transition-transform duration-500 hover:scale-105">
              <img alt={step.title} src={step.icon} className="w-12 h-12 object-contain" />
            </div>

            <div className={`flex flex-col ${step.id === 'bride' || index % 2 === 1 ? 'items-end' : 'items-start'}`}>
              <h3 className="font-heading text-[22px]">
                {step.title}
              </h3>
              <p className="mt-1 font-serif text-lg">
                {step.time}
              </p>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(step.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full border border-[#493B2B] bg-white/50 px-4 py-1 font-armenian text-xs transition-all duration-300 hover:bg-[#555846] hover:text-white shadow-sm"
              >
                Ինչպես հասնել
              </a>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}