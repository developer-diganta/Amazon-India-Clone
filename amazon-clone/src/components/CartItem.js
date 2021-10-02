import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { removeItem } from "../actionCreators/removeItem"





function CartItem(props) {
    const dispatch=useDispatch();
    const user = JSON.parse(useSelector((state)=>state.auth));
    const history = useHistory();
    const rmCart = async () => {
        const res = await fetch("https://a-clone-server.herokuapp.com/removefromcart",{
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
            body: JSON.stringify({user:user,id:props.id,qty:props.qty-1<=0?0:props.qty-1})})//Just a check case incase due to some indiscrepancy the qty becomes less than zero. In reality the lowest limit should be zero.
            const ans = await res.json();
    
            if(ans === "VF"){
                dispatch({type:"LOGOUT"});
                history.push('/resignin');        
            }
        }
    return (
        <div className="mt-10 ml-4">
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                <Link to={`/products/item/${props.id}`}><img src={props.image} alt={props.title} style={{width:"150px",height:"200px"}}/></Link>
                </div>
                <div className="col-span-5 w-full">
                    <Link to={`/products/item/${props.id}`}>
                        <span className="ml-6 hover:text-red-600 text-lg font-medium text-others-searchSelectText  text-left">
                            {props.title}
                        </span>
                    </Link>
                    <div className="inline-block float-right font-bold ml-3">₹{props.price*props.qty}</div>
                    <div className="ml-6 text-xs" style={{color:"#2d8565"}}>In Stock</div>
                    {props.amazonFulfilled?<div className="ml-6 text-xs text-gray-500">Eligible for free shipping</div>:""}
                    {props.amazonFulfilled?<div className="ml-6">Fulfilled</div>:""}
                    <div className="ml-6 text-sm">Qty:{props.qty} <span className="ml-3 text-others-searchSelectText hover:text-red-600 cursor-pointer"
                        onClick={
                            async ()=>{dispatch(removeItem(props.id));
                            user?
                                rmCart()
                                :console.log("...")
                            }}>
                            Delete</span> 
                        <span className="ml-3 text-others-searchSelectText">Save For Later</span> 
                        <span className="ml-3 text-others-searchSelectText">See more like this</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
