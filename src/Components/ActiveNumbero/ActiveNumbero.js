import React, { useEffect, useRef } from 'react';
import "./ActiveNumbero.css"
import ScrollableText from '../ScrollableText/ScrollableText';
function ActiveNumbero(props) {
    let ContentArray = [];
    
    for(let i=1; i<= props.TotalPage;i++){
        ContentArray.push(i + "");
    }
    return (
        <div id = "activeNumbero">
            <ScrollableText 
                TextStyle = {"PageNo"} 
                ContentArray = {ContentArray} 
                SyncDelay = {props.SyncDelay} 
            >
            </ScrollableText>
            <div id = "TotalPage">{props.TotalPage}</div>
        </div>
    );
}

export default ActiveNumbero;