import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const autoplayDuration = 3000;
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false, // remove dots
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: autoplayDuration,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: true,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
      setProgress(0); // reset progress on slide change
    },
  };

  const slides = [
    {
      src: "/hero-one.webp",
      srcMobile: "/hero-one-mobile.webp",
      alt: "hero-one",
      heading: "Big Deals on Top Brands",
    },
    {
      src: "/hero-two.webp",
      srcMobile: "/hero-two-mobile.webp",
      alt: "hero-two",
      heading: "Explore, Shop, Repeat",
    },
    {
      src: "/hero-three.webp",
      srcMobile: "/hero-three-mobile.webp",
      alt: "hero-three",
      heading: "Electronics at Best Prices",
    },
    {
      src: "/hero-four.webp",
      srcMobile: "/hero-four-mobile.webp",
      alt: "hero-four",
      heading: "Latest Fashion, Just Dropped",
    },
    {
      src: "/hero-five.webp",
      srcMobile: "/hero-five-mobile.webp",
      alt: "hero-five",
      heading: "Home Essentials for Every Room",
    },
  ];

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (autoplayDuration / 100); // update every 100ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full mt-20 md:mt-12">
            {/* Desktop Image */}
            <div className="md:block hidden">
              <img
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>

            {/* Mobile Image */}
            <div className="block md:hidden">
              <img
                src={slide.srcMobile}
                alt={slide.alt}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-[5]" />

            {/* Text Overlay */}
            <div className="absolute top-1/2 left-16 lg:left-20 transform md:-translate-y-1/2 z-10">
              <h1 className="text-white text-3xl md:text-[96px] font-bold drop-shadow-lg max-w-[80%] md:max-w-[61%] leading-snug md:leading-[112px] text-center ml-0">
                {slide.heading}
              </h1>
            </div>
          </div>
        ))}
      </Slider>

      {/* Progress bar container */}
      <div className="mt-6 left-0 w-full flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="h-2 w-12 bg-gray-300 overflow-hidden rounded"
          >
            <div
              className="h-full bg-black"
              style={{
                width: idx === currentSlide ? "100%" : "0%",
                transition:
                  idx === currentSlide
                    ? `width ${autoplayDuration}ms linear`
                    : "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
