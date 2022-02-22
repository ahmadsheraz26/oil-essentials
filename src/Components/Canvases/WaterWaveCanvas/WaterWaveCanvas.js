import React, {useEffect, useRef} from 'react';
import {TimelineLite,gsap} from 'gsap'
import * as Colors from '../../../assets/Colors/Color_Pallet'
import "./WaterWaveCanvas.css"
import { debounce } from 'lodash';
const WaterWaveCanvas = (props) => {
    const CanvasContainer = useRef();
    const NormalWavelength = 0.01
    const waveTopDown = {
        frequency: 0.06,
        wavelength:NormalWavelength,
        offsetFromSides:0,
        amplitude:40,
        waveColors: [Colors.SkyBlue, Colors.TanGreen,Colors.Red,Colors.Pink],
        waveColorIndex:0,
        MaxWaveColors: 4
    }
    const resizeCanvasToDisplaySize = canvas => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          return true;
        }
        return false;
    }
    let increment = waveTopDown.frequency;
    const WaveAnimate = () => {
        const c = CanvasContainer.current;
        const ctx = c.getContext("2d");
        const axis = c.width/2;
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        let i = waveTopDown.offsetFromSides
        for(i = waveTopDown.offsetFromSides ; i<= c.height - waveTopDown.offsetFromSides ; i++){
            ctx.lineTo(axis+(i/2) + (Math.sin(i*waveTopDown.wavelength + increment)*waveTopDown.amplitude * Math.sin(increment)), i);
        }
        ctx.lineTo(c.width-waveTopDown.offsetFromSides,i);
        ctx.lineTo(c.width-waveTopDown.offsetFromSides,waveTopDown.offsetFromSides);
        ctx.lineTo(axis + (Math.sin(waveTopDown.offsetFromSides*waveTopDown.wavelength+increment)*waveTopDown.amplitude * Math.sin(increment)),waveTopDown.offsetFromSides);    
        ctx.fillStyle = waveTopDown.waveColors[waveTopDown.waveColorIndex];
        ctx.fill();
        increment+=waveTopDown.frequency;
       requestAnimationFrame(WaveAnimate)
    }
    const OscillateWaveColors = () => {
        if (waveTopDown.waveColorIndex >= waveTopDown.MaxWaveColors - 1) waveTopDown.waveColorIndex = -1;
        waveTopDown.waveColorIndex = waveTopDown.waveColorIndex + 1;
     //   console.log(waveTopDown.waveColorIndex);
    }
    const OscillateWaveColorsBackward = ()=> {
        if (waveTopDown.waveColorIndex <= 0 ) waveTopDown.waveColorIndex = waveTopDown.MaxWaveColors;
        waveTopDown.waveColorIndex = waveTopDown.waveColorIndex - 1;
//        console.log(waveTopDown.waveColorIndex);
    }
    const GeneratePulseEvent = (event) => {
        if (gsap.isTweening(waveTopDown)) return;
        gsap.getById("PulsingTween").pause();
        const Wavelength_Strecth_Strenght = 0.04;
        if(event.deltaY < 0){
            const PulseForward = new TimelineLite();
            PulseForward
            .to(waveTopDown, {duration: 0.5, wavelength:Wavelength_Strecth_Strenght, amplitude:waveTopDown.amplitude-15})
            .to(waveTopDown, {duration: 0.5, wavelength:NormalWavelength,amplitude:waveTopDown.amplitude})
            .add(OscillateWaveColors)
            .then(()=> {
                gsap.getById("PulsingTween").restart(true);
            });            
        }
         if(event.deltaY > 0){
            const PulseBackward = new TimelineLite();
            PulseBackward
            .to(waveTopDown, {duration: 0.5, wavelength:Wavelength_Strecth_Strenght, amplitude:waveTopDown.amplitude-15})
            .to(waveTopDown, {duration: 0.5, wavelength:NormalWavelength,amplitude:waveTopDown.amplitude})
            .add(OscillateWaveColorsBackward)
            .then(()=> {
                gsap.getById("PulsingTween").restart(true); 
            })
         }
    }
    const GeneratePulse = debounce(GeneratePulseEvent,250,{leading:true,trailing:false})
    const Pulse = () => {
        const Wavelength_Strecth_Strenght = 0.04;
        const Pulse_timeline = new TimelineLite({id: "PulsingTween",delay:props.SyncDelay,repeat:-1, repeatDelay:props.SyncDelay});
        Pulse_timeline
        .to(waveTopDown, {duration: 0.5, wavelength:Wavelength_Strecth_Strenght, amplitude:waveTopDown.amplitude-15})
        .to(waveTopDown, {duration: 0.5, wavelength:NormalWavelength,amplitude:waveTopDown.amplitude})
        .add(OscillateWaveColors)
        return Pulse_timeline;        
    }
    const MasterTimeline = () => {
        const Master_timeline = new TimelineLite({id: "MasterTween",delay:props.SyncDelay,repeat:-1, repeatDelay:props.SyncDelay});
      //  Master_timeline
     //   .eventCallback("onRepeat", OscillateWaveColors)
        return Master_timeline;
    }
    useEffect(() => {
        resizeCanvasToDisplaySize(CanvasContainer.current);
//        MasterTimeline();
        Pulse();
        let id = requestAnimationFrame(WaveAnimate);
        window.addEventListener('wheel',GeneratePulse);
        return (() => {
            if (window.removeEventListener) window.removeEventListener("wheel", GeneratePulse);
            else if (window.detachEvent) window.detachEvent("wheel", GeneratePulse);
            cancelAnimationFrame(id);        
        })

    },[])
    return (
        <canvas ref = {CanvasContainer} className = "WaterWave"></canvas>
    );
};

export default WaterWaveCanvas;