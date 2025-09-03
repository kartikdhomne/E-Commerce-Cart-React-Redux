import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // used to restart CSS animation

  const autoplayDuration = 3000;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: autoplayDuration,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    rtl: false,
    arrows: true,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
      setProgressKey((prev) => prev + 1); // reset progress animation
    },
  };

  const slides = [
    {
      src: "/hero-one.webp",
      alt: "hero-one",
      heading: "Big Deals on Top Brands",
    },
    {
      src: "/hero-two.webp",
      alt: "hero-two",
      heading: "Upgrade Your Lifestyle",
    },
    {
      src: "/hero-three.webp",
      alt: "hero-three",
      heading: "Electronics at Best Prices",
    },
    {
      src: "/hero-four.webp",
      alt: "hero-four",
      heading: "Latest Fashion, Just Dropped",
    },
    {
      src: "/hero-five.webp",
      alt: "hero-five",
      heading: "Home Essentials for Every Room",
    },
    {
      src: "/hero-six.webp",
      alt: "hero-six",
      heading: "Explore, Shop, Repeat",
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
              className="w-full h-screen object-cover"
            />

            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10">
              <h1 className="text-white text-4xl md:text-7xl font-bold drop-shadow-lg max-w-[80%] leading-[80px]">
                {slide.heading}
              </h1>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-[5]" />
          </div>
        ))}
      </Slider>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 z-20">
        <div
          key={progressKey} // forces re-animation
          className="h-full bg-white animate-progress"
          style={{
            animationDuration: `${autoplayDuration}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
