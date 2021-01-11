import React from 'react'
import GIT from "../media/github.svg";
import UPWORK from "../media/upwork.svg";
import "./Contacts.css";

function Contacts() {
    return (
        <div className="contact_container">
            <a href="https://github.com/ozoin"><img className="icon_contact" src={GIT}/></a>
            <a href="https://www.upwork.com/freelancers/~012b0ed62388bb14cb"><img className="icon_contact" src={UPWORK}/></a>
        </div>
    )
}

export default Contacts
