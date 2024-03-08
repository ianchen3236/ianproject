/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

export default function CourseCarousel() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/18592820/pexels-photo-18592820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/210660/pexels-photo-210660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          padding-top: 45%; /* 16:9 Aspect Ratio */
          overflow: hidden;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
