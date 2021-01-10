import React,{useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import LoginPage from './Login';
import Checkout from './Checkout';
import LogoutSubmit from './LogoutSubmit';
import Orders from './Orders';
import UserPanel from './UserPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Payment from "./Payment/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import axios from "./axios";
import Diagonal from "./components/Diagonal";
const promise = loadStripe('pk_test_51HbXvsCIUgYNGl2BA3RFI0NHMpgbrpBmvWpseNflv2y5wzsylFGdrOYXj4L1xlS0k1rM9AsVOSbIKI3HWeY6K9ZK003TQrFc2g'); 
function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token","");
        token = "";
      }
      const tokenRes = await axios.post('/users/tokenIsValid', null, {headers: {"x-auth-token":token}});
      if (tokenRes.data) {
        const userRes = await axios.get("/users/", {headers:{"x-auth-token":token}});
        dispatch({
          type:'SET_USER',
          user:userRes.data,
        });
      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
     }
    }
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/orders">
            <Header/>
            <Orders/>
        </Route>
        <Route path="/userPanel">
          <Header/>
          <UserPanel/>
        </Route>
          <Route path="/logoutSubmit">
            <LogoutSubmit/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/checkout">   
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/"> 
            <Header/>
            <Diagonal/>
            <Home/>
          </Route>
        </Switch>
    
      </div>
   </Router>
  );
}

export default App;
