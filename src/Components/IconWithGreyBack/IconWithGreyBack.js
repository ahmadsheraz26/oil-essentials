import React from 'react';
import "./IconWithGreyBack.css"
function IconWithGreyBack(props) {
    let Classes = [];
    if (props.AlreadyBack){
        Classes.push("GreyBack");
    }
    return (
        <a className = {Classes.join(" ")}>
            <img 
                src = {require("../../assets/Icons/" + props.IconName)}>
            </img>
        </a>
    );
}

export default IconWithGreyBack;