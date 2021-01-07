import React, { useState, useEffect } from 'react';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
import axios from "./axios";
import './Login.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SVGImg from "./media/orderPageIMG.svg"
const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40%',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit1: {
        margin: theme.spacing(3, 0, 2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.secondary.main,
    },
  }));
function Orders() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [{basket,user},dispatch] = useStateValue();
    const [userInfo,setUserInfo] = useState([]);
    useEffect(() => {
        if (user) {
        async function fetchData() {
            const req = await axios.get(`users/orders/${user.id}`);
            setOrders(req.data)
            setUserInfo(user)
        }
        fetchData();
    }
    },[user]);
    return (
        <div className="main">
                <div className="intro_block shadow">
                    <div className="svg_block"><img src={SVGImg}/></div>
                    <div className="text_block"><Typography variant="h5" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Typography></div>
                </div>
                <div className="orders__order">
                    {
                    orders?.map(order=>{
                      console.log(order)
                      //basket:[item]
                        const {shipping:[items],_id,amount,created,buyerId,completed,basket} = order;
                        console.log(basket)
                        return <Order orderId={_id} buyerId={buyerId} createdAt={created} shipping={items} status={completed} basketItems={basket} totalPrice={amount} />
                    })
                    }
                </div>
            </div>
    )
}

export default Orders
