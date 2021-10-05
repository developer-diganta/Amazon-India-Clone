import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Footer from '../Footer';


export default function Customer() {
    const customTheme = {
        yearColor: '#405b73',
        lineColor: '#d0cdc4',
        dotColor: '#262626',
        borderDotColor: '#d0cdc4',
        titleColor: '#405b73',
        subtitleColor: '#bf9765',
        textColor: '#262626',
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(useSelector((state)=>state.auth));
    const [purchase,updatePurchase]=useState([]);
    const [main,updateMain] = useState({});
    const [sub,updateSub] = useState({});
    const [track,updateTrack] = useState(false);
    const [mobTrack,updateMobTrack] = useState(false);
    const [dateDiff,getDateDiff] = useState(0);
    const displayTrack = (x,y) => {
            updateMain(x);
            updateSub(y);
            updateTrack(!track);
    }
    const valuesMobTrack = (x,y) => {
        updateMain(x);
        updateSub(y);
        updateMobTrack(!mobTrack);
}
    useEffect(()=>{
        const getItems = async ()=>{
            const res = await fetch("https://a-clone-server.herokuapp.com/getPurchase",{
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
            if(await ans === "VF"){
                dispatch({type:"LOGOUT"});
                history.push('/resignin');     
            }
            else{
                updatePurchase(await ans);
            }         
        }
        getItems();
    },[])
    const getTotalPrice = (x)=>{
        let price = 0;
        for(var i=0;i<x.length;i++){
            price+=x[i].qty*x[i].finalPrice;
        }
        return price
    };

    return (
        <>
        <div className="bg-white pt-4 pb-10" style={{minHeight:"85vh"}}>
        {/* Mobile View */}
        <div className="hidden xl:block">
        <div className={`${mobTrack?"hidden":"block"}`}>
            {purchase?purchase.slice(0).reverse().map((x)=>{
                return x.purchase.map((y)=>{
                    var a = moment(moment().format("DD MMMM"));
                            var t = (a.diff(moment(moment(y.date).format("DD MMMM")),'days'))*-1
                    return(
                        
                        <div onClick={()=>{
                            let a = moment(moment().format("DD MMMM"));
                                              let b = moment(moment(y.date).format("DD MMMM"));
                                              var t = (a.diff(b,'days'))*-1;
                                              getDateDiff(t); 
                            valuesMobTrack(x,y)}} className="bg-white cursor-pointer grid grid-cols-4 border-b-2 border-gray-300 p-5">
                            <img className="col-span-1 " src={y.image} alt={y.title} height={50} width={60}/>
                            <div className="col-span-2 ml-5 my-auto mx-auto">{t<0?`Delivered on ${moment(y.date).format("DD MMMM")}`:t===0?"Arriving Today By 9PM":`Arriving on ${moment(y.date).format("DD MMMM")}`}</div>
                            <div className="col-span-1 mx-auto  my-auto"> <i className="fas fa-angle-right"></i> </div>
                        </div>
                    )
                })
            }):""}
        </div>



        <div className={`${mobTrack?"":"hidden"}`}>
            <div className={`pt-4`}>
            <div className="pl-6">
            <div className="text-xs text-others-searchSelectText font-semibold mb-10"><Link className="hover:text-red-500 hover:underline" to="/account">Your Account</Link> {'>'} <span className="hover:text-red-500 hover:underline cursor-pointer" onClick={()=>{(updateMobTrack(false))}} to="/messagecenter">Your Orders</span> {'>'} Track Package</div>
            <div><div className="text-xl font-semibold inline-block float-left w-1/2" style={{color:"#008577"}}>
                {dateDiff<0?`Delivered on ${moment(sub.date).format("DD MMMM")}`:dateDiff===0?"Arriving Today":`Arriving on ${moment(sub.date).format("DD MMMM")}`}
            </div>
                <img src={sub.image} alt={sub.title} height={50} width={60}  className="float-right inline-block mr-6" />
            </div>
            <div className="pt-24  pb-16">
            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"#52c2b4"}}>
                <div className="absolute">
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10 absolute" style={{width:"65vw"}}>Ordered {main.date}</span>
                </div>
            </div>
            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"#52c2b4"}}>
                <div className="absolute">
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10 absolute" style={{width:"65vw"}}>Shipped {main.date}</span>
                </div>
            </div>

            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:`${dateDiff<=0?"#52c2b4":"#e9e7e7"}`}}>
                <div className="absolute">
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:`${dateDiff<=0?'#52c2b4':'#e9e7e7'}`}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10 absolute" style={{color:`${dateDiff>0?"#7b7f7a":"black"}`,width:"65vw"}}>Out For Delivery</span>
                </div>
            </div>
            {/* <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"yellow"}}> */}
                <div className="absolute">
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:`${dateDiff<=0?dateDiff===0?"#e9e7e7":"#52c2b4":"#e9e7e7"}`}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10 absolute" style={{color:`${dateDiff>0?"#7b7f7a":"black"}`,width:"65vw"}}>{dateDiff<=0?dateDiff===0?"Arriving Today":`Delivered ${moment(sub.date).format("DD MMMM")}`:`Arriving ${moment(sub.date).format("DD MMMM")}`}</span>
                </div>

            {/* </div> */}
            </div>
            </div>
            <div className="border-b-8 border-gray-300"></div>
            <div className="ml-3 mt-2 pb-4">
                <div className="text-xl font-semibold">Shipped With Amazon</div>
                <div className="pt-3  font-semibold">Tracking ID: 123456789</div>
            </div>
            <div className="border-b-8 border-gray-300"></div>
            <div className="ml-3 mt-2 pb-4">
                <div className="text-xl font-semibold">Shipping Address</div>
                <div className="pt-3 pb-4 font-semibold">{main.name}<br/>{main.address?`${main.address.line1}, ${main.address.line2}, ${main.address.city}, ${main.address.state}, ${main.address.postal_code}`:""}</div>
            </div>
            <div className="border-b-8 border-gray-300"></div>
          
        </div>
    </div>
        </div>
        
            <div className={` xl:hidden grid grid-cols-12 ${!track?"":"hidden"}`}>
                <div className="col-span-2"></div>
                <div className="col-span-8">
                    <div>
                        <div className="text-3xl">
                                Your Orders
                            </div>
                        
                        {purchase?purchase.slice(0).reverse().map((x)=>{
                            const p=x.purchase.reduce((total,w)=>total+(w.qty*w.finalPrice),null);
                            return(
                                <div>
                                <div className="rounded mt-4 pb-4" style={{borderWidth:"1px",borderColor:"lightgray"}}>
                                <div className="p-3 grid grid-cols-3" style={{backgroundColor:"#f0f2f2"}}>
                            <div className="col-span-1 text-xs font-semibold">ORDER PLACED<br/>{x.date}</div>
                            <div className="col-span-1 text-xs font-semibold">TOTAL<br/>₹{getTotalPrice(x.purchase)}</div>
                            <div className="col-span-1 text-xs font-semibold">SHIP TO<br/>{x.name}</div>
                            </div>
                                {x.purchase.map((y)=>{
                            var a = moment(moment().format("DD MMMM"));
                            var t = (a.diff(moment(moment(y.date).format("DD MMMM")),'days'))*-1
                            return(
                            <>
                            <div className="grid grid-cols-5">
                                <div className="p-3 col-span-3">
                                    <div className="font-semibold text-lg">
                                        {t>0?`Arriving ${y.date} `:t===0?"Arriving Today":`Delivered ${moment(y.date).format(`DD-MMMM-${moment().format("YYYY")}`)}`}
                                    </div>
                                    <div className="text-sm text-green-500">
                                        {t>0?"On the way":""}
                                    </div>
                                    <img src={y.image} height={80} width={70} alt="1" className="ml-3 inline-block mt-2"/>
                                    <Link to={`/products/item/${y.id}`}><span className="ml-20 text-blue-600 hover:text-red-500 hover:underline text-sm">{`${y.title.substring(0,53)}...`}</span></Link>
                                    <div className="text-sm text-others-searchSelectText">Qty : {y.qty}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="float-right mr-10 pt-3">
                                    {}
                                        <button onClick = {()=>{
                                              let a = moment(moment().format("DD MMMM"));
                                              let b = moment(moment(y.date).format("DD MMMM"));
                                              var t = (a.diff(b,'days'))*-1;
                                              getDateDiff(t);            
                                            displayTrack(x,y)}} className="mt-2 rounded p-2 text-sm block" style={{backgroundColor:"#ffd814",maxWidth:"150px",minWidth:"150px"}}>Track</button>
                                        {t>0?<button className="mt-2 rounded p-2 text-sm block" style={{backgroundColor:"#ffd814",maxWidth:"150px",minWidth:"150px"}}>Cancel</button>:""}
                                        <button className="mt-2 rounded p-2 text-sm block" style={{backgroundColor:"#ffd814",maxWidth:"150px",minWidth:"150px"}}>Review</button>
                                        <button className="mt-2 rounded p-2 text-sm block" style={{backgroundColor:"#ffd814",maxWidth:"150px",minWidth:"150px"}}>Archive</button>
                                    </div>
                                </div> 
                            </div>
                            
                            </>
                                    )
                                })}
                                </div>
                                </div>
                               
                            )
                        })
                        
                            :""}
                        
                    </div> 
                </div>
            </div>
            <div className={`${track?"":"hidden"}`}>
            <div className={`grid grid-cols-12 pt-4`}>
            <div className="col-span-2"></div>
            <div className="col-span-7 text-lg">
            <div className="text-xs text-others-searchSelectText font-semibold ml-20 mb-10"><Link className="hover:text-red-500 hover:underline" to="/account">Your Account</Link> {'>'} <span className="hover:text-red-500 hover:underline cursor-pointer" onClick={()=>{updateTrack(false)}} to="/messagecenter">Your Orders</span> {'>'} Track Package</div>
            <div className="ml-20 text-2xl font-semibold" style={{color:"#008577"}}>
                {dateDiff<0?`Delivered on ${moment(sub.date).format("DD MMMM")}`:dateDiff===0?"Arriving Today":`Arriving on ${moment(sub.date).format("DD MMMM")}`}
            </div>
            <div className="ml-20 pt-10">
            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"#52c2b4"}}>
                <div className="absolute" style={{width:"30vw",marginTop:""}}>
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10">Ordered {main.date}</span>
                </div>
            </div>
            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"#52c2b4"}}>
                <div className="absolute" style={{width:"30vw"}}>
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10">Shipped {main.date}</span>
                </div>
            </div>

            <div className="relative" style={{height:"150px",width:"5px",backgroundColor:`${dateDiff<=0?"#52c2b4":"#e9e7e7"}`}}>
                <div className="absolute" style={{width:"30vw"}}>
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:`${dateDiff<=0?'#52c2b4':'#e9e7e7'}`}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10" style={{color:`${dateDiff>0?"#7b7f7a":"black"}`}}>Out For Delivery</span>
                </div>
