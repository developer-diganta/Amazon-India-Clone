import { useEffect,useState } from "react";
import TShirt from "./images/tshirt.png"
import Jewellery from "./images/jewellery.png";
import Electronics from "./images/electronics.png";
import Footer from './Footer';
import Dress from "./images/dress.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeProductsList } from "../actionCreators/changeProductsList";
import moment from "moment";


const productDisplay = (x)=>{
    return (<Link to={`/product/${x.category}`} className="m-4 p-4 "><img src={x.image} alt="Product" className=" w-48 h-48 xl:h-24 xl:w-24" style={{minHeight:"70px",minWidth:"70px"}}/></Link>)
}

const discounts=[10,20,30,40];

function showPrice(price){
    const disP=discounts[Math.round(Math.random() * 3)];
    const cp=Math.floor(price*70)
    const discount=Math.floor((disP*cp)/100);
    const finalPrice=cp-discount;
    return  {discount,finalPrice,disP};
}


export default function Products(){   
    const dispatch = useDispatch(); 
    const [products,updateProducts] = useState([]);

    async function p(){
        const response = await fetch("https://fakestoreapi.com/products");
        const productsList = await response.json();
        updateProducts(await productsList);
        const sellers=["Seller 1","Seller 2","Seller 3"];
        for(var i=0;i<productsList.length;i++){
            const finalP=showPrice(productsList[i].price);
            productsList[i].price=Math.floor(productsList[i].price*70);
            productsList[i].discount=finalP.discount;
            productsList[i].finalPrice=finalP.finalPrice;
            productsList[i].disP=finalP.disP;
            productsList[i].amazonFulfilled=Math.floor(Math.random()*2)+1===1?true:false;
            productsList[i].ratings=Math.floor(Math.random()*6);
            productsList[i].seller=sellers[Math.floor(Math.random()*3)];
            productsList[i].date=moment().add(Math.floor(Math.random()*7)+1, 'days').format('dddd, MMMM DD');
            productsList[i].qty=1;

        }
        dispatch(changeProductsList(await productsList));
    }
    useEffect(() => {
        p();
    },[]);

    return(
        <>
            <div className="mx-auto" style={{width:"100%"}}>  
                <div className="-mt-72 absolute  xl:-mt-24  lg:mt-0 mx-auto"  style={{width:"100% "}}>
                    <div className="grid grid-cols-4 xl:hidden justify-items-center">
                        <Link to="/product/men%27s%20clothing">
                            <div className=" bg-white shadow-2xl h-96  w-72 xl:h-72 xl:w-56 mb-4 text-lg font-bold">
                                <div className="ml-2 p-1"><span>GET UPTO 30% OFF | MEN'S FASHION</span></div>
                                <div className=" bg-card_color w-4/5 mx-auto mt-2"  style={{height:"70%"}}>
                                    <img src={TShirt} alt="Men's Fashion" className="h-full xl:h-32 mx-auto"/>
                                    <div className="xl:block ml-2 p-2 hidden">
                                        <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Men's Fashion</Link></span>
                                    </div>
                                </div>
                                <div className="ml-2 p-2 xl:hidden">
                                    <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Men's Fashion</Link></span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/product/jewelery">
                            <div className=" xl:hidden  bg-white shadow-2xl h-96 w-72 mb-4 text-lg font-bold">
                                <div className="ml-2 p-1"><span>UPTO 40% OFF | JEWELLERY COLLECTIONS</span></div>
                                <div className=" bg-card_color    w-4/5 mx-auto mt-2"  style={{height:"70%"}}>
                                    <img src={Jewellery} alt="Jewllery" className="h-full mx-auto"/>
                                </div>
                                <div className="ml-2 p-2">
                                    <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Jewellery Collections</Link></span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/product/electronics">
                            <div className=" xl:hidden bg-white shadow-2xl h-96 w-72 xl:h-72 xl:w-56 mb-4 text-lg font-bold">
                                <div className="ml-2 p-1"><span>GET UPTO 50% OFF | ELECTRONICS</span></div>
                                <div className="bg-card_color w-4/5 mx-auto mt-2"  style={{height:"70%"}}>
                                    <img src={Electronics} alt="Electronics" className="h-full xl:h-32 mx-auto"/>
                                    <div className="xl:block ml-2 p-2 hidden">
                                        <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Electronics</Link></span>
                                    </div>
                                </div>
                                <div className="ml-2 p-2 xl:hidden">
                                    <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Electronics</Link></span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/product/women%27s%20clothing">
                            <div className=" bg-white shadow-2xl h-96 w-72 xl:h-72 xl:w-56 mb-4 text-lg font-bold">
                                <div className="ml-2 p-1"><span>GET UPTO 25% OFF | WOMEN'S FASHION</span></div>
                                <div className="bg-card_color w-4/5 mx-auto mt-2"  style={{height:"70%"}}>
                                    <img src={Dress} alt="Women's Fashion" className="h-full xl:h-32 mx-auto"/>
                                    <div className="xl:block ml-2 p-2 hidden">
                                        <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Women's Fashion</Link></span>
                                    </div>
                                </div>
                                <div className="ml-2 p-2 xl:hidden">
                                    <span className="text-xs  font-normal text-blue-800"><Link to="/">See all Women's Fashion</Link></span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-white h-70 lg:h-56 mt-6 mb-6 mx-auto" style={{width:"96%"}}>
                        <div className="p-6 font-medium text-2xl lg:text-sm">
                            Electronics | Amazon Launchpad
                        </div>
                        <div className="lg:hidden grid grid-cols-6 overflow-auto justify-items-center">
                            {products.slice(8,14).map(productDisplay)}
                        </div>
                        <div className="hidden lg:flex overflow-auto">
                            {products.slice(8,14).map(productDisplay)}
                        </div>
                    </div>
                    <div className="bg-white h-70 lg:h-56 mt-6 mb-6 mx-auto" style={{width:"96%"}}>
                        <div className="p-6 font-medium text-2xl lg:text-sm">
                            Upto 25% OFF On Women's Fashion | Amazon Launchpad
                        </div>
                        <div className="lg:hidden grid grid-cols-5 overflow-auto justify-items-center">
                            {products.slice(15,20).map(productDisplay)}
                        </div>
                        <div className="hidden lg:flex flex-nowrap overflow-auto">
                            {products.slice(15,20).map(productDisplay)}
                        </div>
                    </div>
                    <div className="bg-white h-70 lg:h-56 mt-6 mb-6 mx-auto" style={{width:"96%"}}>
                        <div className="p-6 font-medium text-2xl lg:text-sm">
                            Fashion Delivered To Your Doorstep | Prime  
                        </div>
                        <div className="flex flex-row overflow-auto flex-nowrap">
                            {products.slice(0,3).map(productDisplay)}
                            {products.slice(15,20).map(productDisplay)}
                        </div>
                    </div>
                    <div className="">
                        <Footer/>
                    </div> 
                </div>
            </div>
        </>
    )
}