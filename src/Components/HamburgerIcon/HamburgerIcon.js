import React, { useEffect,useRef, useState } from 'react';
import "./HamburgerIcon.css"
import {TimelineLite} from 'gsap'
class HamburgerIcon extends React.Component {
    constructor(props) {
        super(props);
        this.HambIcon = React.createRef();
        this.state = {
            toggleCross:true
        }
    }
    TurnsToCross = () => {
        const AnimateCross = new TimelineLite();
        const AnimateBars = new TimelineLite();
        if (this.state.toggleCross){
            AnimateCross  
            .to("#HamburgerIcon #BottomLine", { rotation: 45, transformOrigin: "64% 70%",x:"-2px"})
            .to("#HamburgerIcon #UpLine", { rotation: -45, transformOrigin: "64% 30%",x:"-2px"}, "<=1")
            .then(() => {
                this.setState(prevState=> (
                    {toggleCross: !prevState.toggleCross}
                ))
            })
        }
        else {
            console.log("as");
            AnimateBars  
            .fromTo("#HamburgerIcon #BottomLine", { rotation: 45, transformOrigin: "64% 70%",x:"-2px"}, {rotation: 0,x:"0px"})
            .fromTo("#HamburgerIcon #UpLine", { rotation: -45, transformOrigin: "64% 30%",x:"-2px"},{rotation: 0,x:"0px"}, "<=1")
            .then(() => {
                this.setState(prevState=> (
                    {toggleCross: !prevState.toggleCross}
                ))
            })
        }
    }
    componentDidMount() {
        this.HambIcon.current.addEventListener("click", this.TurnsToCross);
    }
    componentWillUnmount() {
        this.HambIcon.current.removeEventListener("click",this.TurnsToCross);
    }
    render() {
        return (
            <svg ref = {this.HambIcon} id = "HamburgerIcon" viewBox="0 0 80 80">
                <g id="Component 1">
                <ellipse id="Background" cx="40" cy="38.0513" rx="40" ry="38" fill="#E5E5E5"/>
                <line id="BottomLine" x1="25" y1="42.3974" x2="55" y2="42.3974" stroke="black" strokeWidth="3"/>
                <line id="UpLine" x1="25" y1="36.5" x2="55" y2="36.5" stroke="black" strokeWidth="3"/>
                </g>
            </svg>
        );
    }
}

export default HamburgerIcon;