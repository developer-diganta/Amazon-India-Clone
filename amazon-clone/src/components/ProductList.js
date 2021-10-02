import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Link, useParams } from 'react-router-dom';
import { changeProductsList } from '../actionCreators/changeProductsList';
import { store } from '../store/store';
import moment from 'moment';

const generateStars=()=>{
    return <i class="fas fa-star text-yellow-500"></i>
}

Modal.defaultStyles.overlay.backgroundColor = 'rgba(255,255,255,0.2)';
const customStyles = {
    content: {
      width:"100%",
      padding:"0",
      height:"auto",
      borderRadius:"10px 10px",
      position: "fixed",       
      bottom: "0px",
      left:"0",
      top:"50%"
    },
  };




const generateProductDisplay = (x)=>{
        return(
            <div className="col-span-1  m-4">
                <Link to={`/products/item/${x.id}`}>
                    <div className="rounded w-full">
                            <div className="xl:hidden" style={{backgroundColor:"#f7f7f7"}}>
                                <img src={x.image} alt="Product" className="mx-auto p-2" style={{minHeight:"250px",maxHeight:"250px",minWidth:"200px",maxWidth:"200px"}}/>
                            </div>
                            <div className="hidden xl:block" style={{backgroundColor:"#f7f7f7"}}>
                                <img src={x.image} alt="Product" className="mx-auto p-2" style={{minHeight:"150px",maxHeight:"150px",minWidth:"100px",maxWidth:"100px"}}/>
                            </div>
                    </div>
                    <div className="text-lg font-bold text-center">
                        <span className="w-6">{x.category[0].toUpperCase()+x.category.substring(1,)}</span>
                    </div>
                    <div className="text-base text-center">
                        {x.title.length>61?<span className="w-6">{x.title.substring(0,60)}....</span>:<span className="w-6">{x.title}</span>}
                    </div>
                    {x.ratings?
                        <div className="text-center">{Array(x.ratings).fill().map(generateStars)}</div>
                        :
                        ""    
                    }
                    <div className="w-full text-center mt-1">
                        <span className="text-center text-lg text-others-search font-semibold">₹{x.finalPrice} </span>
                        <span className="inline text-center text-xs line-through">₹{x.price} </span>
                        <span className="inline text-center text-xs">Save ₹{x.discount} ({x.disP}%)</span>
                    </div>
                    {x.amazonFulfilled?
                        <div className="w-full text-center mt-1" style={{fontSize:"0.9rem"}}>
                        FREE Delivery over ₹499. Fulfilled by Amazon
                        </div>:
                        ""
                    }
                </Link>
            </div>

       )
}

const discounts=[10,20,30,40];
function showPrice(price){
    const disP=discounts[Math.round(Math.random() * 3)];
    const cp=Math.floor(price*70)
    const discount=Math.floor((disP*cp)/100);
    const finalPrice=cp-discount;
    return  {discount,finalPrice,disP};
}

