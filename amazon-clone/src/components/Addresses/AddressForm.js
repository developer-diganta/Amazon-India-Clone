import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';




function AddressForm() {
    const dispatch = useDispatch();
    const user = JSON.parse(useSelector((state)=>state.auth));
    const history = useHistory();
    const addAddressToDB = async (address)=>{
        const res = await fetch("https://a-clone-server.herokuapp.com/addAddress",{
                                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        // credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',0
                                        },
                                        redirect: 'follow', // manual, *follow, error
                                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                        body: JSON.stringify({user:user,address:address})})//Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero.
                                        const ans = await res.json();
                                        if(ans === "VF"){
                                            dispatch({type:"LOGOUT"});
                                            history.push('/resignin');
                                        }

    }


    const addressSubmit=async (e)=>{
        e.preventDefault();
        const address = {
            name:e.target.name.value,
            mob:e.target.mob.value,
            pin:e.target.pin.value,
            flat:e.target.flat.value,
            area:e.target.area.value,
            landmark:e.target.landmark.value,
            town:e.target.town.value,
            state:e.target.state.value,
            addType:e.target.addType.value
        }
        await addAddressToDB(address);
        history.push("/address");
        
    }

    const [popover,changePopover]=useState(false);
    return (
        <div className="bg-white pt-4 pb-6">
            <div className="xl:hidden">
               <div className="font-semibold  w-1/2 mx-auto text-2xl"><span className="text-left">Add a new address</span></div>
                <div className="w-1/2 mx-auto">
                   <form className="mx-auto" onSubmit={(e)=>addressSubmit(e)}>
                       <label htmlFor="full name" className="text-sm ml-1 font-bold">Full Name</label><br/>
                       <input type="text" name="name" required id="full name" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightg ray"}} />
                       <br />
                       <div className="w-5/6">
                       <label htmlFor="mob" className="text-sm ml-1 font-bold">Mobile number 
                       <span className="text-sm float-right inline relative w-max">
                       <div className={`${!popover?"hidden":"absolute bottom-4 w-max mx-auto border-red-200 border-2"}`}>For delivery assistance</div>
                        <span onPointerOver={()=>{changePopover(true)}} onPointerOut={()=>{changePopover(false)}}>Why?</span>
                       </span></label>
                       </div>
                       <input type="text" id="mob" name="mob" required className="w-5/6  mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  />
                       <br />
                       <label htmlFor="pincode" className="text-sm ml-1 font-bold">Pincode</label> <br/>
                       <input type="text" name="pin" required placeholder=" 6 digits [0-9] PIN code" id="pincode" className="w-5/6  mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="line1" className="text-sm ml-1 font-bold">Flat, House no., Building, Company, Apartment</label> <br/>
                       <input type="text" name="flat" id="line1" className="w-5/6  mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="line2" className="text-sm ml-1 font-bold">Area, Street, Sector, Village</label> <br/>
                       <input type="text" name="area" required id="line2" className="w-5/6  mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="landmark" className="text-sm ml-1 font-bold">Landmark</label> <br/>
                       <input type="text" name="landmark" placeholder="E.g. near apollo hospital" id="landmark" className="w-5/6  mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <div className="w-5/6">
                        <label htmlFor="town" className="text-sm ml-1 font-bold">Town/City</label> <br/>
                        <input type="text" id="town" name="town" required className="  mt-1 w-1/2 rounded p-0.5 mb-3 inline" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> 
                        <select name="state" className="inline float-right p-0.5 mb-3 mt-1 bg-gray-200 rounded" style={{maxWidth:"40%"}} id="state">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli and Daman And Diu">Dadar and Nagar Haveli Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Lakshadweep">Ladakh</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            </select>
                            <br/>
                        </div>
                        <div className="w-5/6">
                            <div className="text-lg font-semibold mb-2">Add delivery instructions</div>
                            <div className="text-sm  mb-2">Preferences are used to plan your delivery. However, shipments can sometimes arrive early or later than planned.</div>
                            <div className="text-sm font-bold mb-2">Address Type</div>
                            <select name="addType" id="" className="w-full p-1 rounded border-gray-200 bg-gray-200">
                                <option>Home (7 am - 9pm delivery)</option>
                                <option>Office/Commercial (10 AM - 6PM delivery)</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-amazon_yellow mt-3 pt-2 pb-2 pl-3 pr-3 rounded text-xs" style={{backgroundColor:"#ffd814"}}>Add Adress</button>

                   </form>
                </div> 
             </div>

                {/* Mobile View */}
                <div className="hidden xl:block">

                </div>
                <div className="font-semibold ml-2  mx-auto text-2xl"><span className="text-left">Add a new address</span></div>
                <div className="mx-auto ml-2">
                   <form className="mx-auto" onSubmit={(e)=>addressSubmit(e)}>
                       <label htmlFor="full name" className="text-sm ml-1 font-bold">Full Name</label><br/>
                       <input type="text" name="name" required id="full name" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightg ray"}} />
                       <br />
                       <div className="w-5/6">
                       <label htmlFor="mob" className="text-sm ml-1 font-bold">Mobile number 
                       <span className="text-sm float-right inline relative w-max">
                       <div className={`${!popover?"hidden":"absolute bottom-4 w-max mx-auto border-red-200 border-2"}`}>For delivery assistance</div>
                        <span onPointerOver={()=>{changePopover(true)}} onPointerOut={()=>{changePopover(false)}}>Why?</span>
                       </span></label>
                       </div>
                       <input type="text" id="mob" name="mob" required className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  />
                       <br />
                       <label htmlFor="pincode" className="text-sm ml-1 font-bold">Pincode</label> <br/>
                       <input type="text" name="pin" required placeholder=" 6 digits [0-9] PIN code" id="pincode" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="line1" className="text-sm ml-1 font-bold">Flat, House no., Building, Company, Apartment</label> <br/>
                       <input type="text" name="flat" id="line1" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="line2" className="text-sm ml-1 font-bold">Area, Street, Sector, Village</label> <br/>
                       <input type="text" name="area" required id="line2" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <label htmlFor="landmark" className="text-sm ml-1 font-bold">Landmark</label> <br/>
                       <input type="text" name="landmark" placeholder="E.g. near apollo hospital" id="landmark" className="w-5/6 mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> <br/>
                       <div className="w-5/6">
                        <label htmlFor="town" className="text-sm ml-1 font-bold">Town/City</label> <br/>
                        <input type="text" id="town" name="town" required className="  mt-1 w-1/2 rounded p-0.5 mb-3 inline" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}  /> 
                        <select name="state" className="inline float-right p-0.5 mb-3 mt-1 bg-gray-200 rounded" style={{maxWidth:"40%"}} id="state">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli and Daman And Diu">Dadar and Nagar Haveli Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Lakshadweep">Ladakh</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            </select>
                            <br/>
                        </div>
                        <div className="w-5/6">
                            <div className="text-lg font-semibold mb-2">Add delivery instructions</div>
                            <div className="text-sm  mb-2">Preferences are used to plan your delivery. However, shipments can sometimes arrive early or later than planned.</div>
                            <div className="text-sm font-bold mb-2">Address Type</div>
                            <select name="addType" id="" className="w-full p-1 rounded border-gray-200 bg-gray-200">
                                <option>Home (7 am - 9pm delivery)</option>
                                <option>Office/Commercial (10 AM - 6PM delivery)</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-amazon_yellow mt-3 pt-2 pb-2 pl-3 pr-3 rounded text-xs" style={{backgroundColor:"#ffd814"}}>Add Adress</button>

                   </form>
                </div> 

        </div>
    )
}

export default AddressForm
