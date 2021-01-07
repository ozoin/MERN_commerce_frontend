import React, { useEffect } from 'react';
import './Categories.css';
import { Typography } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ComputerIcon from '@material-ui/icons/Computer';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import HomeIcon from '@material-ui/icons/Home';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import { Swiper, SwiperSlide } from 'swiper/react';

function Categories() {
    const [{basket},dispatch] = useStateValue();
    const categ = [{category:"Phones",icon:<PhoneIphoneIcon/>},
    {category:"Computers",icon:<ComputerIcon/>},
    {category:"Home",icon:<HomeIcon/>},
    {category:"Other",icon:<DevicesOtherIcon/>},
    {category:"",icon:<BorderAllIcon/>},
   ]

        const dispatchCategory = (item) => {
        dispatch({
            type:"SET_CATEGORY",
            category:item,
        })
    };

    const categoryItems = categ.map((item) => 
    <SwiperSlide className="slide">
    <div className="categorybox" onClick={e => dispatchCategory(item.category)} type={item.category}>
        {item.icon}
        <Typography variant="body">{item.category}</Typography>
    </div>
    </SwiperSlide>
    )
   
    return (
        <div className="categories">
        <Swiper
        navigation
        watchSlidesVisibility
        watchSlidesProgress
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        spaceBetween={10}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        >
            {categoryItems}
            </Swiper>
        </div>
  
    )
}

export default Categories
