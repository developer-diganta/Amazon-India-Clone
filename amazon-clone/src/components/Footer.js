import { Link } from "react-router-dom";


function Footer() {
    return(
            <>
                <div className="  w-full flex  bg-amazon_footer-light h-11 text-sm text-white  font-medium">
                    <span className="my-auto mx-auto"><a href="#">Back to top</a></span> 
                </div>
                <div className="xl:hidden w-full pt-24 h-max bg-amazon_blue-light ">
                    <div className="grid grid-cols-4 justify-items-center ml-8 mr-12">
                        <div className=" leading-6 p-1	">
                            <div className="text-md mb-2 text-white font-semibold">
                                Get to Know Us
                            </div>
                            <ul className="list-none text-sm text-white">
                                <li className="hover:underline"><Link to="/" >About Us</Link></li>
                                <li className="hover:underline"><Link to="/">Careers</Link></li>
                                <li className="hover:underline"><Link to="/">Press Releases</Link></li>
                                <li className="hover:underline"><Link to="/">Amazon Cares</Link></li>
                                <li className="hover:underline"><Link to="/">Gift a Smile</Link></li>
                            </ul>
                        </div>
                        <div className=" leading-6 p-1	">
                            <div className="text-md mb-2 text-white  font-semibold">
                                Connect with Us 
                            </div>
                            <ul className="list-none text-white text-sm">
                                <li className="hover:underline"><Link to="/" >Facebook</Link></li>
                                <li className="hover:underline"><Link to="/">Twitter</Link></li>
                                <li className="hover:underline"><Link to="/">Instagram</Link></li>
                            </ul>
                        </div>
                        <div className=" leading-6 p-1	">
                            <div className="text-md mb-2 text-white  font-semibold">
                                Make Money with Us
                            </div>
                            <ul className="list-none text-sm text-white">
                                <li className="hover:underline"><Link to="/" >Sell on Amazon</Link></li>
                                <li className="hover:underline"><Link to="/">Sell under Amazon Accelerator</Link></li>
                                <li className="hover:underline"><Link to="/">Amazon Global Selling</Link></li>
                                <li className="hover:underline"><Link to="/">Become an Affiliate</Link></li>
                                <li className="hover:underline"><Link to="/">Fulfilment by Amazon</Link></li>
                                <li className="hover:underline"><Link to="/">Advertise Your Products</Link></li>
                                <li className="hover:underline"><Link to="/">Amazon Pay on Merchants</Link></li>  
                            </ul>
                        </div>
                        <div className=" leading-6 p-1	">
                            <div className="text-md mb-2 text-white  font-semibold">
                                Let Us Help You
                            </div>
                            <ul className="list-none text-sm text-white">
                                <li className="hover:underline"><Link to="/" >COVID-19 and Amazon</Link></li>
                                <li className="hover:underline"><Link to="/">Your Account</Link></li>
                                <li className="hover:underline"><Link to="/">Returns Centre</Link></li>
                                <li className="hover:underline"><Link to="/">100% Purchase Protection</Link></li>
                                <li className="hover:underline"><Link to="/">Amazon App Download</Link></li>
                                <li className="hover:underline"><Link to="/">Amazon Assistant Download</Link></li>
                                <li className="hover:underline"><Link to="/">Help</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center mt-12">
                        <div className="my-auto"><img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" className="" style={{minWidth:"60px",minHeight:"40px",maxHeight:"40px",maxWidth:"60px"}}/></div>
                        <div className=" text-white ml-4 border-2 rounded my-auto" style={{lineHeight:"40px"}}>
                            <span className="p-2 my-auto"><i className="fas fa-globe"></i>English</span> 
                        </div>       
                    </div>
                    <div className="flex justify-center text-xs text-white mx-auto w-2/3">
                        <span className="p-1 m-1">Australia</span>
                        <span className="p-1 m-1">Brazil</span>
                        <span className="p-1 m-1">Canada</span>
                        <span className="p-1 m-1">China</span>
                        <span className="p-1 m-1">France</span>
                        <span className="p-1 m-1">Germany</span>
                        <span className="p-1 m-1">Italy</span>
                        <span className="p-1 m-1">Japan</span>
                        <span className="p-1 m-1">Mexico</span>
                        <span className="p-1 m-1">Netherlands</span>
                        <span className="p-1 m-1">Poland</span>
                        <span className="p-1 m-1">Singapore </span>
                        <span className="p-1 m-1">Spain</span>
                        <span className="p-1 m-1">Turkey</span>
                    </div> 
                    <div className="flex justify-center text-xs text-white mx-auto w-2/3">
                        <span className="p-1 m-1">United Arab Emirates</span>
                        <span className="p-1 m-1">United Kingdom</span>
                        <span className="p-1 m-1">United States</span>
                    </div>
                </div>
                <div className="xl:hidden w-full bg-amazon_footer-dark pt-12">
                    <div className="w-11/12 ml-4">
                        <div className="grid grid-cols-6 mx-auto justify-items-left mb-4">
                            <div></div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    AbeBooks
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Books, art<br/>
                                    & collectibles
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Amazon Web Services
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Scalable Cloud<br/>
                                    Computing Services
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Audible
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Download<br/>
                                    Audio Books
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    DPReview
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Digital<br/>
                                    Photography
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    IMDb
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Movies, TV<br/>
                                    & Celebrities
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 mx-auto justify-items-left">
                            <div></div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Shopbop
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Designer<br/>
                                    Fashion Brands
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Amazon Business
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    Everything For<br/>
                                    Your Business
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Prime Now
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    2-Hour Delivery<br/>
                                    on Everyday Items
                                </div>
                            </div>
                            <div className="leading-3 text-xs text-amazon_footer-subtext p-1 hover:underline cursor-pointer">
                                <div className="font-semibold text-white">
                                    Amazon Prime Music
                                </div>
                                <div className="text-amazon_footer-subtext" >
                                    70 million songs, ad-free<br/>
                                    Over 9 million podcast episodes
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="text-center text-xs font-bold text-white pt-8 pb-8">
                        <span className="p-2">
                            Conditions of Use & Sale
                        </span>
                        <span className="p-2">
                            Privacy Notice
                        </span>
                        <span className="p-2">
                            Interest-Based Ads
                        </span>
                        <span className="p-2">
                            © 1996-2021, Amazon.com, Inc. or its affiliates
                        </span>
                    </div>
                    <div className="text-lg font-bold text-center text-cart_color">
                        AMAZON.in CLONE MADE BY DIGANTA
                    </div>
                </div>
                                            {/* MOBILE VIEW OF FOOTER */}
                <div className="hidden xl:block">
                    <div className="w-full bg-amazon_blue-light text-white">
                        <div className="grid grid-cols-2 ml-4 pt-4 pb-6 text-base  font-semibold">
                            <div>
                                <ul className="list-none">
                                    <li className="p-2">Your Amazon.in</li>
                                    <li className="p-2">Amazon Pay</li>
                                    <li className="p-2">Wish List</li>
                                    <li className="p-2"><Link to="/account">Your Account</Link></li>
                                    <li className="p-2">Returns</li>
                                    <li className="p-2">Customer Service</li>
                                    <li className="p-2">Go to Desktop Site</li>
                                </ul>
                            </div>
                            <div>
                                <ul className="list-none">
                                    <li className="p-2"><Link to="/messagecenter">Your Orders</Link></li>
                                    <li className="p-2">Amazon App Download</li>
                                    <li className="p-2">Find a Wish List</li>
                                    <li className="p-2">Your Recently Viewed Items</li>
                                    <li className="p-2">Sell</li>
                                    <li className="p-2">Help</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-center text-white bg-amazon_footer-dark my-auto">
                        <div className="pt-6 pb-4">
                            <i className="fas fa-globe p-2"></i> English
                        </div>
                        <div className="pb-4">
                            Switch Accounts
                        </div>
                        <div className="pb-4">
                            Sign Out
                        </div>
                        <div className="text-xs">
                            <span className="p-3">Conditions of Use</span>
                            <span className="p-3">Privacy Notice</span>
                            <span className="p-3">Interest-Based Ads</span>
                        </div>
                        <div className="text-xs pb-4">
                            © 1996-2021, Amazon.com, Inc. or its affiliates
                        </div>
                        <div className="text-sm font-bold text-center text-cart_color">
                        AMAZON.in CLONE MADE BY DIGANTA
                        </div>
                    </div>
                </div>
            </>
        )
}
export default Footer