</div>
{/* <div className="relative" style={{height:"150px",width:"5px",backgroundColor:"yellow"}}> */}
                <div className="absolute" style={{width:"30vw"}}>
                    <div className="absolute " style={{width:"25px",height:"25px",left:"-10px",backgroundColor:`${dateDiff<=0?dateDiff===0?"#e9e7e7":"#52c2b4":"#e9e7e7"}`}}>
                        <span><i className="fas fa-check inline text-white " style={{fontSize:"23px",paddingTop:""}}></i></span>
                    </div>
                    <span className="ml-10" style={{color:`${dateDiff>0?"#7b7f7a":"black"}`}}>{dateDiff<=0?dateDiff===0?"Arriving Today":`Delivered ${moment(sub.date).format("DD MMMM")}`:`Arriving ${moment(sub.date).format("DD MMMM")}`}</span>
                </div>

            {/* </div> */}
        </div>
            </div>
            <div className="col-span-3">
                <img src={sub.image} alt="a" height={100} width={80}  />
            </div>
                
                
            </div>

            <div className="grid grid-cols-12 mt-16">
                <div className="col-span-2"></div>
                <div className="col-span-2">
                    <div className="border-4" style={{borderColor:"lightgray",minHeight:"8rem"}}>
                        <div className="p-3">
                            <div className="font-semibold text-others-searchSelectText">Shipped with Amazon</div>
                            <div className="mt-3 text-sm font-semibold text-others-searchSelectText">Tracking ID: 123456789</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2">
                    <div className="border-4" style={{borderColor:"lightgray",minHeight:"8rem"}}>
                        <div className="p-3">
                            <div className="font-semibold text-others-searchSelectText">Shipping Address</div>
                            <div className="mt-3 text-sm font-semibold text-others-searchSelectText">{main.name}<br/>{main.address?`${main.address.line1}, ${main.address.line2}, ${main.address.city}, ${main.address.state}, ${main.address.postal_code}`:""}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1"></div>

                <div className="col-span-2">
                    <div className="border-4" style={{borderColor:"lightgray",minHeight:"8rem"}}>
                        <div className="p-3">
                            <div className="font-semibold text-others-searchSelectText">Order Info</div>
                            <div className="mt-3 text-sm font-semibold text-others-searchSelectText">N/A</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2"></div>
            </div>
</div>
        </div>
        <Footer/>
        </>
    )
}
