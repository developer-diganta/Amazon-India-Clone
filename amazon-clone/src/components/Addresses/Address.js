import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom"
import Footer from "../Footer"
function Address() {
    const user = JSON.parse(useSelector((state)=>state.auth));
    const [email,updateEmail]=useState(user?user.data.result.email:"");
    const [address,getAddresses] = useState([]);
    const [addressCounter,useAddressCounter] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
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
                const ans = await res.json();
                if(ans === "VF"){
                    dispatch({type:"LOGOUT"});
                    history.push('/resignin');
                }
                else
                    getAddresses(ans);
            };
            getAddress();
    },[]);

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
            const ans = await res.json();
            if(ans === "VF"){
                dispatch({type:"LOGOUT"});
                history.push('/resignin');
            }
            else
                getAddresses(ans);
        };

    const removeAddress =  async (id)=>{
        const res = await fetch("https://a-clone-server.herokuapp.com/removeAddress",{
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
        body: JSON.stringify({user:user,id:id})});
        const ans = await res.json();
        if(ans === "VF"){
            dispatch({type:"LOGOUT"});
            history.push('/resignin');
        }
        else
            getAddress();
        //Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero.
    };
    return (
        <div>
            <div className="bg-white" style={{minHeight:"84vh"}}>
                <div style={{marginLeft:"20%",marginRight:"20%"}}>
                <div className="text-2xl pt-4 pb-4 font-semibold">Your Addresses</div>
                    <div className="grid grid-cols-3 pt-2 xl:hidden">
                        <Link to="/newaddress" className="border-dotted border-2 grid border-gray-400 m-2 cursor-pointer">
                            <div className="my-auto text-center"><i className="fas fa-plus text-5xl text-gray-300"></i><br/>
                            <span className="text-2xl font-bold text-gray-500">Add address</span></div>
                        </Link>

                        {address.map((x)=>
                            <div className= " rounded border-2 grid border-gray-400 m-2" style={{borderColor:"lightgray", minHeight:"16rem"}}>
                            <div className="p-2">
                                <div className="text-sm p-2">
                                    <div style={{lineHeight:"1.6"}}><span className="font-bold">{x.name}</span> <br/> {x.flat} <br/> {x.area} <br/> {x.town}, {x.state} {x.pin} <br/> Phone number: {x.mob}</div>
                                    <div className="mt-2">
                                        <span className="text-blue-600">Edit</span> | <span className="text-blue-600 cursor-pointer hover:text-red-600" onClick={async ()=>{await removeAddress(x.id);}}>Remove</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>


                    <div className="hidden xl:block pt-2 ">
                        <div className="border-dotted border-2  border-gray-400 m-2 cursor-pointer">
                            <Link to="/newaddress">
                                <div className="my-auto text-center"><i className="fas fa-plus text-5xl text-gray-300"></i><br/>
                                <span className="text-2xl font-bold text-gray-500">Add address</span></div>
                            </Link>
                        </div>

                        {address.map((x)=>
                            <div className= " rounded border-2  border-gray-400 m-2" style={{borderColor:"lightgray", minHeight:"16rem"}}>
                            <div className="p-2">
                                <div className="text-sm p-2">
                                    <div style={{lineHeight:"1.6"}}><span className="font-bold">{x.name}</span> <br/> {x.flat} <br/> {x.area} <br/> {x.town}, {x.state} {x.pin} <br/> Phone number: {x.mob}</div>
                                    <div className="mt-2">
                                        <span className="text-blue-600">Edit</span> | <span className="text-blue-600 cursor-pointer hover:text-red-600" onClick={async ()=>{await removeAddress(x.id);}}>Remove</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>




                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default Address
