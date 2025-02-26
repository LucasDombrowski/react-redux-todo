import { useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductGalleryProps {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, selectedIndex, setSelectedIndex }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);

  useGSAP(() => {
    gsap.from(galleryRef.current, { opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.out" });
  }, []);

  useEffect(()=>{
    if(swiperRef.current){
      swiperRef.current.swiper.slideTo(selectedIndex);
    }
  },[selectedIndex]);

  return (
    <div ref={galleryRef} className="md:w-1/2">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        className="w-full h-[400px] bg-gray-100 rounded-lg shadow-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Image ${index + 1}`} className="object-contain w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vignettes pour naviguer entre les images */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-full h-24 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden border-2 ${
              selectedIndex === index ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img src={image} alt={`Image ${index + 1}`} className="object-contain w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