function ProductList() {
    
    const [priceId,priceIdSet]=useState(0);
    const [ratingId,ratingIdSet]=useState(0);
    const [sortByMob,setSortByMob]=useState("FT");
    const [modalIsOpen, setIsOpen] = useState(false);  
    const open = function openModal() {
        setIsOpen(true);
        }
    const close=function closeModal() {
        setIsOpen(false);
        }

    const {id}=useParams();
    const pCheck=store.getState().productsList;
    useEffect(()=>{
        updateProducts(pCheck?id==="all"?store.getState().productsList:store.getState().productsList.filter((x)=>  x.category===id):[])
    },[id,pCheck])
    
    const [products,updateProducts]=useState(pCheck?id==="all"?store.getState().productsList:store.getState().productsList.filter((x)=>  x.category===id):[]);
    const dispatch = useDispatch(); 
    if(pCheck===null){
        p();
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
        dispatch(changeProductsList(await productsList));
        updateProducts(id==="all"?await productsList:await productsList.filter((x)=>x.category===id));
    }
    const [sortUpdate,setSortUpdate] = useState(false);
    const [ratingSort,setRatingSort] = useState(false);
    const [discountSort,setDiscountSort] = useState(false);
    const sortByPrice=(e)=>{
        e.preventDefault();
        const min=e.target.min.value||0;
        const max=e.target.max.value||100000000;
        if(!sortUpdate){
            updateProducts(products.filter((x)=>{return (x.finalPrice>=min && x.finalPrice<=max)}));
            setSortUpdate(true);
        }
        else{
            const productsFeed = store.getState().productsList.filter((x)=>{return x.category===id});
            updateProducts(productsFeed.filter((x)=>{return(x.finalPrice>=min && x.finalPrice<=max)}));
        }
    }

    const sortByRatings=(e)=>{
        e.preventDefault();
        const ratingThreshold=e.target.rating.value;
        if(!ratingSort){
            updateProducts(products.filter((x)=>{return (x.ratings>=ratingThreshold)}));
            setRatingSort(true);
        }
        else{
            const productsFeed = store.getState().productsList.filter((x)=>{return x.category===id});
            updateProducts(productsFeed.filter((x)=>{return(x.ratings>=ratingThreshold)}));
        }
    }

    const sortByDiscount=(e)=>{
        e.preventDefault();
        const discountThreshold=e.target.discount.value;
        if(!discountSort){
            updateProducts(products.filter((x)=>{return (x.disP>=discountThreshold)}));
            setDiscountSort(true);
        }
        else{
            const productsFeed = store.getState().productsList.filter((x)=>{return x.category===id});
            updateProducts(productsFeed.filter((x)=>{return(x.disP>=discountThreshold)}));
        }
    }
    const [sortCheck,updateSortCheck]=useState(false);
    const sortBy = (e)=>{
        const sortVal=e.target.value;
        switch(sortVal){
            case "FT":  const productsFeed = store.getState().productsList.filter((x)=>{return x.category===id});
                        updateProducts(productsFeed);
                        updateSortCheck(false);
                        break;
            case "LTOH":const sortedAscData = [...products].sort((a, b) => {
                            return a.finalPrice - b.finalPrice;
                        });
                        updateProducts(sortedAscData);
                        updateSortCheck(true);
                        break;
            case "HTOL":const sortedDescData = [...products].sort((a, b) => {
                            return b.finalPrice - a.finalPrice;
                          });
                        updateProducts(sortedDescData);
                        updateSortCheck(true);
                        break;
            case "ACR":const sortedByReview = [...products].sort(function(a,b){
                            return b.ratings-a.ratings;
                        })
                        updateProducts(sortedByReview);
                       updateSortCheck(true);
                       break;
            default:break;
        }
    }

    const sortByMobView = (e)=>{
        e.preventDefault();
        const sortValMob=e.target.stVal.value;
        switch(sortValMob){
            case "FT":  const productsFeed = store.getState().productsList;
                        updateProducts(productsFeed);
                        updateSortCheck(false);
                        break;
            case "LTOH":updateProducts(products.sort(function(a,b){
                            return a.finalPrice-b.finalPrice;
                        }));
                        updateSortCheck(true);
                        break;
            case "HTOL":updateProducts(products.sort(function(a,b){
                        return b.finalPrice-a.finalPrice;
                        }));
                        updateSortCheck(true);
                        break;
            case "ACR":updateProducts(products.sort(function(a,b){
                       return b.ratings-a.ratings;
                       }));
                       updateSortCheck(true);
                       break;
            default:break;

    }
}
    
    return (    
    products?
        <div className="bg-white">
            <div className="xl:hidden w-full shadow-md bg-white p-3 my-auto flex">
                <div className="ml-10 text-sm my-auto font-normal">
                    1-{products.length*3} of {products.length*3} results for <span className="text-others-search font-bold">{id}</span>
                </div>
                <div className="right-24 absolute text-xs my-auto pl-1 rounded pr-1 bg-others-sort " style={{boxShadow:"0 0 2px 2px lightgray"}}>
                    
                    <span >
                    <label>Sort By: </label> 
                            <select className="bg-others-sort cursor-pointer outline:none" onChange={sortBy}>
                                <option value="FT" >Featured</option>
                                <option value="LTOH"  className=" outline:none ">Price: Low to High</option>
                                <option value="HTOL" >Price: High to Low</option>
                                <option value="ACR" >Avg. Customer Reviews</option>
                            </select>
                    </span>
                </div>
            </div>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={close}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <div className="h-12 border-b-2 border-b-gray-300 p-2 text-right font-medium" style={{color:"#1e8294"}}>
                <span  onClick={close} >Close</span>
            </div>  
            <div className="text-base font-medium p-2 mt-1">
                Price and Deals
                <span className="absolute right-0 mr-5 text-xs p-1" style={{color:"gray"}}><i className="fas fa-angle-down"></i></span>
            </div>
            <div>
                <form className={`inline-block m-3 rounded p-3  text-xs ${priceId===1?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}   onSubmit={sortByPrice}>
                    <input type="hidden" name="min" value="0"/>
                    <input type="hidden" name="max" value="1999"/>
                    <button onClick={()=>priceIdSet(1)} className={`font-medium ${priceId===1?'text-others-searchSelectText':'text-black'}`} type="submit">Under ₹2,000</button>
                </form>
                            
                <form className={`inline-block m-3 rounded p-3 text-xs ${priceId===2?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByPrice}>
                    <input type="hidden" name="min" value="2000"/>
                    <input type="hidden" name="max" value="3999"/>
                    <button onClick={()=>priceIdSet(2)} className={`font-medium ${priceId===2?'text-others-searchSelectText':'text-black'}`} type="submit">₹2,000 - ₹4,000</button>
                </form>
                          
                <form className={`inline-block m-3 rounded p-3 text-xs ${priceId===3?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByPrice}>
                    <input type="hidden" name="min" value="4000"/>
                    <input type="hidden" name="max" value="4999"/>
                    <button onClick={()=>priceIdSet(3)} className={`font-medium ${priceId===3?'text-others-searchSelectText':'text-black'}`} type="submit">₹4,000 - ₹5,000</button>
                </form>
                          
                <form className={`inline-block m-3 rounded p-3 text-xs ${priceId===4?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByPrice}>
                    <input type="hidden" name="min" value="5000"/>
                    <input type="hidden" name="max" value="6000"/>
                    <button onClick={()=>priceIdSet(4)} className={`font-medium ${priceId===4?'text-others-searchSelectText':'text-black'}`} type="submit">₹5,000 - ₹6,000</button>
                </form>
                          
                <form className={`inline-block m-3 rounded p-3 text-xs ${priceId===5?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByPrice}>
                    <input type="hidden" name="min" value="6001"/>
                    <input type="hidden" name="max" value="100000000000"/>
                    <button onClick={()=>priceIdSet(5)} className={`font-medium ${priceId===5?'text-others-searchSelectText':'text-black'}`} type="submit">Over ₹6,000</button>
                </form>
            </div>
            <div className="text-base font-medium p-2 mt-1">
                Customer Reviews
                <span className="absolute right-0 mr-5 text-xs p-1" style={{color:"gray"}}><i className="fas fa-angle-down"></i></span>
            </div>
            <div>
                <form className={`inline-block m-3 rounded p-3  text-xs ${ratingId===1?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`} onSubmit={sortByRatings}>
                    <input type="hidden" name="rating" value="4"/>
                    <button type="submit" onClick={()=>ratingIdSet(1)}>{Array(4).fill().map(generateStars)} <span className="text-xs font-medium">& Up</span></button>
                </form>
                <form className={`inline-block m-3 rounded p-3  text-xs ${ratingId===2?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`} onSubmit={sortByRatings}>
                    <input type="hidden" name="rating" value="3"/>
                    <button type="submit" onClick={()=>ratingIdSet(2)}>{Array(3).fill().map(generateStars)} <span className="text-xs font-medium">& Up</span></button>
                </form>    
                <form className={`inline-block m-3 rounded p-3  text-xs ${ratingId===3?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`} onSubmit={sortByRatings}>
                    <input type="hidden" name="rating" value="2"/>
                    <button type="submit" onClick={()=>ratingIdSet(3)}>{Array(2).fill().map(generateStars)} <span className="text-xs font-medium">& Up</span></button>
                </form>      
                <form className={`inline-block m-3 rounded p-3  text-xs ${ratingId===4?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`} onSubmit={sortByRatings}>
                    <input type="hidden" name="rating" value="1"/>
                    <button type="submit" onClick={()=>ratingIdSet(4)}>{Array(1).fill().map(generateStars)} <span className="text-xs font-medium">& Up</span></button>
                </form>          
            </div>
            <div className="text-base font-medium p-2 mt-1">
                Sort By
                <span className="absolute right-0 mr-5 text-xs p-1" style={{color:"gray"}}><i className="fas fa-angle-down"></i></span>
                <div>
                    <form className={`inline-block m-3 rounded p-3  text-xs ${sortByMob==="FT"?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByMobView}>
                        <input type="hidden" name="stVal" value="FT"/>
                        <button onClick={()=>setSortByMob("FT")} className={`font-medium ${sortByMob==="FT"?'text-others-searchSelectText':'text-black'}`} type="submit">Featured</button>
                    </form>
                                
                    <form className={`inline-block m-3 rounded p-3 text-xs ${sortByMob==="LTOH"?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByMobView}>
                        <input type="hidden" name="stVal" value="LTOH"/>
                        <button onClick={()=>setSortByMob("LTOH")} className={`font-medium ${sortByMob==="LTOH"?'text-others-searchSelectText':'text-black'}`} type="submit">Price: Low to High</button>
                    </form>
                            
                    <form className={`inline-block m-3 rounded p-3 text-xs ${sortByMob==="HTOL"?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByMobView}>
                        <input type="hidden" name="stVal" value="HTOL"/>
                        <button onClick={()=>setSortByMob("HTOL")} className={`font-medium ${sortByMob==="HTOL"?'text-others-searchSelectText':'text-black'}`} type="submit">Price: High to Low</button>
                    </form>
                            
                    <form className={`inline-block m-3 rounded p-3 text-xs ${sortByMob==="ACR"?'bg-others-searchSelect text-others-searchSelectText':'bg-others-search2'}`}  onSubmit={sortByMobView}>
                        <input type="hidden" name="stVal" value="ACR"/>
                        <button onClick={()=>setSortByMob("ACR")} className={`font-medium ${sortByMob==="ACR"?'text-others-searchSelectText':'text-black'}`} type="submit">Avg. Customer Review</button>
                    </form>
                </div>
            </div>
            </Modal>







            <div className="hidden xl:block text-sm p-4 w-full bg-white border-t-2 border-b-2 border-gray-300">
                <div className="inline-block">
                    Prime
                </div>
                <div className="absolute right-2 my-auto inline-block">
                    <span className="font-medium" onClick={open} style={{color:"#1e8294"}}>Filters <i class="fas fa-angle-down"></i></span>
                </div>
            </div>

            <div className="xl:hidden grid grid-cols-12 text-sm">
                <div className="col-start-1 col-span-3 overflow-y-auto" style={{minHeight:"80.5vh"}}>
                    <div className="mt-6 ml-6">
                        <div className="font-bold">Department</div>
                        <span>Clothing & Accessories</span>
                        <ul className="list-none ml-2">
                            <li>Men's T-Shirts</li>
                            <li>Men's Polos</li>
                            <li>Boy's T-Shirts</li>
                            <li>Women's T-Shirts</li>
                        </ul>
                        <div className="font-bold mt-3">Avg. Customer Review</div>
                        <ul className="list-none ml-2">
                            <li>
                                <form onSubmit={sortByRatings}>
                                    <input type="hidden" name="rating" value="4"/>
                                    <button type="submit">{Array(4).fill().map(generateStars)} <span className="text-xs">& Up</span></button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByRatings}>
                                    <input type="hidden" name="rating" value="3"/>
                                    <button type="submit">{Array(3).fill().map(generateStars)} <span className="text-xs">& Up</span></button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByRatings}>
                                    <input type="hidden" name="rating" value="2"/>
                                    <button type="submit">{Array(2).fill().map(generateStars)} <span className="text-xs">& Up</span></button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByRatings}>
                                    <input type="hidden" name="rating" value="1"/>
                                    <button type="submit">{Array(1).fill().map(generateStars)} <span className="text-xs">& Up</span></button>
                                </form>
                            </li>
                        </ul>
                        <div className="font-bold mt-3">Price</div>
                        <ul className="list-none ml-2">
                            <li>
                                <form onSubmit={sortByPrice}>
                                    <input type="hidden" name="min" value="0"/>
                                    <input type="hidden" name="max" value="1999"/>
                                    <button type="submit">Under ₹2,000</button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByPrice}>
                                    <input type="hidden" name="min" value="2000"/>
                                    <input type="hidden" name="max" value="3999"/>
                                    <button type="submit">₹2,000 - ₹4,000</button>
                                </form>
                            </li>                            
                            <li>
                                <form onSubmit={sortByPrice}>
                                    <input type="hidden" name="min" value="4000"/>
                                    <input type="hidden" name="max" value="4999"/>
                                    <button type="submit">₹4,000 - ₹5,000</button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByPrice}>
                                    <input type="hidden" name="min" value="5000"/>
                                    <input type="hidden" name="max" value="6000"/>
                                    <button type="submit">₹5,000 - ₹6,000</button>
                                </form>
                            </li>                            
                            <li>
                                <form onSubmit={sortByPrice}>
                                    <input type="hidden" name="min" value="6001"/>
                                    <input type="hidden" name="max" value="100000000000"/>
                                    <button type="submit">Over ₹6,000</button>
                                </form>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <form onSubmit={sortByPrice}> 
                                <input className="inline w-12 shadow-inner rounded focus:outline-none  mr-2 h-8" name="min" type="text" placeholder="₹ Min" style={{border:"1px solid gray"}}/>
                                <input className="inline w-12 shadow-inner rounded focus:outline-none  mr-2 h-8" name="max" type="text" placeholder="₹ Max" style={{border:"1px solid gray"}}/>
                                <button className="inline p-1 w-9 rounded shadow-md h-8" style={{border:"1px solid gray"}}>Go</button>      
                            </form>
                        </div>
                        <div className="font-bold mt-3">Discount</div>
                        <ul className="list-none ml-2">
                            <li>
                                <form onSubmit={sortByDiscount}>
                                    <input type="hidden" name="discount" value="10"/>
                                    <button type="submit">10% Off or more</button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByDiscount}>
                                    <input type="hidden" name="discount" value="20"/>
                                    <button type="submit">20% Off or more</button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByDiscount}>
                                    <input type="hidden" name="discount" value="30"/>
                                    <button type="submit">30% Off or more</button>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={sortByDiscount}>
                                    <input type="hidden" name="discount" value="40"/>
                                    <button type="submit">40% Off or more</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/2 rounded mx-auto border-2 mt-2">
                        <img  src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" className="mx-auto p-4" style={{width:"100px",height:"140px"}}/>
                        <div className="text-md w-2/3 mx-auto">
                            Mens Casual Premium Slim Fit T-Shirts
                            <button className="bg-cart_color p-1 mx-auto border-2 rounded block">Shop Now</button>
                        </div>
                    </div>
                    <div className="w-1/2 rounded mx-auto border-2 mb-2">
                        <img  src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg" className="mx-auto p-4" style={{width:"100px",height:"140px"}}/>
                        <div className="text-md w-2/3 mx-auto">
                            DANVOUY Womens T Shirt Casual Cotton Short
                            <button className="bg-cart_color p-1 mx-auto border-2 rounded block">Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="col-end-13 col-span-9 mt-8">
                    <div className="grid grid-cols-4 justify-items-center">
                        {products.map(generateProductDisplay)}
                        {!sortCheck?products.map(generateProductDisplay):""}
                        {!sortCheck?products.map(generateProductDisplay):""}
                    </div>
                </div>
            </div>
            <div className="hidden xl:grid xl:grid-cols-2 justify-items-center">
                        {products.map(generateProductDisplay)}
                        {!sortCheck?products.map(generateProductDisplay):""}
                        {!sortCheck?products.map(generateProductDisplay):""}
                    </div>
        </div>
        :
        ""
    )
}

export default ProductList
