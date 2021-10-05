import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { changeProductsList } from "../actionCreators/changeProductsList";
import productsList from "../reducers/productsList";
import Footer from "./Footer";

const discounts=[10,20,30,40];

function showPrice(price){
    const disP=discounts[Math.round(Math.random() * 3)];
    const cp=Math.floor(price*70)
    const discount=Math.floor((disP*cp)/100);
    const finalPrice=cp-discount;
    return  {discount,finalPrice,disP};
}

function AddedToCart() {
    const dispatch = useDispatch();
    const {id} = useParams();
    async function p(){
        const response = await fetch("https://fakestoreapi.com/products");
        const productsList = await response.json();
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
    const products = useSelector((state)=>state.productsList);
    if(products===null){
        p();
    }
    const user = useSelector((state)=>state.auth);
    const reqProduct = useSelector((state)=>state.basket[state.basket.length-1]);

    const i = useSelector((state)=>state.basket);

    const totalItems = useSelector((state)=>state.basket);
    const totalPrice = useSelector((state)=>{
       const items = state.basket;
       let total=0;
       for(var i=0;i<items.length;i++){
        total+=items[i].qty*items[i].finalPrice
       }
       return total;
    })

   const [free,updateFree] = useState(false)

   useEffect(()=>{
       let aTotal=0;
    for(let i=0;i<totalItems.length;i++){
        if(totalItems[i].amazonFulfilled){
            aTotal+=totalItems[i].finalPrice;
            if(aTotal>499){
                updateFree(true);
                break;
            }
        }
    }
   },[totalItems])

    return (
        <div className="bg-white">
          <div className="h-8"></div>
            <div className="grid mt-12 grid-flow-col grid-cols-12 justify-items-center w-10/12  border-2 border-black mx-auto">
                <div className="col-span-5 p-10 border-r-2 border-gray-300" style={{backgroundColor:"#fafafa"}}>
                    <div className="my-auto mx-auto">
                        <i className="fas fa-check text-xl  " style={{color:"#5bab2f"}}></i>
                        <span className="ml-4"><img src={reqProduct.image} className="inline-block p-3 border-2 border-green-600" height="60px" width="80px" alt={reqProduct.title}/></span>
                        <span className="inline ml-2 font-bold " style={{color:"#5bab2f"}}>Added to Cart</span>
                    </div>
                </div>
                <div className="col-span-8 my-auto w-full " >
                    <div><span className="font-bold">Cart Subtotal</span> ({totalItems.length} items) : <span className="font-bold text-others-search">₹{totalPrice}</span></div> 
                    <div>{free?<span className="text-xs">Eligible for free delivery on some/all items</span>:""}</div>
                    <div className="text-right">
                        <div>
                            <button className="bg-gradient-to-t from-gray-300 to-white p-3 text-xs rounded mr-3" style={{border:"1px solid black"}} >Cart</button>
                            <Link to="/cart"><button className="p-3 text-xs rounded bg-gradient-to-t from-others-proceed mr-2 to-others-proceed2" style={{border:"1px solid black"}}>{user?"Proceed To Buy":"Sign In"} ({totalItems.length} items)</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 mb-10">
                <div className="w-full text-center">
                    <span className="text-xl">Sponsored Items Related to {reqProduct.title}</span>
                </div>
                <div className="text-center">
                    {products.filter((x)=>x.category===reqProduct.category).map((x,i)=>i<4?<Link to={`/products/item/${x.id}`}><img src={x.image} alt={x.title} className="inline-block m-10" style={{height:"180px",width:"170px"}} /></Link>:"")}
                    
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddedToCart
