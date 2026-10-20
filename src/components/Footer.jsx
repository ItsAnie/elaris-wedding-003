import insta from "../assets/insta.png"

export default function Footer() {
  return (
    <footer className="bg-[#262626] gap-5 rounded-tl-[100px] text-white w-full flex flex-col items-center py-[20px]">
        <div className="flex justify-center items-center gap-[20px]">
            <div>
                <p>Փեսացու</p>
                <p>Հարսնացու</p>
            </div>
            <div className="w-[1px] h-[40px] bg-white"></div>
            <div className="flex flex-col">
                <a href="tel:044444444" className="cursor-pointer">044 44-44-44</a>
                <a href="tel:095959595" className="cursor-pointer">095 95-95-95</a>
            </div>
        </div>


        <div className="flex flex-col gap-2 font-armenian  text-[16px] uppercase max-w-[250px] font-normal tracking-[0.1em]">
            <h2 className="italic mt-[20px]">
                Պատրաստվել է սիրով՝
            </h2>
            <div className="flex items-center gap-2">
                <img src={insta} className="w-[28px]" />
                <a href="https://www.instagram.com/elaris_digi?mdxt=MXM4bzl6bm1za2ZoNg==" className="cursor-pointer underline">Elaris</a>-ի Կողմից
            </div>
        </div>
    </footer>
  );
}