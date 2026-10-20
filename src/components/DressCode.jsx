import bg from "../assets/bg.png"
import color1 from "../assets/code1.jpg"
import color2 from "../assets/code2.jpg"
import color3 from "../assets/code3.jpg"

export default function DressCode() {
  return (
    <section className="bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>

      <div className="px-6 pb-20 sm:px-12 sm:py-16 flex flex-col justify-center items-center">

        <h2 className="font-heading text-[32px]">
          Dress Code
        </h2>

        <p className="mx-auto mt-6 max-w-md leading-6 text-center">
          Մեզ համար ամենակարևորը ձեր ներկայությունն է։ Իսկ հագուստի 
          երանգն ընտրելիս կարող եք ոգեշնչվել մեր օրվա գույներով։
        </p> 

            <div className="flex gap-[25px] mt-[48px]">
              <img src={color1} className="rounded-full w-[50px] h-[50px]" />
              <img src={color2} className="rounded-full w-[50px] h-[50px]" />
              <img src={color3} className="rounded-full w-[50px] h-[50px]" />
            </div>

      </div>

    </section>
  );
}