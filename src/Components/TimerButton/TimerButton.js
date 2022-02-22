import React,{useRef,useEffect} from 'react';
import {TimelineLite} from 'gsap'
import "./TimerButton.scss"
function TimerButton(props) {
    const SvgContainer = useRef();
    const { radius, stroke, progress } = props;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    let strokeDashoffset = 0;
    //let strokeDashoffset = circumference - progress / 100 * circumference;
    let strokeDasharrayMax = circumference - 100 / 100 * circumference
    let strokeDasharrayMin = circumference - 0 / 100 * circumference
    useEffect(()=>{
        const TimeLine = new TimelineLite({repeat:-1});
        TimeLine
        .to(SvgContainer.current, 2,{css: {"stroke-dashoffset":strokeDasharrayMin},ease:"power3"})
        .to(SvgContainer.current.nextSibling, 2,{attr: {"r":5,fill:"#C4C4C4"},ease:"power3"},"<=2")
        console.log(SvgContainer.current.nextSibling);
    },[])
    return (
        <svg  className= "TimerButton" height={radius * 2} width={radius * 2}>
            <circle
                ref = {SvgContainer}
                stroke="#C4C4C4"
                fill="transparent"
                strokeWidth={ stroke }
                strokeDasharray={ circumference + ' ' + circumference }
                r={ normalizedRadius }
                cx={ radius }
                cy={ radius }
            />
            <circle cx={radius} cy={radius} r={radius/3} fill="black"/>
        </svg>
    );
}

export default TimerButton;