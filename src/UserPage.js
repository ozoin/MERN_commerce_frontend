import React from 'react'
import './UserPage.css'
import { useState } from 'react'
import { useStateValue } from './StateProvider';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import axios from './axios';
import bcrypt from "bcryptjs";
import AutorenewIcon  from '@material-ui/icons/Autorenew';
import { IconButton } from '@material-ui/core';
import SVGimage from "./media/userPageIMG.svg";
function UserPage() {
    const [{user},dispatch] = useStateValue();
    const [newParams,setNewParams] = useState({
        email:user?.email,
        password:''
    });
    const [errors,setErrors] = useState({
        emailError:'',
        passwordError:''
    })
    if (newParams) {console.log(newParams)};
    const handleChange = async (e) => {
        e.preventDefault();
        if (newParams.email) {
            await axios.post(`/users/changeUserPassword/${user?.id}`,{"email":newParams.email})
        } else {
            setErrors({...errors,emailError:"Your email is too short"});
        }
    }
    const changePassword = async (e) => {
        e.preventDefault();
        if (newParams.password.length>8) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(newParams.password,salt);
            await axios.post(`/users/changeUserPassword/${user?.id}`,{"password":passwordHash})
        } else {
            setErrors({...errors,passwordError:"Your password is too short"});
        }
    }
    return (
        <div className="main">
                <div className="intro_block shadow">
                    <div className="svg_block"><img src={SVGimage}/></div>
                    <div className="text_block"><Typography variant="h5" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Typography></div>
                </div>
                <div className="user_form">
                <form noValidate autoComplete="off">
                    <div className="textfield_block"><TextField error={errors.emailError ? true : false} helperText={errors.emailError} fullWidth id="filled-basic" defaultValue={user?.email} onChange={e=>setNewParams({...newParams,email:e.target.value})} label="Change Your E-Mail" variant="outlined" /><IconButton onClick={handleChange}><AutorenewIcon className="change_icon"/></IconButton></div>
                    <div className="textfield_block"><TextField error={errors.passwordError ? true : false} helperText={errors.passwordError} type="password" fullWidth id="filled-basic" onChange={e=>setNewParams({...newParams,password:e.target.value})} label="Change your Password" variant="outlined" /><IconButton onClick={changePassword}><AutorenewIcon className="change_icon"/></IconButton></div>
                </form>
                </div>
        </div>
    )
}

export default UserPage
