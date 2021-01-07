import React, { useState } from 'react'
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
import {Link, useHistory} from "react-router-dom";
import axios from "./axios";
import { useStateValue } from './StateProvider';

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

export default function Login() {
    const [{user},dispatch] = useStateValue();
    const history = useHistory();
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState({});
    const signIn = async (e) => {
      e.preventDefault();
      try {
      const loginUser = {email,password};
      const loginRes = await axios.post("/users/login", loginUser);
      dispatch({
        type:"SET_USER",
        user: [loginRes.data.token,loginRes.data.user]
      });
      console.log(user);
      localStorage.setItem("auth-token",loginRes.data.token)
      history.push("/");
    } catch(err) {
      const error = err.response.data;
      setError(error)
      console.log(error)
    }
    }
    const register = async (e) => {
        e.preventDefault();
        try {
        const newUser = {email,password};
        await axios.post("/users/register",newUser);
        const loginRes = await axios.post("/users/login", newUser);
        dispatch({
          type:"SET_USER",
          user: [loginRes.data.token,loginRes.data.user]
        });
        console.log(user);
        localStorage.setItem("auth-token",loginRes.data.token)
        history.push("/");
      } catch(err) {
        const error = err.response.data;
        setError(error)
        console.log(error)
      }
    }
    
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Link to="/">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
            </Link>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={error.email ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
                helperText={error.email}
                autoFocus
              />
              <TextField
                error={error.password ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                helperText={error.password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> 
              <div className="button__group">
                <Button
                    type="submit"  
                    variant="contained"
                    color="primary"
                    className={classes.submit1}
                    onClick={signIn}
                >
                    Sign In
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={register}
                >
                    Sign Up
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }