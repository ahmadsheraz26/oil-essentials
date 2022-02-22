import React, { useEffect, useRef} from 'react';
import "./ScrollableText.scss"
import {TimelineLite,gsap} from 'gsap'
import { debounce } from 'lodash';
function ScrollableText(props) {
    const HeadingContainer = useRef();
    let CurrentEl = 0;
    let HeadingContainerOffset;
    let MasterTimeline = new gsap.timeline({delay:props.SyncDelay,repeat:-1, repeatDelay:props.SyncDelay});
    let StyleClass = ["ScrollableText_Wrapper"];
    if (props.TextStyle != " ") StyleClass.push(props.TextStyle)

    let HeadingValues = {
        PreviousEl:props.ContentArray[props.ContentArray.length-1],
        CurrentEl:props.ContentArray[0],
        NextEl:props.ContentArray[1]
    }
    const FindNextEl = Current => {
        if(Current >= props.ContentArray.length - 1) return 0;
        else if (Current >= 0) return (Current + 1);
    }
    const FindPrevEl = Current => {
        if(Current > 0 && Current <= props.ContentArray.length - 1) return (Current - 1);
        else if (Current <= 0) return (props.ContentArray.length - 1);
    }
    const MovingUpAnimation = (offset) => {
        const MovingUpTimeLine = new TimelineLite()
        MovingUpTimeLine
        .call(UpdateElementsBefore)
        .fromTo("." + props.TextStyle + " div",{translateY:-offset},{duration:1,translateY:"-=" + offset,ease:"power"})
        .call(UpdateElementsAfter)
        return MovingUpTimeLine;
    }
    const MovingDownAnimation = (offset) => {
        const MovingDownTimeLine = new TimelineLite();
        MovingDownTimeLine
        .call(UpdateElementsBeforeDown)
        .fromTo("." + props.TextStyle + " div",{translateY:-offset},{duration:1,translateY:"+=" + offset,ease:"power"})
        .call(UpdateElementsAfterDown)
        return MovingDownTimeLine;
    }
    const UpdateElementsBefore = () => {
        const NextElement = FindNextEl(CurrentEl);
        HeadingContainer.current.children[2].innerHTML = props.ContentArray[NextElement];
        CurrentEl= NextElement;
    }
    const UpdateElementsBeforeDown = () => {
        const PrevElement = FindPrevEl(CurrentEl);
        HeadingContainer.current.children[0].innerHTML = props.ContentArray[PrevElement];
        CurrentEl = PrevElement;
    }
    const UpdateElementsAfter = () => {
        HeadingContainer.current.children[0].innerHTML = HeadingContainer.current.children[1].innerHTML;
        HeadingContainer.current.children[1].innerHTML = HeadingContainer.current.children[2].innerHTML;
    }
    const UpdateElementsAfterDown = () => {
        HeadingContainer.current.children[2].innerHTML = HeadingContainer.current.children[1].innerHTML;
        HeadingContainer.current.children[1].innerHTML = HeadingContainer.current.children[0].innerHTML;
    }
    const ChangeText =(event) => {
        if (gsap.isTweening("." + props.TextStyle + " div")) return;
        if(event.deltaY < 0){
            MasterTimeline.pause();
            MovingUpAnimation(HeadingContainerOffset)
            .then(()=> MasterTimeline.restart(true))
        }
        if(event.deltaY > 0){
            MasterTimeline.pause()
            MovingDownAnimation(HeadingContainerOffset)
            .then(()=> {
                MasterTimeline.restart(true);
            })
        }
    }
    const ResetAnimation = () => {
        HeadingContainer.current.style.height = HeadingContainer.current.children[0].clientHeight + "px";
        HeadingContainerOffset = HeadingContainer.current.clientHeight;
        gsap.set("." + props.TextStyle + " div", {clearProps:"all"})
        HeadingContainer.current.children[0].style.transform= "translate(0px, " + (-HeadingContainerOffset) + "px)";
        HeadingContainer.current.children[1].style.transform= "translate(0px, " + (-HeadingContainerOffset) + "px)";
        HeadingContainer.current.children[2].style.transform= "translate(0px, " + (-HeadingContainerOffset) + "px)";    
        MasterTimeline.kill();
        MasterTimeline = new gsap.timeline({delay:props.SyncDelay,repeat:-1, repeatDelay:props.SyncDelay});
        MasterTimeline.add(MovingUpAnimation(HeadingContainerOffset))
    }
    const ChangeTextAfterDebounce = debounce(ChangeText,250,{leading:true,trailing:false})
    const ResetAnimationAfterDebounce = debounce(ResetAnimation,250,{leading:true,trailing:false})
    useEffect (()=> {
        HeadingContainer.current.style.height = HeadingContainer.current.children[0].offsetHeight + "px";
        HeadingContainerOffset = HeadingContainer.current.clientHeight;
        gsap.set("." + props.TextStyle + " div", {clearProps:"all"})
        gsap.killTweensOf("." + props.TextStyle + " div");
        MasterTimeline.add(MovingUpAnimation(HeadingContainerOffset));
        //InfiniteTimeline(HeadingContainerOffset);
        window.addEventListener('wheel',ChangeTextAfterDebounce);
        window.addEventListener("resize",ResetAnimationAfterDebounce);
        return ( ()=> {
            if (window.removeEventListener) window.removeEventListener("wheel", ChangeTextAfterDebounce);
            else if (window.detachEvent) window.detachEvent("wheel", ChangeTextAfterDebounce);
            if (window.removeEventListener) window.removeEventListener("resize", ResetAnimationAfterDebounce);
            else if (window.detachEvent) window.detachEvent("resize", ResetAnimationAfterDebounce);
         })
    },[])

    return (
        <div ref = {HeadingContainer} className = {StyleClass.join(" ")}>
            <div>{HeadingValues.PreviousEl}</div>
            <div>{HeadingValues.CurrentEl}</div>
            <div>{HeadingValues.NextEl}</div>
        </div>
    );
}
export default ScrollableText;