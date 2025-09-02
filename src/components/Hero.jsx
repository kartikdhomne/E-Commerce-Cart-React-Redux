import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    rtl: false,
    arrows: true,
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Slider {...settings}>
        <div>
          <img
            src="/hero-one.webp"
            alt="hero-one"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="/hero-two.webp"
            alt="hero-two"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="/hero-three.webp"
            alt="hero-three"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="/hero-four.webp"
            alt="hero-four"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="/hero-five.webp"
            alt="hero-five"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="/hero-six.webp"
            alt="hero-six"
            className="w-full h-screen object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Hero;
