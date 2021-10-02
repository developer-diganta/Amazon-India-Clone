import './App.css';
import Header from "./components/Header";
import Products from './components/Products';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import {store} from "./store/store";
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux"
import SoloProduct from './components/SoloProduct';
import AddedToCart from './components/AddedToCart';
import Cart from './components/Cart';
import Account from './components/Account/Account';
import Address from './components/Addresses/Address';
import AddressForm from './components/Addresses/AddressForm';
import Success from './components/Payments/Success';
import DeliveryAddress from './components/Purchase/DeliveryAddress';
import Customer from './components/Customer/Customer';

import Signup from "./components/Login/Signup";
import ProgressBar from './components/Customer/ProgressBar';
import Signin from './components/Login/Signin';
import SigninAgain from './components/Login/SignInAgain';

function App() {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
              <Route path="/cart">          
                <Header/>
                <Cart/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path="/signin">
                <Signin/>
              </Route>
              <Route path="/resignin">
                <SigninAgain/>
              </Route>
              <Route path="/signinfail">
                <Signin/>
              </Route>
              <Route path="/account">
                <Header/>
                <Account/>
              </Route>
              <Route path="/newaddress"> 
                <Header/>
                <AddressForm/>
              </Route>
              <Route path="/address">
                <Header/>
                <Address/>
              </Route>
              <Route path="/products/item/:id">
                <Header/>
                <SoloProduct/>
              </Route>
              <Route path="/addedtocart/:id">
                <Header/>
                <AddedToCart/>
              </Route>
              <Route path="/product/:id">
                <Header/>    
                <ProductList/>
                <Footer/>
              </Route>
              <Route path="/success">
                <Header/>
                <Success/>
              </Route>
              <Route path="/buy/addresses">
                <DeliveryAddress/>
              </Route>
              <Route path="/messagecenter">
                <Header/>
                <Customer/>
              </Route>
              <Route path="/track">
                <Header/>
                <ProgressBar/>
              </Route>
              <Route path="/">
                <Header/>
                <Banner/>
                <Products/>
              </Route>
            </Switch>
        </Router>

    </Provider>

  );
}

export default App;
