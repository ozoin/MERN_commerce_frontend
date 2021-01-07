import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export const SidebarData = [
    {
        title:"Home",
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
    },
    {
        title:"Login",
        path: '/login',
        icon: <LockOpenIcon/>,
        cName: 'nav-text'
    }
]
export const LoggedData = [
    {
        title:"Home",
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
    },
    {
        title:"Logout",
        path: '/logout',
        icon: <ExitToAppIcon/>,
        cName: 'nav-text'
    },{
        title:"Orders",
        path: '/orders',
        icon: <ListAltRoundedIcon/>,
        cName: 'nav-text'
    },
    {
        title:"User",
        path: '/UserPanel',
        icon: <AccountCircleIcon/>,
        cName: 'nav-text'
    },
]