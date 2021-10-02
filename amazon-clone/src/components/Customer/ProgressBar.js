import React from 'react'

export default function ProgressBar() {
    return (
        <div className="ml-20 pt-20">
            <div className="relative" style={{height:"450px",width:"10px",backgroundColor:"#52c2b4"}}>
                <div className="absolute" style={{width:"30vw",marginTop:""}}>
                    <div className="absolute " style={{width:"30px",height:"30px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white" style={{fontSize:"27px",padding:""}}></i></span>
                    </div>
                    <span className="ml-10">Ordered 7th September</span>
                </div>

                <div className="absolute" style={{width:"30vw",marginTop:"150px"}}>
                    <div className="absolute " style={{width:"30px",height:"30px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white" style={{fontSize:"27px",padding:""}}></i></span>
                    </div>
                    <span className="ml-10">Shipped Today</span>
                </div>

                <div className="absolute" style={{width:"30vw",marginTop:"300px"}}>
                    <div className="absolute " style={{width:"30px",height:"30px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white" style={{fontSize:"27px",padding:""}}></i></span>
                    </div>
                    <span className="ml-10">Out For Delivery</span>
                </div>

                <div className="absolute" style={{width:"30vw",marginTop:"450px"}}>
                    <div className="absolute " style={{width:"30px",height:"30px",left:"-10px",backgroundColor:"#52c2b4"}}>
                        <span><i className="fas fa-check inline text-white" style={{fontSize:"27px",padding:""}}></i></span>
                    </div>
                    <span className="ml-10">Delivered</span>
                </div>

            </div>
        </div>
    )
}
