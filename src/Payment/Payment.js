import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../Reducer';
import CurrencyFormat from "react-currency-format";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Payment.css';
import axios from '../axios';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonDiv: {
    display:'flex',
    justifyContent:'center'
  },
  circular: {
    width:'100%'
  },
  alert: {
    width:'100%'
  },
  promoBtn: {
    color:"green",
    fontSize:"30px"
  },
  promoItem: {
    display:"flex",
    alignItems:"center",
    flexDirection:"row"
  }
}));
export default function AddressForm() {
  const history = useHistory();
  const classes = useStyles();
  const [{user,shipping,basket,messages},dispatch] = useStateValue();
  const [validator,setValidator] = useState(true);
  const [formData, setFormData] = useState({
    name:'',
    lastname:'',
    adress1:'',
    adress2:'',
    city:'',
    state:'',
    zip:'',
    country:'',
    promo:'',
  });
  function LoadingProgress(props) {
    return (
      <div className={classes.circular}>
        <LinearProgress color="secondary"/>
      </div>
    )
  };
  function StandartButton(props) {
    return (
      <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
            disabled={validator}
          >
            Place order
          </Button>
    )
  };
  function SuccessIndicator(props) {
    return (
    <div class="success-animation">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
    </div>
    )
  };
  let button;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState({
    promoError:''
  });
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [finalPrice, setFinalPrice] = useState(getBasketTotal(basket));
  const [disabledPromo, setDisabledPromo] = useState(false);
  const checkPromo = async (e) => {
    const res = await axios.get(`/users/promoCode/${formData?.promo}`);
    if (res.data.msg) {
      setErrorText({
        promoError:res.data.msg
      });
    } else {
    const [{discount}] = res.data;
    const newPrice = Math.floor(finalPrice*(1-discount));
    setFinalPrice(newPrice);
    setDisabledPromo(true);
    };
  }

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method:'post',
        url:`/payment/create?total=${finalPrice*100}`
      });
      console.log('FINAL PRICE=>',finalPrice)
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  },[finalPrice]);

  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }
  
  useEffect(()=>{
    if (formData.name && formData.lastname && formData.adress1 && formData.country && formData.zip) {setValidator(false)}
  });

  const handleSubmit = async (event) => {
    console.log('CLIENT-SECRET',clientSecret);
    event.preventDefault();
    setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card:elements.getElement(CardElement)
        }
      }).then(({paymentIntent})=>{
        console.log('PAYMENT intent=>',paymentIntent);
        var amount = Math.round()
        axios.post('/orders',{
          basket:basket,
          shipping:formData,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          buyerId: user.id
        });
        setError(null);
        setSuccess(true);
        setProcessing(false);
        setTimeout(() => {
          history.replace('/orders')
        }, 2000);
      })
  }

  if (processing) {
    button = <LoadingProgress/>
  } else if (success) {
    button = <SuccessIndicator/>
  } else if (error) {
    button = <StandartButton/>
  } else {
    button = <StandartButton/>
  } 
  
  return (
    <React.Fragment>
    <Grid container>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="First name"
            fullWidth
            value={formData.name}
            onChange={e=>setFormData({...formData,name:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={formData.lastname}
            onChange={e=>setFormData({...formData,lastname:e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={formData.adress1}
            onChange={e=>setFormData({...formData,adress1:e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={formData.adress2}
            onChange={e=>setFormData({...formData,adress2:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={formData.city}
            onChange={e=>setFormData({...formData,city:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth value={formData.state}
          onChange={e=>setFormData({...formData,state:e.target.value})} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={formData.zip}
            onChange={e=>setFormData({...formData,zip:e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={formData.country}
            onChange={e=>setFormData({...formData,country:e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding id="listItem">
        {basket.map((product) => (
          <ListItem className={classes.listItem}  key={product.title}>
            <ListItemText primary={product.name} secondary={product.title} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />

              <CurrencyFormat 
              renderText={(value)=>(
                  <> 
                    <Typography variant="subtitle1" className={classes.total}>{value}</Typography>
                  </>
              )}
              decimalScale={2}
              value={finalPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
       
        </ListItem>
      </List>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.promoItem}>
          <TextField
            error={errorText.promoError ? true : false}
            id="promo"
            name="promo"
            label="Promo Code"
            helperText={errorText?.promoError}
            fullWidth
            value={formData.promo}
            onChange={e=>setFormData({...formData,promo:e.target.value})}
          />
          <IconButton onClick={checkPromo} disabled={disabledPromo}><CheckIcon className={classes.promoBtn}/></IconButton>
        </Grid>
      <Grid item xs={12} mt={4}>
          <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
            </form>
          </Grid>
            <Grid item xs={12} className={classes.buttonDiv}>
            {button}
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      </Grid>
    </Paper>
  </main>
  </Grid>
    </React.Fragment>
  );
}