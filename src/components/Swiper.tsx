"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import "./Banner.css";
export default function SwiperComponent({ imgList }: { imgList: string[] }) {
    return (
        <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwipe rounded-xl"
        >
            {imgList.map((img: string, i: number) => {
                return (
                    <SwiperSlide key={i}>
                        <Image
                            priority
                            loader={() => img}
                            unoptimized={true}
                            src={img}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
