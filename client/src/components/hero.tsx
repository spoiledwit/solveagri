"use client";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./navbar";

interface SliderData {
  data: Array<{
    id: number;
    Description: string;
    Title: string;
    Image: {
      url: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
    };
  }>;
}

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [sliderData, setSliderData] = useState<SliderData | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const fetchSliderData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders?populate=*`
      );
      const data = await res.json();
      setSliderData(data);
    } catch (error) {
      console.error("Error fetching slider data:", error);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPos(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageLoad = (slideId: number) => {
    //@ts-ignore
    setLoadedImages(prev => new Set([...prev, slideId]));
  };

  if (inView) {
    controls.start("visible");
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const zoomScale = Math.max(1 - scrollPos / 1000, 0.8);

  const LoadingSkeleton = () => (
    <div className="animate-pulse w-full h-full bg-gray-200 rounded-2xl">
      <div className="h-full w-full flex items-center justify-center">
        <div className="space-y-8 w-full px-8 md:px-20">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-10 bg-gray-300 rounded w-36"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="fixed w-full" style={{ zIndex: "999" }}>
        <Navbar />
      </div>

      <div className="flex w-full items-center h-screen justify-center bg-[#A8CF45]">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            transform: `scale(${zoomScale})`,
            transition: "transform 0.2s ease-out",
            width: "96vw",
            height: "96vh",
          }}
        >
          {sliderData?.data && (
            <Slider {...settings}>
              {sliderData.data.map((slide, i) => (
                <div
                  key={i}
                  className="flex w-full h-screen justify-center items-center relative"
                >
                  {!loadedImages.has(slide.id) && <LoadingSkeleton />}
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${slide.Image.url}`}
                    alt={slide.Title}
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                      loadedImages.has(slide.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: loadedImages.has(slide.id) ? 'relative' : 'absolute',
                    }}
                    onLoad={() => handleImageLoad(slide.id)}
                  />
                  <div
                    className={`absolute bg-black bg-opacity-30 top-0 left-0 w-full h-full flex px-8 md:px-20 transition-opacity duration-300 ${
                      loadedImages.has(slide.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    ref={ref}
                  >
                    <div className="flex px-2 md:px-4 gap-[20px] flex-col w-full mt-20 justify-center items-start">
                      <h2 className="text-white text-[16px] md:text-[36px]">
                        <strong className="text-[#A8CF45] w-full font-semibold">
                          {slide.Title}
                        </strong>
                      </h2>
                      <p className="text-white md:w-[60%] w-full">
                        {slide.Description}
                      </p>
                      <a href="/projects">
                        <button
                       
                        className="px-10 button-86 font-medium">
                          View our Projects
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

          <div className="absolute bottom-10 w-full flex animate-bounce justify-center items-center">
            <BsChevronCompactDown className="text-white text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;