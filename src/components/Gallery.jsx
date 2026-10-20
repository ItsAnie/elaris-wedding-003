
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Gallery.css";
import bg from "../assets/bg.png"

import photo1 from "../assets/gallery/photo1.jpg";
import photo2 from "../assets/gallery/photo2.jpg";
import photo3 from "../assets/gallery/photo3.jpg";

const photos = [photo1, photo2, photo3];

export default function Gallery() {
  return (
    <section className="bg-no-repeat bg-cover px-6 py-20 sm:px-8 sm:py-24" style={{ backgroundImage: `url(${bg})` }}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-[32px] font-heading text-center">Մենք</h2>
        <div className="w-18 h-[1px] mx-auto bg-black/40 mb-10 mt-2"></div>

        <div className="elaris-gallery relative">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            slidesPerView={1}
            spaceBetween={0}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            loop
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo}>
                <div>
                  <div className="pb-2">
                    <img
                      src={photo}
                      alt={`Հարսանեկան լուսանկար ${index + 1}`}
                      className="block aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
