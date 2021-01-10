import React, { useState, useEffect } from 'react';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';
import axios from "./axios";
import './Login.css';
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
                        const {shipping:[items],_id,amount,created,buyerId,completed,basket} = order;
                        return <Order orderId={_id} buyerId={buyerId} createdAt={created} shipping={items} status={completed} basketItems={basket} totalPrice={amount} />
                    })
                    }
                </div>
            </div>
    )
}

export default Orders
