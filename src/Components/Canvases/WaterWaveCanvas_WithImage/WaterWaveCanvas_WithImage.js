import React, { useRef, useEffect } from 'react';
import "../WaterWaveCanvas/WaterWaveCanvas.css"
import "../WaterWaveCanvas/ResizeCanvas"
import {OscillateColors} from "../../../assets/Helpful_Functions/Helpful_Functions"
import {TimelineLite,gsap} from 'gsap'
import { resizeCanvasToDisplaySize } from '../WaterWaveCanvas/ResizeCanvas';
import { debounce } from 'lodash';

const WaterWaveCanvas_WithImage = (props) => {
    const CanvasImageContainer = useRef();
    let ctx;
    let CanvasWidth;
    let CanvasHeight;
    let CurrentImageInView = 0;
    let ImageWave = {}
    let Images;
    const loadAllImages = (sources) => {
        return new Promise((resolve) => {
            let images = {};
            let loadedImages = 0
            let MaxImages = sources.length;
            for(let src in sources){
                images[src] = new Image();
                images[src].src = sources[src];
                images[src].onload = function(){
                    if(++loadedImages >= MaxImages){
                       resolve(images); 
                    }
                }
            }
        })

    }
    const Init_Canvas = () => {
        CanvasWidth = CanvasImageContainer.current.offsetWidth;
        CanvasHeight = window.innerHeight;
        resizeCanvasToDisplaySize(CanvasImageContainer.current, CanvasWidth, CanvasHeight);
        ctx = CanvasImageContainer.current.getContext("2d");
    }
    const Init_ImageWave = (ImagesObject) => {
        const WaveX_Direction = (CanvasWidth-80) / 2;
        const WaveY_Direction = (CanvasHeight)/4;
        Images = ImagesObject;
        const HiddenImage_Y_Value = -1*(ImagesObject[0].height + WaveY_Direction)
        const Wavelength = 0.0165;
        const Omega = Wavelength / (HiddenImage_Y_Value*-1);
        ImageWave = {
            WaveLength:Wavelength,
            Amplitude:5,
            X_Direction:WaveX_Direction,
            Y_Direction:WaveY_Direction,
            Omega:Omega,
            Y_Value_ToHideImage:HiddenImage_Y_Value,
        }
    } 
    const DrawImage_Wavy =  (patternObj ,Changing_Y_value) => {
        const iw = patternObj.width;
        const ih = patternObj.height;
        ctx.clearRect(0, 0, CanvasImageContainer.current.width, CanvasImageContainer.current.height);
        let Reverse_Y_Direction = 1*(Changing_Y_value-ImageWave.Y_Direction);
        let om = ImageWave.Omega * Reverse_Y_Direction;
        for(let y = 0; y < ih; y+=2) {
            let x = ImageWave.Amplitude * Math.sin(y*om) + ImageWave.X_Direction
            ctx.drawImage(patternObj, 0, y, iw, 2, x, y+Changing_Y_value, iw, 2);
        }
    }
    const WaveImageIn_Animation = (Wave,patternObj) => {
        const WaveImageIn_Timeline = new TimelineLite({id:"WaveImageIn"})
        .addLabel("WaveImageIn")
        .fromTo (Wave,
            {Y_Direction:CanvasImageContainer.current.height},
            {duration:0.5,Y_Direction:ImageWave.Y_Direction,ease:"ease",
            onUpdate:function(){
                DrawImage_Wavy(patternObj,Wave.Y_Direction);
            }}
        )
        return WaveImageIn_Timeline;        
    }
    const WaveImageOut_Animation = (Wave,patternObj) => {
        const WaveImageOut_Timeline = new TimelineLite({id:"WaveImageOut"});
        WaveImageOut_Timeline
        .addLabel("WaveImageOut")
        .fromTo (Wave,
            {Y_Direction:ImageWave.Y_Direction},
            {duration:0.5,Y_Direction:ImageWave.Y_Value_ToHideImage,ease:"ease",
            onUpdate:function(){
                DrawImage_Wavy(patternObj,Wave.Y_Direction);
            }}
        )
        return WaveImageOut_Timeline;        
    }    
    const ScrollImages = event => {        
        //gsap.getById("Rolling_Images").pause();
        //console.log(CurrentImageInView);
        //if (gsap.getById("WaveImageOut").isActive() || gsap.getById("WaveImageIn").isActive()) return;
        //console.log(gsap.getById("WaveImageOut").isActive());
        //console.log(gsap.getById("WaveImageIn").isActive());
        //console.log(gsap.getById("Rolling_Images").isActive());
        //console.log(gsap.isTweening(Images));
        //console.log(gsap.isTweening("Rolling_Images"));
        
        let t1 = gsap.getById("Rolling_Images");
        //let t3 = t1.getChildren(false,false,true);
        let dontdoit = false;
        let elem;
        t1.getChildren(false,false,true).forEach(element => {
            if(element.isActive()) {
                dontdoit = true;
                console.log(element);
                console.log(dontdoit)
                elem = element;
            }
        })
        if(dontdoit) {
            return;
            // elem.then(()=> {
            //     console.log("En");
            //     if(event.deltaY < 0){
            //         console.log("Up")
            //         t1.pause("ImageObject_" + CurrentImageInView).resume();
            //     }
            //     if(event.deltaY > 0){
            //         console.log("Down")
            //         let N_Image,C_Image;
            //         C_Image = CurrentImageInView;
            //         if (C_Image <= 0) N_Image = props.MaxImages - 1; 
            //         else N_Image = C_Image - 1;
            //         t1.pause("ImageObjectForBack_" + N_Image);
            //         const t2 = new TimelineLite();
            //         t2.add(WaveImageIn_Animation(Object.assign({},ImageWave),Images[C_Image]).reverse())
            //         t2.add(WaveImageOut_Animation(Object.assign({},ImageWave),Images[N_Image]).reverse())
            //         .then(()=>{
            //             t1.resume();
            //             CurrentImageInView = N_Image;
            //         })         
            //     }
            //     return;
            // })
        }
        if(event.deltaY < 0){
            console.log("Up")
            t1.pause("ImageObject_" + CurrentImageInView).resume();
        }
        if(event.deltaY > 0){
            console.log("Down")
            console.log(CurrentImageInView)
            let N_Image,C_Image;
            C_Image = CurrentImageInView;
            if (C_Image <= 0) N_Image = props.MaxImages - 1; 
            else N_Image = C_Image - 1;
            t1.pause("ImageObjectForBack_" + N_Image);
            const t2 = new TimelineLite();
            t2.add(WaveImageIn_Animation(Object.assign({},ImageWave),Images[C_Image]).reverse())
            t2.add(WaveImageOut_Animation(Object.assign({},ImageWave),Images[N_Image]).reverse())
            .then(()=>{
                t1.resume();
                CurrentImageInView = N_Image;
            })         
        }
    }
    const DelayTimeline = () => {
        const t1= new TimelineLite({delay:(props.SyncDelay-1)});
        t1.delay(props.SyncDelay - 1);
        return t1;
    }
    let ImageObject;
    const InfiniteAnimation = () => {
        const InfiniteAnimation_Timeline = new TimelineLite({id : "Rolling_Images",repeat:-1});
        for(let i=0; i< props.MaxImages;i++){
            InfiniteAnimation_Timeline
            //.add(NewAnimation(Images[i],"ImageObject_" + i, i),"ImageObject_" + i)
            .add(WaveImageIn_Animation(Object.assign({},ImageWave), Images[i]))
            //.addLabel("ImageObject_" + i)
            .set(ImageWave,{delay:props.SyncDelay},"ImageObjectForBack_" + i)
            //.add(DelayTimeline(),"ImageObjectForBack_" + i)
            .add(WaveImageOut_Animation(Object.assign({},ImageWave), Images[i]),"ImageObject_" + i)
            .call(()=> {
                if(i >= props.MaxImages-1) CurrentImageInView = 0;
                else CurrentImageInView = i+1;
            })

            //.set(ImageWave,{X_Direction:ImageWave.X_Direction},"TimelineEnds");
        }
        // .add(NewAnimation(Images[0], "ImageObject_0"))
        // .add(NewAnimation(Images[1], "ImageObject_1"))
        // .add(NewAnimation(Images[2], "ImageObject_2"))
        // .add(NewAnimation(Images[3], "ImageObject_3"))
        // for(let i=0; i< props.MaxImages;i++){
        //     InfiniteAnimation_Timeline
        //     .add(WaveImageIn_Animation(Object.assign({},ImageWave), ImagObject[i]))
        //     .addLabel("BackwardImage" + i)
        //     .add(DelayTimeline())
        //     .addLabel(i)
        //     .add(WaveImageOut_Animation(Object.assign({},ImageWave),ImagObject[i]))

        // }
        return InfiniteAnimation_Timeline;
    }
    const ScrollImagesDebounceRef = debounce(ScrollImages,250,{leading:true,trailing:false})
   
    useEffect(() => {
        const ImagesSources = [
            require("../../../assets/Oils_Images/Image_1.png"),
            require("../../../assets/Oils_Images/Image_2.png"),
            require("../../../assets/Oils_Images/Image_3.png"),
            require("../../../assets/Oils_Images/Image_4.png")
        ]
        loadAllImages(ImagesSources).then((Images)=>{
            Init_Canvas();
            Init_ImageWave(Images);
            //ImageObject = Images[CurrentImageInView];
            InfiniteAnimation();

            window.addEventListener('wheel',ScrollImagesDebounceRef);
            return (() => {
                if (window.removeEventListener) window.removeEventListener("wheel", ScrollImagesDebounceRef);
                else if (window.detachEvent) window.detachEvent("wheel", ScrollImagesDebounceRef);
            })
        });

        return ( ()=> {
            window.removeEventListener('wheel');
        })
    },[]) 

    return (
        <React.Fragment>
            <canvas className = "WaterWaveImage" ref = {CanvasImageContainer}></canvas>
        </React.Fragment>

    );
};

export default WaterWaveCanvas_WithImage;