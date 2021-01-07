import React from 'react';
import './LogoutSubmit.css';
import { Typography } from '@material-ui/core';

function LogoutSubmit() {
    setTimeout(function(){window.location.href = '/'},3000)
    return (
        <div className="logoutSubmit">
            <svg class="loader" viewBox="0 0 120 120">
                <circle class="internal-circle" cx="60" cy="60" r="30"></circle>
                <circle class="external-circle" cx="60" cy="60" r="50"></circle>
             </svg>
             <Typography className="text" variant="h5">You have successfully Signed Out!</Typography>
        </div>
    )
}

export default LogoutSubmit
