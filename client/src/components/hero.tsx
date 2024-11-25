"use client";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./navbar";
import Link from "next/link";
import getValidImageUrl from "@/utils/getValidImageUrl";

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
                > <img
                    src={`${getValidImageUrl(slide.Image.url)}`}
                    alt={slide.Title}
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                       'opacity-100'
                    }`}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: 'relative' 
                    }}
                  />
                  <div
                    className={`absolute  bg-black/60 top-0 left-0 w-full h-full flex px-8 md:px-20 transition-opacity duration-300`}
                    ref={ref}
                  >
                    <div className="flex px-2 md:px-4 gap-[20px] flex-col w-full mb-28  justify-end items-start ">
                      <h2 className="text-white text-[28px] leading-tight md:leading-0 md:text-[52px]">
                        <strong className="text-[#A8CF45] w-full font-semibold">
                          {slide.Title}
                        </strong>
                      </h2>
                      <p className="text-white md:w-[60%] w-full mt-[-19px]">
                        {slide.Description}
                      </p>
                      <Link href="/aboutus">
                        <button
                        className="px-10 button-86 font-medium">
                          About Us
                        </button>
                      </Link>
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