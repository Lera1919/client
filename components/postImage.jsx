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
        borderRadius: '12px',
        border: '1px solid #000',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        objectPosition: 'center',
    }

    return (
        <div className=''>
            <Swiper
            modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                grabCursor={true}
                navigation
               
                pagination={{clickable:false}}
                className=""
                // cssMode={true}
               
            >
                {images.map((url, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <Image src={url} loader={imageLoader}  width={200} height={200} alt='Post'/>                        
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
} 