import React from 'react';
import "./Checkout.css";
import { Typography } from '@material-ui/core';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
function Checkout() {
    const [{basket},dispatch] = useStateValue();
    return (
    <div>
        <div className="checkout">
        
            <div class="checkout__left">
               <Typography variant="h2" className="checkout__title">Your Shopping Basket</Typography>
            </div>

            <div class="checkout__right">
                <Typography variant="h2" className="checkout__title checkout__hide">Subtotal</Typography>
                <Subtotal/>
            </div>
            
        </div>
        <div className="checkout__left">           
            {basket.map(item => (
                <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
                />
            ))}
        </div>
    </div>
    )
}

export default Checkout
