import React from 'react';
import './Order.css';
import moment from "moment";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format";
import Divider from '@material-ui/core/Divider';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
function Order({orderId,buyerId,createdAt,basketItems,totalPrice,shipping,status}) {
    let statusIndicator;
    status ? statusIndicator = <CheckCircleOutlineIcon className="completed_icon"/> : statusIndicator = <HourglassEmptyIcon className="process_icon"/>;
    return (
        <div className="orderlist_center">
                <div class="order_container"> 
                <div><>{statusIndicator}</></div>
                    <div className="data">
                        <h2>Order {orderId}</h2>
                        <h4>{moment.unix(createdAt).format('MMMM Do YYYY, HH:MM')}</h4>
                    </div>
                    <div>
                    <div className="order_list"> 
                        {
                            basketItems.map(item => {
                                return (
                                    <div className="order_item">
                                    <span>{item.title}</span>
                                    <span>$<b>{item.price}</b></span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </div>
                    <Divider/>
                    <div className="total_price">
                        <Divider/>
                        <h3>Total: {totalPrice/100}$</h3>
                    </div>
                </div>
        </div>
    )
}

export default Order
