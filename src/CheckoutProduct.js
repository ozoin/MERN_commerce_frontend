import React from 'react';
import "./CheckoutProduct.css";
import { Typography, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useStateValue } from './StateProvider';
import SnackBar from './Snackbar';
export default function CheckoutProduct({id,image,title,price,rating}) {
    const [{basket,messages},dispatch] = useStateValue();
    let snackbar;
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
        dispatch(  
            {
            type: 'ADD_MESSAGE',
            item: {
                msg: 'You removed an product',
                type: 'warning'
                }
            }
            );
            snackbar = <SnackBar message="You deleted an item" type="warning" open="true"/>
    }
    return (
        <>
        <div className="checkoutProduct">
            <div className="checkoutProduct__image">
                <img src={image} className="checkoutProduct__image" />
            </div>
            <div className="checkoutProduct__info">
                <Typography variant="h6" className="checkoutProduct__title">{title}</Typography>
                <Typography variant="h6" className="checkoutProduct__price">
                    <strong>{price}</strong>
                    <small>$</small>
                </Typography>
            </div>
            <div className="checkoutInfo__rating">
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={rating} readOnly />
                </Box>
            </div>
            <Button variant="contained" onClick={removeFromBasket} color="primary" className="product__button">Remove from basket</Button>
        </div>
        {snackbar}
        </>
    )
}
