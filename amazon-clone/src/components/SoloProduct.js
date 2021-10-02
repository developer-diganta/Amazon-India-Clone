import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import Fulfilled from "./icons/fulfilled2.png"
import Footer from './Footer'
import { changeProductsList } from '../actionCreators/changeProductsList'
import moment from 'moment';
import ReactImageMagnify from 'react-image-magnify';
import { addItem } from '../actionCreators/addItem';
import Modal from 'react-modal';
import { store } from '../store/store'

const generateStars=()=>{
    return <i class="fas fa-star text-yellow-500"></i>
}


Modal.defaultStyles.overlay.backgroundColor = 'rgba(255,255,255,0.2)';
const customStyles = {
    content: {
      width:"100%",
      padding:"0",
      height:"auto",
      borderRadius:"10px 10px",
      position: "fixed",       
      bottom: "0px",
      left:"0",
      top:"50%"
    },
  };


function SoloProduct() {
    const history = useHistory();
    const {id}=useParams(); //this will be used to refresh incase a new set of products is to be displayed
    const reqId=parseInt(id);//Converting id which is a string to integer
    const location = useSelector((state)=>state.location);
    const user = JSON.parse(useSelector((state)=>state.auth));
    const dispatch=useDispatch();
    const [products,getProducts]=useState(useSelector((state)=>state.productsList));
    const [requiredProduct,getRequiredProduct]=useState({});
    const discounts=[10,20,30,40];
    function showPrice(price){
        const disP=discounts[Math.round(Math.random() * 3)];
        const cp=Math.floor(price*70)
        const discount=Math.floor((disP*cp)/100);
        const finalPrice=cp-discount;
        return  {discount,finalPrice,disP};
    }
    const email=useSelector((state) => JSON.parse(state.auth)?.data.result.email);
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
        dispatch(changeProductsList(productsList));
        getProducts(productsList);
    }
    useEffect(()=>{
        products===null?p():
        getRequiredProduct(products.filter((x)=>{return (x.id===reqId)})[0]);
    },[products,id])

    const showDescription = (description)=>{
        return description?<li>{description}</li>:""
    }
    const [im,updateImg]=useState(requiredProduct.image);
    useEffect(()=>{
        updateImg(requiredProduct.image)
    },[requiredProduct])

    async function addToCart(){
        const requiredProductValue=store.getState().basket.filter((x)=>{return x.id===reqId})[0];
        const res = await fetch('https://a-clone-server.herokuapp.com/addToCart',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({item:requiredProductValue,user:user})})
        const ans = await res.json();

        if(ans === "VF"){
            dispatch({type:"LOGOUT"});
            history.push('/resignin');        
        }
    }
    const [modalIsOpen, setIsOpen] = useState(false);  
    const open = function openModal() {
        setIsOpen(true);
        }
    const close=function closeModal() {
        setIsOpen(false);
        }
  
    const [totalItems,updateTotalItems] = useState(0);
    const [totalPrice,updateTotalPrice] = useState(0);
    return (
        <div style={{backgroundColor:"white"}}>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={close}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <div className="h-12 border-b-2 border-b-gray-300 p-2 text-right font-medium" style={{color:"#1e8294"}}>
                <span  onClick={close} >DONE</span>
            </div>  
            <div className="ml-2 mt-4">
                <div>
                    <img src={requiredProduct.image} alt={requiredProduct.title} class="inline-block mr-2" style={{height:"2rem",width:"2rem"}}/>
                    <i className="fas fa-check text-xl  text-green-500"></i>
                    <span className="text-lg  font-bold" style={{color:"#2b917a"}}>Added To Cart
                    <div className="text-sm text-center font-normal text-black ">Cart Subtotal ({totalItems}): <span className="text-lg text-others-search font-bold">₹{totalPrice}</span> </div>
                    </span>
                </div>
                <div className="text-center">
                    <Link to="/cart"><button className="p-3 text-lg rounded-lg m-2" style={{border:"1px lightgrey solid"}}>Cart</button></Link>
                    <button className="p-3 text-lg  rounded-lg m-2" style={{backgroundColor:"#ffd814"}}>Proceed To Checkout</button>
                </div>
                
            </div>
            </Modal>
            <div className="grid grid-cols-12 grid-flow-row xl:block  justify-items-center" style={{minHeight:"87vh"}}>
                <div className="col-start-1 col-span-4 w-full " >
                    <div className="h-full m-auto text-center xl:hidden">
                        <div className="mx-auto my-auto">
                        <div className="mb-4" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} onClick={()=>updateImg(requiredProduct.image)}>
                        <img height="30px" alt="" width="40px" className="m-3 cursor-pointer clear-both" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} src={requiredProduct.image}/>
                    </div>
                    <div className="mb-4" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} onClick={()=>updateImg("https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")}>
                        <img height="30px" alt="" width="40px" className="m-3 cursor-pointer clear-both" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
                    </div>
                    <ReactImageMagnify style={{margin:"auto"}} {...{
                                smallImage: {
                                    alt: requiredProduct.title,
                                    height:300,
                                    width:300,
                                    src: im,
                                    margin:"100px"
                                },
                                largeImage: {
                                    src: im,
                                    isFluidWidth: true,
                                    width: 900,
                                height: 900, 

                                },
                                enlargedImageContainerDimensions: {
                                    width: '200%',
                                    height: '150%'
                                 }
                        }} />
                    </div>
                    <span className="text-xs text-gray-400">Roll over image to zoom in</span>
                    </div>
                    <div className=" hidden xl:block h-full m-auto mt-24 text-center ">
                        <div style={{minHeight:"200px"}}>
                            <img src={im} className="mx-auto" alt={requiredProduct.title} style={{maxWidth:"40%",maxHeight:"60%",minWidth:"40%",minHeight:"60%"}}/>
                        </div>
                         <div className="mx-auto my-auto">
                            <div className="mb-4 inline-block mr-3" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} onClick={()=>updateImg(requiredProduct.image)}>
                                <img height="30px" alt="" width="40px" className="m-3 cursor-pointer clear-both" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} src={requiredProduct.image}/>
                            </div>
                            <div className="mb-4 inline-block" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} onClick={()=>updateImg("https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")}>
                                <img height="30px" alt="" width="40px" className="m-3 cursor-pointer clear-both" style={{minHeight:"30px",maxHeight:"30px",minWidth:"50px",maxWidth:"50px"}} src="https://images.unsplash.com/photo-1607082352121-fa243f3dde32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-start-5 col-span-6 w-full h-full">
                    <div className="mt-12 mr-3 p-2  border-b-2 border-gray-200">
                        <div className="text-xl font-medium">
                            {requiredProduct.title}
                        </div>
                        <div className="text-sm text-others-searchSelectText">
                            Brand : {requiredProduct.category}
                        </div>
                        <span className="text-sm">{Array(requiredProduct.ratings).fill().map(generateStars)}</span>
                    </div>
                    <div className="mt-3 pl-2 pr-2 ml-2">
                        <div className="text-sm text-gray-500">M.R.P.: <span className="line-through">₹{requiredProduct.price}</span></div>
                        <div className="inline text-sm text-gray-500">Price:</div> <div className="inline text-others-search text-xl">₹{requiredProduct.finalPrice} </div>{requiredProduct.amazonFulfilled?<img src={Fulfilled} className="inline ml-2" style={{maxWidth:"45px",minWidth:"45px",minHeight:"30px",maxHeight:"30px"}}/>:""}
                        <div className="text-sm text-gray-500">You Save: <div className="inline text-others-search">₹ {requiredProduct.discount} ({requiredProduct.disP}%)</div></div>
                        <div className="text-sm">Inclusive of all taxes</div>
                        <div className="mt-2 text-sm mb-2"><span className="text-others-searchSelectText">FREE delivery:</span><span className="font-bold">{requiredProduct.date}</span></div>
                        <div className="rounded text-sm" style={{border:"1px solid lightgray"}}>
                            <div className="p-3" style={{borderBottom:"1px solid lightgray"}}>
                                <span className="font-bold text-red-600">%</span><span className="font-bold text-others-search">  Save Extra</span> with 3 offers
                            </div>
                            <div className="p-3" style={{borderBottom:"1px solid lightgray"}}>
                                <span className="font-bold text-others-search">  Cashback:</span> 5% back with Amazon Pay XYZ Bank credit card for Prime members. 3% back for others. Get up to ₹600 back on card approval.
                            </div>
                            <div className="p-3" style={{borderBottom:"1px solid lightgray"}}>
                                <span className="font-bold text-others-search">  Cashback:</span> 7% back with Amazon Pay ABC Bank credit card for Prime members. 7% back for others. Get up to ₹1000 back on card approval.
                            </div>
                            <div className="p-3">
                                <span className="font-bold text-others-search">  Free Delivery: </span> Get Free Delivery on any value with Prime Membership (T&C apply).
                            </div>
                        </div>
                        <div>
                        <div className="text-amazon_yellow inline-block w-1/4 text-center">
                            <i className="fas fa-box"></i>
                            <div className="text-xs text-others-searchSelectText">
                                7 Days <br/>Replacement
                            </div>
                        </div>
                        {requiredProduct.amazonFulfilled?<div className="text-amazon_yellow inline-block w-1/4 text-center">
                            <i class="fas fa-truck"></i>
                            <div className="text-xs text-others-searchSelectText">
                                Amazon <br/>Delivered
                            </div>
                        </div>
                        :
                        ""}                        
                        <div className="text-amazon_yellow inline-block w-1/4 text-center">
                            <i class="fas fa-door-closed"></i>
                            <div className="text-xs text-others-searchSelectText">
                                No Contact <br/>Delivery
                            </div>
                        </div>
                        </div>
                        <div className="font-medium text-lg" style={{color:"#2d8565"}}>
                            In Stock.
                        </div>
                        <div className="mt-2 text-sm">
                            <span>Sold By <span className="text-others-searchSelectText">{requiredProduct.seller}</span> {requiredProduct.amazonFulfilled?<span> and <span className="text-others-searchSelectText">Fullfilled By Amazon</span></span>:""}</span>
                        </div>
                        <div className="mt-2 ml-3 text-sm mb-6">
                            <ul className="list-disc">
                                {requiredProduct.description?(requiredProduct.description.split(".").map(showDescription)):""}
                            </ul>
                        </div>
                    </div>
   
                </div>
                <div className="col-start-11 col-span-2 w-full">
                    <div className="ml-2 p-2 mt-8">
                        <div className="rounded text-sm " style={{border:"1px solid lightgray"}}>
                            <div className="text-sm font-medium ml-2  pt-4">
                            Quantity:&nbsp;
                            <select name="qtty" onChange={(e)=>{
                                const newPdt={...requiredProduct};
                                newPdt.qty=parseInt(e.target.value);
                                getRequiredProduct(newPdt);
                            }} 
                                    className="p-1 rounded font-medium text-sm" style={{border:"1px solid lightgray"}}>
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </select> 
                            </div>
                            <div className="text-center mt-2">
                                 <Link to={`/addedtocart/${requiredProduct.id}`}><button 
                                 onClick={()=>{
                                        dispatch(addItem(requiredProduct));
                                        email?
                                        (addToCart())
                                        :console.log("NOT SIGNED IN");
                                        
                                        
                                        
                                    }} 
                                 className="p-2 w-10/12 text-xs xl:hidden" style={{borderRadius:"20px",backgroundColor:"#ffd814"}}>Add To Cart</button></Link>
                                <><span
                                 onClick={()=>{
                                        dispatch(addItem(requiredProduct));
                                        email?
                                        (addToCart())
                                        :console.log("NOT SIGNED IN");
                                        let totalItems=0;
                                        let totalPrice=0;
                                        const itemsList = store.getState().basket;
                                        for(let i=0;i<itemsList.length;i++){
                                            totalItems+=itemsList[i].qty;
                                            totalPrice+=itemsList[i].price*itemsList[i].qty;
                                        }
                                        updateTotalItems(totalItems);
                                        updateTotalPrice(totalPrice);
                                        open()

                                    }} 
                                 className="hidden p-2 w-10/12 text-xs xl:block mx-auto" style={{borderRadius:"20px",backgroundColor:"#ffd814"}}>Add To Cart</span></>
                            </div>
                            <div className="text-center mt-2">
                                <button className="p-2 w-10/12 text-xs" style={{borderRadius:"20px",backgroundColor:"#ffa41c"}}>Buy Now</button>
                            </div>
                            <div className="text-center mt-3">
                            <span className=" text-gray-400"><i class="fas fa-lock"></i></span><span className="text-others-searchSelectText text-sm ml-4">Secure Transaction</span>
                            </div>
                            <div>
                            <input type="checkbox" className="ml-2 mt-3" name="gift" id="giftItem"/>
                            <label for="giftItem"> Add gift options</label>
                            </div>
                            <div className="text-xs ml-2 mt-4 text-others-searchSelectText">
                            <i class="fas fa-map-marker-alt"></i> {user  && location?`Deliver to ${user.data.result.name.split(" ")[0]} - ${location.PO}, ${location.PIN}`:user?`Deliver to ${user.data.result.name.split(" ")[0]}`:"SignIn"}
                            </div>
                            <div className="mt-4 mb-5" style={{borderBottom:"1px solid lightgray"}} ></div>
                            <div className="text-center mb-3">
                                <button className=" bg-gradient-to-t from-gray-300 to-white p-2 rounded" style={{border:"1px solid lightgray"}} >Add to wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SoloProduct
