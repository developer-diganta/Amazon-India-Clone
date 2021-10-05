import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import changeUser from '../../actionCreators/changeUser';
import AmazonIndiaLogo from "../icons/AmazonLogo2.JPG";

export default function Signup() {
    const [name,updateName] = useState("");
    const [password,updatePassword] = useState("");
    const [email,updateEmail] = useState("");
    const [wrongCredentials,updateWrongCredentials] = useState(false);
    const history = useHistory();

    const addUser = async(formData)=>{
        const res =await fetch("https://a-clone-server.herokuapp.com/signup",{
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
        body: JSON.stringify(formData)});
        return await res;
    };
    const dispatch = useDispatch();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = {
            name:name,
            email:email,
            password:password,
        };
        const res = await addUser(formData);
        const data = await res.json();
        dispatch(changeUser({type:"LOGIN",data:data}));
        history.push("/");

    }
    return (
        <div className="bg-white pt-10" style={{minHeight:"100vh"}}>
        <div>
            <img src={AmazonIndiaLogo} alt="" className="mx-auto mb-4" />
        </div>
        <div className="xl:hidden rounded w-3/12 mx-auto mt-3" style={{borderColor:"lightgray",borderWidth:"1px"}}>
        <div className="p-4">
            <div className="text-3xl font-semibold">
                Sign-Up
            </div>
            {
                wrongCredentials?
                <div className="rounded bg-gradient-to-t from-red-400 to-red-300 text-sm pt-3 pb-3 font-semibold p-2 mt-3">
                Wrong Credentials/Existing User
                </div>
                :
                ""
            }


            <form className="pt-6" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-semibold">Name</label><br/>
                <input  type="text" required onChange={(y)=>{updateName(y.target.value)}}  id="name" name="name" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}/><br/>

                <label htmlFor="email" className="text-sm font-semibold">Email</label><br/>
                <input  type="email" required onChange={(x)=>{updateEmail(x.target.value)}}   id="email" name="email" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}/><br/>
                
                
                <label htmlFor="pass" className="text-sm font-semibold">Password</label><br/>

                <input type="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*=+-]).{8,12}$" onChange={(z)=>{updatePassword(z.target.value)}}   name="password" id="pass" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}} /><br/>
                <div className="text-xs text-yellow-500 font-bold mb-2">Password should be of minimum 8 and maximum 12 characters and should have at least 1 number, 1 upper case,1 lower case and one symbol !@#$%&*=+-</div>
                
                <button type="submit" className="rounded bg-gradient-to-t  from-others-proceed border-black  to-others-proceed2 w-full text-sm cursor-pointer hover:from-others-proceed hover:to-others-proceed pt-2 pb-2" style={{borderWidth:"1px",borderColor:"black"}}>Continue</button>
            </form>
            <div className="mt-4 text-xs">
            By continuing, you agree to Amazon CLONE's Conditions of Use and Privacy Notice.
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account? <Link to="/signin" className=" text-blue-600 hover:text-red-500 hover:underline">Sign In</Link>
            </div>
        </div>

        </div>

        <div className="hidden xl:block rounded ml-2 mr-2 mx-auto mt-3" style={{borderColor:"lightgray",borderWidth:"1px"}}>
        <div className="p-4">
            <div className="text-3xl font-semibold">
                Sign-Up
            </div>
            {
                wrongCredentials?
                <div className="rounded bg-gradient-to-t from-red-400 to-red-300 text-sm pt-3 pb-3 font-semibold p-2 mt-3">
                Wrong Credentials/Existing User
                </div>
                :
                ""
            }


            <form className="pt-6" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-semibold">Name</label><br/>
                <input  type="text" required onChange={(y)=>{updateName(y.target.value)}}  id="name" name="name" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}/><br/>

                <label htmlFor="email" className="text-sm font-semibold">Email</label><br/>
                <input  type="email" required onChange={(x)=>{updateEmail(x.target.value)}}   id="email" name="email" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}}/><br/>
                
                
                <label htmlFor="pass" className="text-sm font-semibold">Password</label><br/>

                <input type="password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*=+-]).{8,12}$" onChange={(z)=>{updatePassword(z.target.value)}}   name="password" id="pass" className="w-full mt-1 rounded p-0.5 mb-3" style={{border:"1px lightgray solid",boxShadow:"inset 0px 0px 1px lightgray"}} /><br/>
                <div className="text-xs text-yellow-500 font-bold mb-2">Password should be of minimum 8 and maximum 12 characters and should have at least 1 number, 1 upper case,1 lower case and one symbol !@#$%&*=+-</div>
                
                <button type="submit" className="rounded bg-gradient-to-t  from-others-proceed border-black  to-others-proceed2 w-full text-sm cursor-pointer hover:from-others-proceed hover:to-others-proceed pt-2 pb-2" style={{borderWidth:"1px",borderColor:"black"}}>Continue</button>
            </form>
            <div className="mt-4 text-xs">
            By continuing, you agree to Amazon CLONE's Conditions of Use and Privacy Notice.
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account? <Link to="/signin" className=" text-blue-600 hover:text-red-500 hover:underline">Sign In</Link>
            </div>
        </div>

        </div>

    </div>
       
    )
}
