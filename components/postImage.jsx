'use client';
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


export default function PostImage({images}) {

    const imageLoader = ({src, width, quality}) => {
        return `${src}`
    }

    const imageStyle = {
        // borderRadius: '50%',
        // border: '1px solid #000',
        width: '100%',

        // height: 'auto',
        objectFit: 'cover',
        objectPosition: 'center',
    }

    return (
        <div className='w-full h-full'>
            <Swiper
            modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                // grabCursor={true}
                // navigation
               
                pagination={{clickable:false}}
                className="w-full h-full"
                // cssMode={true}
               
            >
                {images.map((url, index) => (
                    <SwiperSlide key={index} virtualIndex={index} className='max-w-[460px] max-h-[460px]'>
                        <Image src={url} loader={imageLoader} style={imageStyle} width={512} height={512} alt='Post'/>                        
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
} 