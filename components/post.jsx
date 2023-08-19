import Image from 'next/image'
import PostImage from './postImage'


// import moment from "moment/min/moment-with-locales";
// import 'moment/locale/ru'


export default function Post({post}) {

    const postCreatedAt = new Date(post.createdAt);
    const postTimestamp = postCreatedAt.getTime();
    const timeNow = new Date().getTime();      

    const diff = (timeNow - postTimestamp)/1000;           
    //  в сек

    let resultTimeString = '';
    if (diff < 60) {
        resultTimeString = 'Только что'
    }else if (diff >= 60 && diff < 3600) {
    resultTimeString = `${Math.round(diff / 60)} мин. назад`
    }else if (diff >= 3600 && diff < 86400) {
        resultTimeString = `${Math.round(diff / 3600)} ч. назад`
    }else if (diff >= 86400 && diff < 259200) {
        let temp = Math.round(diff / 86400)
        resultTimeString = temp === 1 ?  `${temp} день назад` : `${temp} дня назад`;
    }else{
        let month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        resultTimeString = `${postCreatedAt.getDate()} ${month[postCreatedAt.getDate()]} ${postCreatedAt.getFullYear()} ${postCreatedAt.getHours()}:${postCreatedAt.getMinutes()}`;
    }  
    
    
    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #b1afd',     

        // height: 'auto',
        objectFit: 'cover',
        objectPosition: 'center',
    }


   const imageLoader = ({src, width, quality}) => {
    return `${src}`
   }
  
    return (
        <div className='w-full h-full'>
           <div className='h=4/5 overflow-hidden'>
            
                <PostImage images={post.images}/>
            </div>

            <div className='flex items-center justify-between mt-4'>
                <Image src={'post.user.avatar'} loader={imageLoader} style={imageStyle} width={42} height={42} alt='Avatar'/>
                <span>{post.user.firstName}{post.user.lastName}</span>
           </div>
           
           
            <span>{resultTimeString}</span>
        </div>
        
    )
}