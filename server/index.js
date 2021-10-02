require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const md5=require("md5");
const bcrypt= require("bcrypt");
const app=express();
const jwt = require("jsonwebtoken");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());


app.use(cors());

const stripe = require('stripe')(process.env.SK_TEST)
const endpointSecret = process.env.SECRET;

const url="mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@cluster0.mlb5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true});
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    addresses:[],
    basket:[],
    boughtItems:[],
});


const User=mongoose.model("User",userSchema);
const author = (req, res, next) => {
    const token =  req.body.user?req.body.user.data.token:null;
    if(!token){
        console.log("need token!")
        res.send("Need a token");
    }
    else{
        jwt.verify(token, process.env.KEY, (error, decoded) => {
            if(error){
                console.log("VF")
                // res.json({m:"VF"})
                res.json("VF")
            }
            else{
                req.userId = decoded.id;
                console.log("Done")
                next();
            }
        })
    }
}



app.get("/",function(req,res){
    res.send("SUCESSFULLY RUNNING ");
})

app.post("/getItems",author,async function(req,res){
    const user  = req.body.user;
    const email = user.data.result.email;
    console.log("getitems")
    User.findOne({email:email},function(err,found){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            
            res.send(found);
        }
    })
});


app.post("/auth", async (req, res) => {
    const data = await User.findOne({email: req.body.email});
    if(data){
        const pass_1 = md5(req.body.password);
        const ans = await bcrypt.compare(pass_1,data.password);
        if(ans){
            const token = jwt.sign({email: data.email, id: data.id}, process.env.KEY, {expiresIn:"3h"});
            const result = {
                name: data.name,
                email: data.email
            }
            res.json({token, result, status: "Success"});
        }
        else{
            res.json({result: null, status: "CM"});
            
        }
    }
    else{
        res.json({status: "NA"});
    }
    
});

app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const password_phase_1 = md5(password);
    const salt = await bcrypt.genSalt(10);
    const password_phase_2 = await bcrypt.hash(password_phase_1,salt);
    const name = req.body.name;
    await User.findOne({email:email},async (err,result)=>{
        if(err){
            res.send("404 Error!");
        }
        else{
            if(result){
                console.log("User exists!");
            }
            else{
                const newAccount = new User({
                    name:name,
                    email:email,
                    password:password_phase_2,

                });
                newAccount.save((error,id)=>{
                    if(err){
                        console.log(err);
                        res.send("404 error");
                    }
                    else{
                        const token = jwt.sign({email: email, id: id}, process.env.KEY, {expiresIn:"3h"});
                        const result = {
                            name:name,
                            email:email
                        }
                        res.json({token, result, status: "Success"});
                    }
                })
            }
        }
    })
});

app.post("/addEntireToCart",author,async function(req,res){
    const data = req.body.items;
    const user = req.body.user;
    const email = user.data.result.email;
    await User.findOneAndUpdate({email:email},{basket:data},function(err,msg){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(msg);
        }
    })
})


app.post("/addToCart",author,async function(req,res){
    const data=req.body.item;
    const user = req.body.user;
    const email = user.data.result.email;
    await User.findOneAndUpdate({email:email,'basket.id':data.id},{'$set':{
        'basket.$.qty':data.qty}},async function(err,result){
            if(err){
                res.send(err);    
            }
            else{
                if(result){
                    res.send("Added");
                }
                else{
                    await User.findOneAndUpdate({email:email},{$addToSet:{basket:data}},function(err,add){
                        if(err){
                            res.send(err);
                        }
                        else{
                            res.send(add);
                        }
                    })
                   
                }
               
            }
        }
    )
});


app.post("/removefromcart",author,function(req,res){
    const user = req.body.user;
    const email = user.data.result.email;
    const id = req.body.id;
    const qty = req.body.qty;
    if(qty!==0){
        User.findOneAndUpdate({email:email,'basket.id':id},{'$set':{
            'basket.$.qty':qty}},async function(err,result){
                if(err){
                    res.send(err);
                }
                else{
                    res.send(result);
                }
            }
        )
    }

    else{
        User.findOneAndUpdate({email:email},{$pull:{basket:{id:id}}},function(err,result){
            console.log("...");
        })
    }

})

