import engangement from "../assets/engangement.jpg"
import bg from "../assets/bg.png"
import decoration from "../assets/decoration.png"


const InvitationMessage = ({data}) => {
  return (
    <div className="bg-cover py-20 bg-no-repeat" style={{ backgroundImage: `url(${bg})` }} >
      <img src={decoration} className="mx-auto mb-14" />
      <div className="w-[250px] mx-auto bg-white flex flex-col gap-[20px] items-center p-[20px] rounded-lg">
            <img alt="Wedding image" src={engangement} className="rounded-lg" />
            <p className="max-w-[200px] text-center font-armenian">
              Եվ արդ մնում են այս երեքը՝ հավատը, հույսը, սերը, և սրանցից մեծագույնը սերն է։
              <br />
              <br />
              <b className="font-couple-names">Ա․ Կորնթացիներին 13:13</b>
            </p>
        </div>
        <h1 className="font-heading text-center text-2xl drop-shadow-md transition-all duration-1000 ease-out delay-300 sm:text-7xl md:text-8xl">
          {data.date}
        </h1>
    <section className="text-center px-6 mt-15">
        
      <h2 className="mb-6 text-[24px] font-heading uppercase tracking-[0.25em]">
        Սիրելի՛ հյուրեր
      </h2>

      <p className="mx-auto max-w-xl text-base font-armenian leading-8">
        Սիրով հրավիրում ենք ձեզ կիսելու մեզ հետ մեր կյանքի ամենակարևոր ու գեղեցիկ օրը։ Եկե՛ք միասին տոնելու մեր սիրո պատմության նոր սկիզբը և այս հիշարժան օրը դարձնելու առավել ջերմ ու անմոռանալի։ 
      </p>

      <p className="mt-8 text-xl font-light font-couple-names">
        Սիրով՝ Էլեն & Նարեկ
      </p>
    </section>
</div>
  );
};

export default InvitationMessage;