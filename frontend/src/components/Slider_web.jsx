import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
0;
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Optional: For navigation buttons
import "swiper/css/pagination"; // Optional: For pagination dots
import { Pagination, Autoplay } from "swiper/modules"; // Import Swiper modules
import axios from "axios";
const Slider_web = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/dynamic/allSlider"
      );
      if (Array.isArray(response.data.data)) {
        setSliderData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching sliders:", error);
    }
  };
  return (
    <div className="w-full relative -top-20 ">
      <Swiper
        modules={[Pagination, Autoplay]} // Enable Swiper features
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }} // Enable pagination dots
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true} // Infinite loop
      >
        {sliderData.length > 0 ? (
          sliderData.map((item, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[450px] object-cover "
              />
              <div className="absolute z-10 inset-1/2 w-full transform -translate-x-1/2 -translate-y-1/2">
                <div>
                  <h2 className="text-center text-3xl">{item.heading}</h2>
                  <p className="text-center">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <>
            <SwiperSlide>
              <img
                src=""
                alt="Default Slide 1"
                className="w-full h-96 object-cover "
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src=""
                alt="Default Slide 2"
                className="w-full h-96 object-cover "
              />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default Slider_web;
