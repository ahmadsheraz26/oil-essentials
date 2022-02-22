import React, {useEffect,useRef} from 'react';
import {TimelineLite} from "gsap"
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import "./PrimaryButton.scss"
import {Colors} from '../../assets/Colors/Color_Pallet'
import "../../assets/Helpful_Functions/Helpful_Functions"
import { OscillateColors } from '../../assets/Helpful_Functions/Helpful_Functions';
const PrimaryButton = (props) => {
    const Container = useRef();
    const imageReveal = CSSRulePlugin.getRule(".PrimaryButton:after");
    const imageAfter = CSSRulePlugin.getRule(".PrimaryButton:before");
    
    const SwitchColorsTimeLine = (prevColorIndex, nextColorIndex) => {
        const TimeLine = new TimelineLite();
        TimeLine
        .set(imageAfter,{backgroundColor:Colors[prevColorIndex]})
        .fromTo(imageReveal,{height:"0%"}, {duration:1.2,height:"100%",backgroundColor:Colors[nextColorIndex],ease:"power3",delay:1})
        return TimeLine;
    }
    const ForwardTransition = () =>{ 
        const TimeLine = new TimelineLite();
        for(let index = 0; index < Colors.length-1; index++){
            TimeLine
            .add(SwitchColorsTimeLine(index,index+1))
        }
        return TimeLine;
    }
    const LastTransition = () => {
        const TimeLine = new TimelineLite();
        TimeLine
        .add(SwitchColorsTimeLine(Colors.length-1,0))
        return TimeLine;
    }
    useEffect(() => {
        const MasterTimeLine = new TimelineLite({repeat:-1});
        MasterTimeLine
        .add(ForwardTransition())
        .add(LastTransition());
 
    },[])

    return (
        <div ref = {Container} className = "PrimaryButton">
            <span>{props.label}</span>      
        </div>
    );
};

export default PrimaryButton;