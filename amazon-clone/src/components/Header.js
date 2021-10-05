import India from "./India.png" 
import {shallowEqual, useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import changeUser from "../actionCreators/changeUser";
import {changeLocation} from "../actionCreators/changeLocation";
import {Link, useHistory} from "react-router-dom";
import Grocery from "./icons/grocery.png";
import Mobile from "./icons/mobiles.png";
import Fashion from "./icons/fashion.png";
import Essential from "./icons/essential.png";
import Electronics from "./icons/electronics.png";
import Home from "./icons/home.png";
import Appliances from "./icons/appliances.png";
import Modal from 'react-modal';
import App from "./icons/app.png"
import { addItem } from "../actionCreators/addItem";
import AmazonIndiaLogo from "./icons/amazonIndia.png";
import Fuse from "fuse.js";
import moment from "moment";
import { changeProductsList } from "../actionCreators/changeProductsList";
import OutsideClickHandler from 'react-outside-click-handler';


//Custom Styles For Address Modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:"10px",
    },
};

export default function Header(){
    const history=useHistory();
    const dispatch = useDispatch();
    const [user,updateUser] = useState(JSON.parse(localStorage.getItem('amazon-clone-profile')));//to get a user from local storage if exists
    const[loc,getLoc]=useState(JSON.parse(localStorage.getItem("amazon-clone-location")));//to get the location from local storage (if exists)
    const u = useSelector((state)=>state.auth);//to get updated user from redux store

    if(JSON.parse(localStorage.getItem('amazon-clone-profile'))!==null){//to check if already user was login in prior...and sending data,if present, to redux store
        dispatch(changeUser(user));
    }

    const cart=useSelector(((state)=>{//get cart
        const items=state.basket;
        let total=0;
        for(let i=0;i<items.length;i++){
            total+=items[i].qty;
        }
        return total;
        }),shallowEqual);

    const [cartItems,updateCartItems]=useState(JSON.parse(localStorage.getItem('amazon-clone-cart'))?
        ()=>{            
            let total=0;
            const a=JSON.parse(localStorage.getItem('amazon-clone-cart'));
            for(let i=0;i<a.length;i++){
                total+=a[i].qty;
            }
            return total;
        }
        :0||cart);

    useEffect(()=>{
        updateCartItems(cart);
    },[cart])
    // A recuring function to get revised prices
    /* Since data of items has been taken from fakestore api, thus stars and revised prices i.e. discounts is not available. Thus these functions decide upon those values
    randomly. The entire new collection of items is sent to the redux store. This part is repeated in most components because if the user refreshes then the redux store is cleared,
    and then the data is lost. This ensures that no such thing happens..*/
    function showPrice(price){
        const discounts=[10,20,30,40];
        const disP=discounts[Math.round(Math.random() * 3)];
        const cp=Math.floor(price*70)
        const discount=Math.floor((disP*cp)/100);
        const finalPrice=cp-discount;
        return  {discount,finalPrice,disP};
    }
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
    }
    const products = useSelector((state)=>state.productsList);
    products===null?p():console.log("");
    const [search,updateSearch]=useState('');
    //Fuse.js used to do fuzzy search on products present.
    const fuse = new Fuse(products?products:p(), {
        keys: [
          'title',
          'description',
          'category'
        ],
        includeScore: true
      });
      const results = fuse.search(search);
      const searchResults = results.map(results => results.item);

    const Items = useSelector((state)=>state.basket);
    const email=useSelector((state) => JSON.parse(state.auth)?.data.result.email);
    const [focusDetect,changeFocus] = useState(false);
    
    useEffect(()=>{
        async function getFromDB (){
            const res =await fetch('https://a-clone-server.herokuapp.com//getItems',{
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
                body: JSON.stringify({user:u?JSON.parse(u):user})});
                const itemsFromDB = await res.json();
                if(itemsFromDB === "VF"){//token check
                    // logout();
                    // localStorage.removeItem("amazon-clone-profile")
                    dispatch({type:"LOGOUT"});
                    updateUser(null)
                    history.push('/resignin')                    
                }
                else{
                let total = 0;
                if(await itemsFromDB){
                    for(let i = 0;i<itemsFromDB.basket.length;i++)
                    total = total+itemsFromDB.basket[i].qty;
                }
                    else
                        console.log("NOT DB");

                //updation of carts... if there is a mismatch of numbers..either at server end or client end
                if(total<cartItems){
                    const response = await fetch("https://a-clone-server.herokuapp.com//addEntireToCart",{
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
                        body: JSON.stringify({items:Items,user:u?JSON.parse(u):user})})
                }
                else if(await itemsFromDB && total>cartItems){
                    itemsFromDB.basket.map((x)=>dispatch(addItem(x)))
                }
                else{
                   
                }    
        }
    }
        getFromDB();
        // updateuserDetails(localStorage.getItem('amazon-clone-profile'));
    },[email,user])

    //location - "deliver to"
    if(loc!==null){
        dispatch(changeLocation(loc));
    }

    const logout = () =>{
        dispatch({type:"LOGOUT"});
        updateUser(null);
        history.push("/signin")
    }
        
    const [modalIsOpen, setIsOpen] = useState(false);  
    const open = function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const getLocation = async (e)=>{
        e.preventDefault();
        const pinCode=e.target.pin.value;
        const URL = "https://api.postalpincode.in/pincode/"+pinCode;
        const response = await fetch(URL);
        const location= await response.json();
        localStorage.setItem('amazon-clone-location', JSON.stringify({...{PO:await location[0].PostOffice[1].Name,PIN:pinCode}}));
        dispatch(changeLocation({PO:await location[0].PostOffice[1].Name,PIN:pinCode}));
        getLoc({PO:await location[0].PostOffice[1].Name,PIN:pinCode});
        closeModal();
    }
    function onSearch({ currentTarget }) {
        updateSearch(currentTarget.value);
      }
      

    return(
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="bg-search_1 p-4 rounded " style={{width:"100%"}}>
                    Choose your location
                </div>
                <div className="p-4">
                    Enter An Indian Pincode
                    <form onSubmit={getLocation}>
                        <input className="w-2/3 p-1 border-2 border-black rounded inline" type="text" pattern="[0-9]{6}" title="Six digit zip code" name="pin"/>
                        <button type="submit"  className="inline ml-2 p-2 text-sm font-bold bg-gradient-to-t from-amazon_yellow  to-gray-100 rounded active:bg-gray-400">Apply</button>
                    </form>
                </div>
            </Modal>
            <div className="w-full flex bg-amazon_blue p-2" style={{width:"100%"}}>
                <div className="my-auto">
                    <Link to="/"><img className="ml-1" src={AmazonIndiaLogo}  style={{minWidth:"100px",minHeight:"70px",maxHeight:"70px",maxWidth:"100px"}} alt="Amazon Logo"/></Link>
                </div>
                <div className="xl:hidden ml-4 my-auto">
                    <div className="flex-col my-auto">
                        <span className="text-xs  text-white">
                            {u?
                                `Deliver to ${JSON.parse(u).data.result.name.split(" ")[0]}`:user?`Deliver to ${user.data.result.name.split(" ")[0]}`:
                                loc?"Deliver to":"Hello"
                            }
                        </span>
                        <br/>
                        <span className=" text-sm font-bold cursor-pointer  text-white">
                                <i className="fas fa-map-marker-alt"></i>
                                {loc?
                                <span onClick={open}>{loc.PO}</span>
                                :
                                <span  onClick={open}>Set address</span>
                                }        
                        </span>
                    </div>
                </div>
                <div className="xl:hidden w-7/12 my-auto ml-4 mr-3 rounded flex " style={focusDetect?{border:"2px solid orange"}:{border:""}}>
                    <div className="bg-search_1 flex h-10 text-center border-2 rounded-l  border-transparent">
                        <span className="my-auto p-2 text-xs ml-2 mr-2">All</span>
                    </div>
                    <div className="w-full"  >
                        <OutsideClickHandler
                            onOutsideClick={() => {
                            changeFocus(false)
                            }}
                        >
                            <input type="text" className={`${focusDetect?"":""} w-full focus:outline-none pl-2 h-10`}  value={search} onFocus={()=>changeFocus(true)} onChange={onSearch}/>
                            {searchResults.length>0?
                                <span className={`${focusDetect?"":"hidden"} block relative`} style={{borderTop:"1px black solid"}}>
                                    <ul className="absolute z-30 bg-white w-full" style={{borderLeft:"1px lightgray solid",borderRight:"1px lightgray solid",borderBottom:"1px lightgray solid"}}>
                                        {searchResults.map((x)=><li className="font-bold p-2 pointer" ><Link to={`/products/item/${x.id}`}><span onClick={()=>changeFocus(false)} className="pointer">{x.title}</span></Link></li>)}
                                    </ul>
                                </span>
                            :
                            <span></span>
                            }
                        </OutsideClickHandler>
                    </div>
                    <Link to={`/product/${searchResults.length>0?searchResults[0].category:"all"}`}>
                        <div className="bg-amazon_yellow flex h-10 text-center border-2 rounded-r border-transparent">
                            <button className="my-auto ml-3 mr-3"><i className="fas fa-search text-xl"></i></button>
                        </div>
                    </Link>
                </div>
                <div className="xl:hidden my-auto ml-6">
                    <img src={India} height="15" width="25" alt="India-English" />
                </div>                
                <div className="xl:hidden text-white w-auto ml-9  my-auto">
                    {u?
                        <p className="text-xs cursor-pointer hover:underline" onClick={logout}>Hello, {JSON.parse(u).data.result.name.split(" ")[0]}</p>:user?  <p className="text-xs cursor-pointer hover:underline" onClick={logout}>Hello, {user.data.result.name.split(" ")[0]}</p>
                    :
                    <p onClick={()=>history.push("/signin")} className="text-xs cursor-pointer hover:underline">Hello, Sign In</p>     
                    
                    }

                    <p className="text-sm font-bold" >{user?<Link to="/account">Account & Lists</Link>:"Account & Lists"}</p>
                </div>
                <Link to="/messagecenter" className="xl:hidden text-white w-auto ml-9 my-auto">
                    <p className="text-xs">Returns</p>
                    <p className="text-sm font-bold">& Orders</p>
                </Link>   
                <div className="xl:right-8 xl:absolute  text-white w-auto ml-9 my-auto xl:ml-0">
                    <div className="flex items-center relative mt-2">
                        <div className="hidden xl:block right-0 mr-3">
                        
                            {u?
                                <span className="text-sm font-semibold" onClick={logout}>{JSON.parse(u).data.result.name.split(" ")[0]}</span>:user?  <span className="text-sm font-semibold" onClick={logout}>{user.data.result.name.split(" ")[0]}</span>
                    :
                    <span onClick={()=>history.push("/signin")} className="text-xs cursor-pointer hover:underline">Sign In</span>     
                    
                    }
                        > <i className="fas fa-user text-xl"></i>
                        </div>
                        <Link to="/cart">
                            <span className=" top-0 absolute w-4 h-4 right-6  xl:right-0 text-xs text-center font-bold  rounded-full bg-cart_color" style={{borderRadius:"50%"}}>{cartItems}</span>        
                            <i className="fas fa-shopping-cart text-3xl "></i>
                            <span className="xl:hidden  text-sm font-bold">Cart</span>
                        </Link>          
                    </div>
                </div>
 
            </div>
            <div className="lgsc:hidden bg-amazon_blue pb-3 " style={{width:"100%"}}>
                <div className="text-center">
                    <input className="w-2/3 rounded-l h-10 inline"></input>
                    <div className=" bg-amazon_yellow p-2 inline  text-center border-2 rounded-r border-transparent">
                        <button ><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <div className="ml-2 mt-2 text-white font-medium">
                    <div className="inline p-2">
                        <Link to="/" className=""><span className=" block text-xs font-normal  ml-2">Shop By</span><span className=" ml-2"></span>Category</Link>  
                    </div>
                    <Link to="/" className="p-2">Wish List</Link>  
                    <Link to="/" className="p-2">Deals</Link>  
                    <Link to="/" className="p-2">Sell</Link>  
                </div>
            </div>


            {/* // NAVBAR PART 2 */}
            
            
            <div className="xl:hidden w-full flex bg-amazon_blue-light  p-1">
                <div className="ml-4 font-medium text-white">
                    <Link to="/">                     
                        <i className="fas fa-bars text-lg"></i>
                        <span className="text-white  hover:underline pr-3 text-sm font-medium"> All</span> 
                    </Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Prime</Link>
                    <Link to="/product/electronics" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Electronics</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Mobiles</Link>
                    <Link to="/product/all" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Best Sellers</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Buy Again</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Customer Service</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Home Improvement</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">Sports, Fitness & Outdoors</Link>
                    <Link to="/" className="text-white p-1 pl-3 hover:underline pr-3 text-sm font-medium">AmazonBasics</Link>
                </div>
                <span className="right-2 xl:hidden text-white font-medium absolute">
                    <img src={App} alt="App" className="inline" style={{width:"22px",height:"22px"}} /> Download The App
                </span>
            </div> 
            <div className="lgsc:hidden w-full flex bg-amazon_blue-light p-1">
                {
                    loc?
                    <div className="text-white  text-center text-sm font-semibold p-2">
                        <i className="fas fa-map-marker-alt"> </i>
                        <span onClick={open}> Deliver to {loc.PO}</span>
                    </div>
                        :
                    <div className="text-white  text-center text-sm font-semibold p-2">
                        <i className="fas fa-map-marker-alt"> </i>
                        <span  onClick={open}> Select a location to see product availability</span>
                    </div>       
                }
            </div>
            <div className="lgsc:hidden overflow-x-auto p-2 text-xs flex ">
                <Link to="/" className="m-1 p-1 items-center">
                    <span><img className="h-8" src="https://icons.iconarchive.com/icons/sicons/basic-round-social/512/amazon-icon.png" alt="Prime"/></span>
                    Prime
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Grocery} alt="Grocery"/></span>
                    Grocery
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Mobile} alt="Mobile"/></span>
                    Mobiles
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Fashion} alt="Fashion"/></span>
                    Fashion
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Essential} alt="Essentials"/></span>
                    Essentials
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Electronics} alt="Electronics"/></span>
                    Electronics
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Home} alt="Home"/></span>
                    Home
                </Link>
                <Link to="/" className="m-1 p-1">
                    <span className=" inline items-center mx-auto"><img className="h-8 mx-auto"  src={Appliances} alt="Appliances"/></span>
                    Appliances
                </Link>
            </div>
        </>
    )
}