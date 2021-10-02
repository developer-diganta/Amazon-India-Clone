import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../actionCreators/addItem";
import { removeItem } from "../actionCreators/removeItem"

function MobCartItem(props) {
    const dispatch=useDispatch();
    const user = useSelector((state)=>state.auth);
    const it={...props.item};

    return (
        <div className="text-center p-3 mt-4 bg-white">
            <div>
                <img src={props.image} alt={props.title}  className="inline-block my-auto" style={{width:"50px",height:"70px"}}/>
                <div className="inline-block w-1/2 ml-2 text-left float-right">{props.title.length>40?props.title.substring(0,30)+"...":props.title}</div>
                <div className="float-right w-1/2 text-left font-bold">₹{props.price}</div>
                <div className="block clear-both text-left border-2 w-max rounded">
                    <span className="p-2"><button onClick={
                            async ()=>{dispatch(removeItem(props.id));
                            user?
                                await fetch("https://a-clone-server.herokuapp.com/removefromcart",{
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
                                    body: JSON.stringify({email:JSON.parse(user).result.email,id:props.id,qty:props.qty-1<=0?0:props.qty-1})})//Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero.
                                :console.log("...")
                            }}>-</button></span>
                    <span>{props.qty}</span>
                    <span className="p-2"><button onClick={async ()=>{
                                        const item={...it,qty:1}
                                        dispatch(addItem(item));
                                        user?
                                        (
                                        await fetch('https://a-clone-server.herokuapp.com/addToCart',{
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
                                        body: JSON.stringify({item:item,user:user})}))
                                        :console.log("NOT SIGNED IN");
                    }}>+</button></span>
                </div>  
            </div> 
        </div>
    )
}

export default MobCartItem
