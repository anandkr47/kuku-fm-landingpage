"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import Card from "../Card/Card";

const Carousel = ({ slide }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 1250) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className={styles.carousel_container}>
      <h2>{slide.title}</h2>

      <div className={styles.carouselContainer}>
        {slide.shows ? (
          <>
            <Slider {...settings} style={{ height: "100%" }}>
              {slide.shows?.map((item, index) => (
                <div key={index} className={styles.slide}>
                  <Card item={item} key={index} />
                </div>
              ))}
            </Slider>
          </>
        ) : (
          <>
            <Slider {...settings} style={{ height: "100%" }}>
              {slide?.map((item, index) => (
                <div key={index} className={styles.slide}>
                  <Card item={item} key={index} />
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
