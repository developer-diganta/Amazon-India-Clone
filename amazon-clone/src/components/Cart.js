import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link,useHistory } from "react-router-dom";
import { removeItem } from "../actionCreators/removeItem";
import CartItem from "./CartItem"
import Footer from "./Footer";
import MobCartItem from "./MobCartItem";

function Cart() {
    const history = useHistory();
    async function removeItemFromDB(user){
        const res = await fetch("https://a-clone-server.herokuapp.com/emptycart",{
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
                                        body: JSON.stringify({user:user})})//Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero.                                
                                        const ans = await res.json();
                                        if(ans === "VF"){
                                            dispatch({type:"LOGOUT"});
                                            history.push('/resignin');        
                                        }
                                    }
    
    
    const user = JSON.parse(useSelector((state)=>state.auth));
    const cart=useSelector((state)=>state.basket);
    const freeDelivery = useSelector((state)=>state.basket.filter((x)=>x.amazonFulfilled));
    const [totalItems,updateTotalItems] = useState(0);
    const totalPrice=()=>{
        let totalPrice=0;
        let totalIt=0;
        for(let i=0;i<cart.length;i++){
            totalPrice+=cart[i].qty*cart[i].finalPrice;
            totalIt+=cart[i].qty;
        }
        updateTotalItems(totalIt);
        return totalPrice;
    };
    const [total,updateTotal] = useState(cart?totalPrice:0);
    useEffect(()=>{
        updateTotal(cart?totalPrice:0);
    },[cart])
    const dispatch= useDispatch();
    const checkout = async()=>{
        const ans = await fetch("https://a-clone-server.herokuapp.com/create-checkout-session",{
                                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        // credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                            'Content-Type': 'application/json',
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                            "Content-Type":"text/html",
                                        },
                                        redirect: 'follow', // manual, *follow, error
                                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                        body: JSON.stringify({user:user,email:user.data.result.email,cart:cart})})//Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero
    
    }

    return (
        <div>
        {/* Cart section for large screens*/}
            <div className="xl:hidden grid grid-cols-12 justify-items-center">

                <div className="w-full col-span-9">
                    <div className="bg-white m-6 p-2">
                        <div className="m-2 border-b-2 border-gray-200">
                            <span className="text-2xl text-black font-semibold">Shopping Cart</span>
                            <span className="block  text-others-searchSelectText cursor-pointer hover:text-red-600" onClick={()=>{cart.map((x)=>Array(x.qty).fill().map(()=>
                            {dispatch(removeItem(x.id))}));
                            removeItemFromDB(user);
                            }}>Deselect All items</span>
                            <span className="block text-right  text-gray-500">Price</span>
                        </div>
                        {cart.length!==0?
                            cart.map((x) => <CartItem key={x.id} id={x.id} price={x.finalPrice} amazonFulfilled={x.amazonFulfilled} title={x.title} image={x.image} qty={x.qty} />)
                            :
                            <div>Cart Empty</div>
              
                        }

                    </div>
                </div>
                <div className="col-span-3 w-full m-6 mr-12">
                    <div className="bg-white">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="Secure Payments" className="mx-auto"/>
                    </div>
                    {cart.length>0?
                        <div className="bg-white mt-3 pl-3 pb-8">
                            {freeDelivery.length?<div className="text-sm text-green-600"><i className="fas fa-check-circle"></i> Your order is eligible for <span className="font-bold">FREE Delivery</span>!</div>:""}
                            <div className="text-lg mt-4">
                                Subtotal : <span className="font-bold">₹{total}</span>
                            </div>
                            <div className="text-center -ml-4 mt-2">
                                {user?
                                    <Link to="/buy/addresses" ><button className="rounded-lg text-normal p-2 text-sm" style={{backgroundColor:"#ffd814",width:"80%"}}>Proceed To Buy ({totalItems} items)</button></Link>
                                    :
                                    <button disabled className="rounded-lg text-normal p-2 text-sm cursor-not-allowed" style={{backgroundColor:"lightgray",width:"80%"}}>Sign In To Continue({totalItems} items)</button>
                                }


                                {/* <button onClick={()=>{checkout()}}>Checkout</button> */}
                            </div>
                        </div>
                        :
                        ""}  
                </div>
            </div>
        {/* End of cart section for large screens */}

        {/* Cart section for small screens */}
            <div className="hidden xl:block " style={{backgroundColor:"white"}}>
                <div  style={{border:"1px solid lightgray"}}>
                    <div className="ml-4 pt-3 mb-4">
                        <div className="text-2xl">
                            <span>Subtotal </span>
                            <span className="font-bold">₹{total}</span>
                        </div>
                        <div className="mt-2 text-green-600 font-normal">
                        {freeDelivery.length?<div><i className="fas fa-check-circle"></i> Your order is eligible for <span className="font-bold">Free Delivery</span>!</div>:""}
                        </div>
                        <div className="text-center -ml-4 mt-2">
                        {user?
                            <Link to="/buy/addresses"><button className="rounded-xl text-normal p-3" style={{backgroundColor:"#ffd814",width:"80%"}}>Proceed To Buy ({cart.length} items)</button></Link>
                            :
                            <button disabled className="rounded-xl text-normal p-3 cursor-not-allowed" style={{backgroundColor:"lightgray",width:"80%"}}>Sign In To Continue({totalItems} items)</button>
                        }
                        </div>
                    </div>
                </div>
                <div className="mt-2 bg-white">
                    {cart.map((x)=><MobCartItem key={x.id} id={x.id} title={x.title} price={x.finalPrice} qty={x.qty} image={x.image} item={x}/>)}  
                    <div className="text-white">.</div>
                </div>
            </div>
        {/* End of cart section for small screens */}
            <div className="mt-24">
                <Footer/>
            </div>
        </div>
    )
}

export default Cart
