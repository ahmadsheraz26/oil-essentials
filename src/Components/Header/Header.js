import React from 'react';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import IconWithGreyBack from '../IconWithGreyBack/IconWithGreyBack'
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon'
import "./Header.css"

function Header(props) {
    return (
        <header>
            <div id = "Menu">
                <HamburgerIcon></HamburgerIcon>
                <img src= {require("./Logo.svg")}></img>
            </div>
            <div id = "Menu_Nav">
                <NavigationLinks IsMobileView = {false}></NavigationLinks>
                <IconWithGreyBack IconName = {"map_convenience-store.svg"} AlreadyBack = {true}></IconWithGreyBack>
            </div>
        </header>

    );
}

export default Header;