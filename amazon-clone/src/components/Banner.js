import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Banner() {
    return (
        <>
        <div className="mx-auto relative lg:hidden" style={{width:"98%"}}>
             <Carousel autoPlay infiniteLoop interval={4000} showStatus={false} showIndicators={false} showThumbs={false}>
                <div>
                    <img src="https://m.media-amazon.com/images/I/61t5yjbwJDL._SX1500_.jpg" alt="Banner 1" />    
                </div>
                <div>
                    <img  src="https://m.media-amazon.com/images/I/61Z712jiAaL._SX1500_.jpg" alt="Banner 2" />
                </div>             
                <div>
                    <img  src="https://m.media-amazon.com/images/I/61Y72NKvxQL._SX1500_.jpg" alt="Banner 3" />  
                </div>
            </Carousel>           
            <div className="block lg:hidden h-1/3 w-full absolute bg-gradient-to-t  from-amazon_gray to-transparent bottom-0"></div>
        </div>
        <div className="lg:visible mx-auto relative " style={{width:"98%"}}>
            <Carousel autoPlay infiniteLoop interval={4000} showStatus={false} showIndicators={false} showThumbs={false}>
                <div className="hidden lg:block  ">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/SBD/Electronics/D24874416_IN_CEPC_Small-business-day_Electronics-graphics_1242x450_new._CB665730751_SY300_FMwebp_.jpg" alt="Banner 1" />
                </div>
                <div className="hidden lg:block  ">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/cross-site/SBD21/OHL._CB665603091_SY300_FMwebp_.jpg" alt="Banner 2" />
                </div>
                <div className=" hidden lg:block ">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/cross-site/Mobile-category-Hero_1242X450px_new._CB665844751_SY300_FMwebp_.jpg" alt="Banner 3" />
                </div>
            </Carousel>
            <div className="block lg:hidden h-1/3 w-full absolute bg-gradient-to-t  from-amazon_gray to-transparent bottom-0"></div>
        </div>
     </>
    )
}

export default Banner