app.post("/emptycart",author,async function(req,res){
    const email = req.body.user.data.result.email;
    await User.findOneAndUpdate({email:email},{basket:[]},async (err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

app.post("/address",author,async function(req,res){
    const user=req.body.user.data.result.email;
    await User.findOne({email:user},async function(err,result){
        if(err){
            res.send("Error");
        }
        else{
            res.send(result.addresses);
        }
    })
});

app.post("/addAddress",author,async function(req,res){
    const user=req.body.user;
    const email = user.data.result.email;
    let address=req.body.address;
    await User.findOne({email:email},async function(err,result){
        if(err){
            res.send("Error");
        }
        else{
            const cnt=result.addresses.length;
            address.id=cnt+1;
            await User.findOneAndUpdate({email:email},{'$addToSet':{addresses:address}},async function(err,result){
                if(err){
                    res.send(err);
                }
                else{
                    res.send("Added address");
                }
            })
        }
    })


});

app.post("/removeAddress",author,async function(req,res){
    const user=req.body.user;
    const id=req.body.id;
    const email=user.data.result.email;
    User.findOneAndUpdate({email:email},{$pull:{addresses:{id:id}}},function(err,result){
        if(err){
            res.send("ERR");
        }
        else{
            res.send("Done");
        }
    })
})



app.post('/create-checkout-session',async (req, res) => {
    const cart=JSON.parse(req.body.cart);
    const freeDelivery = req.body.freeDelivery;
    const address=JSON.parse(req.body.address);
    const date = req.body.date;
    const email=req.body.email;
    const line_items=[];
    for(var i=0;i<cart.length;i++){
        const x = cart[i];
        const item = {
            price_data:{
                currency:"inr",
                product_data:{
                    name:x.title,
                },
                unit_amount:x.finalPrice*100,
            },
            quantity:x.qty
        };
        line_items.push(item);
    }
    if(freeDelivery==="false"){
        console.log("here")
        const item = {
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount:4000,
            },
            quantity:1
        };
        line_items.push(item);
    }
    const customer = await stripe.customers.create({
        description: address.addType,
        email:email,
        address:{
            city:address.town,
            country:"India",
            line1:`${address.flat}, ${address.area}`,
            line2:address.landmark,
            postal_code:address.pin,
            state:address.state
        },
        metadata:{
            date:date,
        },
        name:address.name,
        phone:address.mob,
      });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        customer:customer.id,
        success_url: 'https://gracious-keller-08b8f9.netlify.app/success',
        cancel_url: 'https://gracious-keller-08b8f9.netlify.app/fail',
    }); 
    // console.log(session)
    res.redirect(303, session.url);

});
const fulfillOrder = async (email,id) => {
  const customer = await stripe.customers.retrieve(
    id
  );
  const user = email;
  await User.findOne({email:user},async(err,result)=>{
      if(err){
          return;
      }
      else{
          const purchasedItems = result.basket;
          const finalItems = [];
          for(let i=0;i<purchasedItems.length;i++){
              if(purchasedItems[i].qty>0){
                  finalItems.push(purchasedItems[i]);
              }
          }
          const order = {
              purchase:finalItems,
              address:customer.address,
              date:customer.metadata.date,
              name:customer.name,
          }
          await User.findOneAndUpdate({email:user},{basket:[],'$addToSet':{boughtItems:order}},async (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Cart Empty");
            }
        })
      }
  })
  
}




app.post('/webhook', express.json({type: 'application/json'}),async (request, response) => {
    const event = request.body;
    switch (event.type) {
        case 'charge.succeeded'|| 'payment_intent.succeeded':
            const chargeSucceeded = event.data.object;
            // console.log(event)
            console.log(" chargeSucceeded")
            const email = chargeSucceeded.billing_details.email;
            await fulfillOrder(email,chargeSucceeded.customer);
            break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                break;
                default:
            }
            response.json({received: true});
        });
            
app.post("/getPurchase",author,async function(req,res){
    const user = req.body.user;
    const email = user.data.result.email;
    await User.findOne({email:email},async (err,result)=>{
        if(err){
            res.send("ERROR!")
        }
        else{
            console.log(result.boughtItems);
            res.send(result.boughtItems);
        }
    })
})
app.listen(process.env.PORT || 5000,function(){
    console.log("Running on 5000");
}); 


































