import React, { useState } from 'react';
import './Header.css';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import HistoryIcon from '@material-ui/icons/History';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { SidebarData,LoggedData } from './components/SidebarData';
const useStyles = makeStyles({
    list: {
      width: 270,
    },
    fullList: {
      width: 'auto',
    },
    listItem: {
        display: 'flex',
        flexDirection:'column'
    }
  });
function Header() {
    let history = useHistory();
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    const [{basket,user},dispatch] = useStateValue();
    console.log(LoggedData)
    function LoginButton(props) {
        return (
            <Link to="/login">
            <Button color="inherit"><h3 id="nav_buttons">Login</h3></Button>
            </Link>
        )
    };
    function LogoutButton(props) {
        return (
           <Button color="inherit" onClick={handleAuthentication}><h3 id="nav_buttons">Logout</h3></Button>
        )
    }
    let button;
    let orders;
    let adminPanel;
    let userPanel;
    if (user) {
        button = <LogoutButton  />;
        orders = <Button color="inherit"><h3 id="nav_buttons">Orders</h3></Button>;
        userPanel = <Link to="/userPanel"><Button color="inherit"><h3 id="nav_buttons">User</h3></Button></Link>
    } else {
        button = <LoginButton  />;
    };
    if (user?.role === 1) {adminPanel = <Button color="inherit"><h3 id="nav_buttons">Admin</h3></Button>}
    const handleAuthentication = () => {
        if (user) {
            dispatch({
                type:"SET_USER",
                user: undefined,
            });
            localStorage.setItem("auth-token","");
            history.push("/logoutSubmit");
        }
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };
        const list = (anchor) => (
            <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',})}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List className={classes.listItem}>
                {user ? LoggedData : SidebarData.map((val, key) => (
                <ListItem className="shadow" button key={key}>
                    <Link to={val.path} className="link_a">
                        <div className="link_options">
                        <div className="link_icon">{val.icon}</div>
                        <div><ListItemText className="link_title" primary={val.title} /></div>
                        </div>
                    </Link>
                </ListItem>
                ))}</List>
                <ListItem className="shadow" button>
                    <Link to="/checkout" className="link_a">
                        <div className="link_options">
                        <div className="link_icon"><ShoppingBasketIcon className="header__backetIcon" /></div>
                        <div><ListItemText className="link_title" primary={`Basket (${basket.length})`}/></div>
                        </div>
                    </Link>
                </ListItem>
            
            </div>
        );
    return (
        <>
            <nav>
                <Link to='/'><h1 id="logo" class="hvr-underline-from-center">Artfloat</h1></Link>
                <ul class="nav-links">
                    <li className="listItems"><h3 class="hvr-underline-from-center">{adminPanel}</h3></li>
                    <li className="listItems"><h3 class="hvr-underline-from-center">{userPanel}</h3></li>
                    <li className="listItems"><h3 id="nav_buttons" class="hvr-underline-from-center"><Link to="/orders">{orders}</Link></h3></li>
                    <li className="listItems"><h3 class="hvr-underline-from-center">{button}</h3></li>
                    <li className="listItems">
                        <Link to="/checkout">
                            <div className="header__optionBasket">
                                <ShoppingBasketIcon className="header__backetIcon" />
                                <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className="menu">
                <IconButton onClick={toggleDrawer('right', true)}><MenuRoundedIcon fontSize="large" className="menuIcon"/></IconButton>
                </div>
            </nav>
                    <div>
                        <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)}
                        >
                        {list('right')}
                        </SwipeableDrawer>
                    </div>
            </>
    )
}

export default Header
