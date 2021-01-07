import React from 'react';
import "./Product.css";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { useStateValue } from './StateProvider';
import "./index.css";

export default function Product({id,title,image,price,rating}) {
    const [value,setValue] = React.useState(rating);
    const [{basket,messages},dispatch] = useStateValue();
    const addToBasket = () => {
         dispatch(
             {
             type:'ADD_TO_BASKET',
             item: {
                 title:title,
                 image:image,
                 price:price,
                 rating:rating,
             },
             }
         );
         dispatch(  
            {
            type: 'ADD_MESSAGE',
            item: {
                msg: 'You succesfully added a product',
                type: 'success'
                }
            }
            );
    }

    return (
        
        <div className="product shadow">
            <div className="product__imgcontainer">
                <img className="product__img" src={image}/>
            </div>
            <div className="product__info">
                <Typography variant="h6">{title}</Typography>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                    <Box component="fieldset" mb={4} borderColor="transparent">
                    <Rating name="read-only" value={rating} readOnly />
                    </Box>
            </div>
            <div>
        <Button variant="contained" color="secondary" className="product__button" onClick={addToBasket}>Add to basket</Button>
        </div>
        </div>
        
    )
}
