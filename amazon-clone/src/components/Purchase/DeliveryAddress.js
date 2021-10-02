import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Checkout from "./checkout.gif"

export default function DeliveryAddress() {
    const date = moment().format("DD MMMM YYYY");
    const [address,updateAddress] = useState([]);
    const user = JSON.parse(useSelector((state)=>state.auth));
    // const [email,updateEmail]=useState(user?JSON.parse(user).result.email:"");
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
    useEffect(()=>{
        const getAddress= async ()=>{
            const res = await fetch("https://a-clone-server.herokuapp.com/address",{
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
                updateAddress(await res.json());
            };
            getAddress();
    },[])
    return (
        <div className="ml-4 xl:ml-0 xl:p-1">
            <div className="mt-4 mb-10">
                <img src={Checkout} alt="checkout tray" />
            </div>
            <div className="text-3xl mb-3">
                Select a delivery address
            </div>
            <div className="text-sm mb-3 ">
                Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can enter a <Link to="/newaddress" className=" text-blue-600 hover:text-red-600">new delivery address.</Link> 
            </div>
            <div>
                <div>Addresses</div>
                <div className="grid grid-cols-3 xl:grid-cols-1 justify-center mr-4 xl:mr-0">
                    {address.map((x)=>{
                        return <div className="text-sm p-5 xl:p-4 xl:bg-white xl:border-2 xl:rounded xl:mb-2 xl:border-gray-300 lg:w-full w-1/2" style={{minHeight:"10rem"}}>
                            <div className="font-bold">{x.name}</div>
                            <div>
                                {x.flat},{x.area} <br/>{x.town}, {x.state} <br/>{x.pin}<br/>India
                            </div>
                            {user?
                                    <form action="https://a-clone-server.herokuapp.com/create-checkout-session" method="POST">
                                        <input type="hidden" value={user.data.result.email} name="email" />
                                        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
                                        <input type="hidden" value={freeDelivery.length?true:false} name="freeDelivery"/>
                                        <input type="hidden" value={JSON.stringify(x)} name="address"/>
                                        <input type="hidden" value={date} name="date"/>
                                        <button type="submit" className="mt-2 border-others-proceed text-xs w-full rounded border-2 pt-2 pb-2  bg-gradient-to-t from-others-proceed to-others-proceed2 hover:from-others-proceed hover:to-others-proceed">Deliver to this address</button>

                                    </form>
                                    :
                                    <button disabled className="rounded-lg text-normal p-2 text-sm cursor-not-allowed" style={{backgroundColor:"lightgray",width:"80%"}}>Sign In To Continue({totalItems} items)</button>
                                }
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
