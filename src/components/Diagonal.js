import React from 'react'
import "./Diagonal.css";
import SVGImg from "../media/mainPageIMG.svg";
import {TechStack} from "./SidebarData";
function Diagonal() {
    return (
      <div className="main">
        <div className="main_container">
          <div className="app-text">
            <h3>Why are we the best</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            <div class="center-img">
              <img src={SVGImg}/>
            </div>
          </div>
          <div className="wave-animate">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
        <div className="tech_container">
          <div className="list_container">
          {
            TechStack.map(item => {
              return (
                <div className="tech-item hvr-shrink">
                  {item.img}
                  <p className="tech-title">{item.title}</p>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    )
}

export default Diagonal
