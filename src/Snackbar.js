import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function SnackBar({message,open,type}) {
    const [close, setClose] = useState(true)
    const handleClose = () => {
     setClose(false)
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open && close} >
                <Alert onClose={handleClose} severity={type}>{message}</Alert>
            </Snackbar>
    </div>
    )
}

export default SnackBar