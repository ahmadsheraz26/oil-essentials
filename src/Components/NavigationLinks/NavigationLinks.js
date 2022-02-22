import React, { useRef, useEffect } from 'react';
import {TimelineLite,gsap} from 'gsap'
import {CSSRulePlugin} from 'gsap/CSSRulePlugin'
import "./NavigationLinks.css"
gsap.registerPlugin(CSSRulePlugin);
function NavigationLinks(props) {
    const ItemsRef = useRef();
    const ItemOnFocus = (event) => {
        for(let i=0; i< ItemsRef.current.children.length;i++){
            if (ItemsRef.current.children[i].innerHTML !== event.target.innerHTML){
                let rule = CSSRulePlugin.getRule("nav.OpenUp span:nth-child("+(i+1)+"):before");
                const Timeline = new TimelineLite();
                console.log(rule);
                Timeline.to(rule,{cssRule :{duration:0.5,color:"#c0bdbd",height:"100%"}})
            }
        }
    }
    const ItemOnUnFocus = (event) => {
        for(let i=0; i< ItemsRef.current.children.length;i++){
            let rule = CSSRulePlugin.getRule("nav.OpenUp span:nth-child("+(i+1)+"):before");
            const Timeline = new TimelineLite();
            Timeline.to(rule,{cssRule :{duration:0.5,height:"0%"}})
        }
    }
    useEffect(()=> {
        if(props.IsMobileView){
            for(let i=0; i< ItemsRef.current.children.length;i++){
                ItemsRef.current.children[i].addEventListener("mouseover", (event) =>ItemOnFocus(event));
                ItemsRef.current.children[i].addEventListener("mouseout", (event) =>ItemOnUnFocus(event));
            }
            return (()=>{
                for(let i=0; i< ItemsRef.current.children.length;i++){
                    ItemsRef.current.children[i].removeEventListener("mouseover");
                    ItemsRef.current.children[i].removeEventListener("mouseout");
                }   
            })
        }
    },[])

    let Classes = [];
    if(props.IsMobileView){
        Classes.push("OpenUp");
    }
    else Classes.push("CloseUp");
    return (
        <nav ref = {ItemsRef} className = {Classes.join(" ")}>
            <div><span>Shop</span></div>
            <div><span>About</span></div>
            <div><span>Oil Facts</span></div>
            <div><span>FAQ</span></div>
        </nav>
    )

}
export default NavigationLinks