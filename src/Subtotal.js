import React, { useState, useEffect } from 'react'
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [auth, setAuth] = useState(false);
    const [{basket,user},dispatch] = useStateValue();
   // const [disabled, setDisabled] = useState(basket.length>0 ? false : true);
    //problem with button disable
    return (
        <div className="subtotal">
            <CurrencyFormat 
             renderText={(value)=>(
                 <>
                    <p>
                    Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                 </>
             )}
             decimalScale={2}
             value={getBasketTotal(basket)}
             displayType={"text"}
             thousandSeparator={true}
             prefix={"$"}
            />
                <Button onClick={e => history.push('/payment')} variant="contained" disabled={!basket.length} color="primary">
                     {basket.length ? 'Checkout' : 'Your basket is empty'}
                </Button>
        </div>
    )
}

export default Subtotal
