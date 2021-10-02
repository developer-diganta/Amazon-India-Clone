import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart'
import { removeItem } from "../../actionCreators/removeItem";
import AmazonAssistant from "../images/amazonassistant.JPG"
import Footer from '../Footer';
import { Link } from 'react-router-dom';


export default function Success() {
    const dispatch = useDispatch();
    const user = JSON.parse(useSelector((state)=>state.auth));

    const cart=useSelector((state)=>state.basket);
    const successPay = ()=>{cart.map((x)=>Array(x.qty).fill().map(()=>
        {dispatch(removeItem(x.id))}));
        }
    
    useEffect(()=>{
        successPay();
    }) 
    return (
        <div >
            <div className="bg-white" style={{minHeight:"75vh"}}>
                <div className="mt-12 xl:mt-0 pt-6">
                    <div className="ml-24 xl:ml-1">
                        <div className="float-left xl:block">
                            <div className="text-2xl text-green-600 font-semibold">
                                <span><i className="fas fa-check-circle "></i> Order placed, thank you!</span>
                            </div>
                            <Link to="/messagecenter" className="text-sm ml-1 xl:ml-0">
                                Confirmation will be sent to <span className="text-blue-500 hover:text-red-500 hover:underline cursor-pointer">Message Centre</span>.<br/>
                            </Link>
                            <div className=" mt-2 ml-1 xl:ml-0">
                                <span className="font-semibold">Shipping to {user.data.result.name}</span>
                            </div>
                        </div>
                        <div className="float-right mr-24 xl:mr-0 xl:float-none xl:mx-auto">
                            <img src={AmazonAssistant} alt="Amazon Assistant" height={200} width={300} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
