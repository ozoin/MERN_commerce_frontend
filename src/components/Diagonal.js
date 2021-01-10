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
                        <div>
              <svg class="waves"
              viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
              <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g class="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
              </svg>
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
