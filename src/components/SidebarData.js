import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import JS from '../media/javascript.svg';
import HTML from '../media/html.svg';
import CSS from '../media/css.svg';
import EXPRESS from '../media/express.svg';
import NODEJS from '../media/node-js.svg';
import MONGO from '../media/mongodb.svg';
import WEBPACK from '../media/webpack.svg';


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

export const TechStack = [
    {
        title: "JavaScript",
        img: <img src={JS} className="tech_img"/>
    },
    {
        title: "HTML",
        img: <img src={HTML} className="tech_img"/>
    },
    {
        title: "CSS",
        img: <img src={CSS} className="tech_img"/>
    },
    {
        title: "ExpressJS",
        img: <img src={EXPRESS} className="tech_img"/>
    },
    {
        title: "NodeJS",
        img: <img src={NODEJS} className="tech_img"/>
    },
    {
        title: "MongoDB",
        img: <img src={MONGO} className="tech_img"/>
    },
    {
        title: "Webpack",
        img: <img src={WEBPACK} className="tech_img"/>
    }
]