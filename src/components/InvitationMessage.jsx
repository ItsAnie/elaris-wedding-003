import { useEffect, useRef, useState } from "react";
import engangement from "../assets/engangement.jpg";
import bg from "../assets/bg.png";
import decoration from "../assets/decoration.png";

const InvitationMessage = ({ data }) => {
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
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClass = (delay) =>
    `transition-all duration-1000 ease-out ${
      isVisible
        ? "translate-y-0 opacity-100"
        : "translate-y-10 opacity-0"
    } ${delay}`;

  return (
    <div
      className="bg-cover bg-no-repeat pt-10"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img
        src={decoration}
        alt=""
        className="mx-auto mb-8"
      />

      <div className="mx-auto flex w-[250px] flex-col items-center gap-[20px] rounded-lg bg-white p-[20px]">
        <img
          alt="Wedding image"
          src={engangement}
          className="rounded-lg"
        />

        <p className="max-w-[200px] text-center font-armenian">
          Եվ արդ մնում են այս երեքը՝ հավատը, հույսը, սերը, և սրանցից
          մեծագույնը սերն է։
          <br />
          <br />
          <b className="font-couple-names">
            Ա․ Կորնթացիներին 13:13
          </b>
        </p>
      </div>

      <section
        ref={sectionRef}
        className="mt-10 px-6 text-center"
      >
        <h2
          className={`mb-6 text-[32px] font-heading ${animationClass(
            "delay-100"
          )}`}
        >
          Սիրելի՛ հյուրեր
        </h2>

        <p
          className={`mx-auto max-w-xl text-sm font-armenian leading-8 ${animationClass(
            "delay-300"
          )}`}
        >
          Սիրով հրավիրում ենք ձեզ կիսելու մեզ հետ մեր կյանքի ամենակարևոր
          ու գեղեցիկ օրը։ Եկե՛ք միասին տոնելու մեր սիրո պատմության նոր
          սկիզբը և այս հիշարժան օրը դարձնելու առավել ջերմ ու անմոռանալի։
          <br />
          <b>Պահպանեք օրը՝ {data.date}</b>
        </p>

        <p
          className={`mt-8 text-md font-light font-couple-names ${animationClass(
            "delay-500"
          )}`}
        >
          Սիրով՝ Էլեն & Նարեկ
        </p>
      </section>
    </div>
  );
};

export default InvitationMessage;
