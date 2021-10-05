import { Link } from "react-router-dom";
import Footer from "../Footer";
function Account() {
    return (
        <div className="bg-white">
            <div style={{marginLeft:"20%",marginRight:"20%"}}>
                <div className="pt-3 pl-3 text-2xl">
                    Your Account
                </div>
                <div className="grid grid-flow-col grid-cols-6 xl:block">
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-6 pb-8 my-auto">
                            <img src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                            <span className="ml-2 inline-block">
                                <div>Your Orders</div>
                                <div className="text-xs text-gray-400">Track, return, or buy things again</div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-6 pb-8 my-auto">
                            <img src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                            <span className="ml-2 inline-block">
                                <div>Login And Security</div>
                                <div className="text-xs text-gray-400">Login Directly From Accounts</div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 pb-8 text-center">
                            <img className="" src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                            <span className="inline-block ml-2 text-left">
                                <div>Prime</div>
                                <div className="text-xs text-gray-400">View benefits and <br/>payment methods</div>
                            </span>
                        </div>
                    </div>    
                </div>
                <div className="grid grid-flow-col grid-cols-6 border-b-2 border-gray-200 xl:block">
                    
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <Link to="/address">
                            <div className="p-2 pt-6 pb-8 my-auto">
                                <img src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                                <span className="ml-2 inline-block">
                                    <div>Edit Addresses</div>
                                    <div className="text-xs text-gray-400">Edit addresses for orders and gifts</div>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-6 pb-8 my-auto">
                            <img src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                            <span className="ml-2 inline-block">
                                <div>Payment Options</div>
                                <div className="text-xs text-gray-400">Edit or add payment methods</div>
                            </span>
                        </div>
                    </div>                    
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-6 pb-8 my-auto">
                            <img src="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png" alt="Amazon Box" style={{height:"45px",width:"60px",display:"inline-block"}} />
                            <span className="ml-2 inline-block">
                                <div>Amazon Pay balance</div>
                                <div className="text-xs text-gray-400">Add money to your balance</div>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-flow-col grid-cols-6 xl:block">
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Digital content and devices</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Apps and more</li>
                            <li className="pt-2">Content and devices</li>
                            <li className="pt-2">Digital gifts you've received</li>
                        </ul>
                    </div>                    
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Email alerts, messages, and ads</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Advertising preferences</li>
                            <li className="pt-2">Communication preferences</li>
                            <li className="pt-2">SMS alert preferences</li>
                            <li className="pt-2">Message center</li>
                            <li className="pt-2">Alexa shopping notifications</li>
                            <li className="pt-2">Deals Notifications</li>
                        </ul>
                    </div>  
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">More ways to pay</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Default Purchase Settings</li>
                            <li className="pt-2">Amazon Pay</li>
                            <li className="pt-2">Bank accounts for refunds</li>
                            <li className="pt-2">Coupons</li>
                        </ul>
                    </div>  
                </div>
                <div className="grid grid-flow-col grid-cols-6 xl:block">
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Ordering and shopping preferences</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Leave packaging feedback</li>
                            <li className="pt-2">Lists</li>
                            <li className="pt-2">Photo ID proofs</li>
                            <li className="pt-2">Profile</li>
                            <li className="pt-2">Language settings</li>
                        </ul>
                    </div>                    
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Other accounts</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Account Linking</li>
                            <li className="pt-2">Amazon Business registration</li>
                            <li className="pt-2">Seller account</li>
                            <li className="pt-2">Amazon Web Services</li>
                            <li className="pt-2">Login with Amazon</li>
                        </ul>
                    </div>  
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Shopping programs and rentals</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Manage Your Profiles</li>
                            <li className="pt-2">Subscribe & Save</li>
                            <li className="pt-2">Shop the Kids' Store by age</li>
                        </ul>
                    </div>  
                </div>
                <div className="grid grid-flow-col grid-cols-6 xl:block">
                    <div className="col-span-2 rounded  m-4 hover:bg-gray-100" style={{border:"1px solid lightgray"}}>
                        <div className="p-2 pt-3 my-auto">
                            <div className="font-bold">Subscriptions</div>
                        </div>
                        <ul className="list-none p-2 text-sm text-others-searchSelectText">
                            <li className="pt-2">Email</li>
                            <li className="pt-2">Memberships & Subscriptions</li>
                        </ul>
                    </div>
                </div>    
            </div>
            <Footer/>
        </div>
    )
}


export default Account
