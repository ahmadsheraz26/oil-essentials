import React from 'react';
import WaterWaveCanvas from "../Canvases/WaterWaveCanvas/WaterWaveCanvas"
import ActiveNumbero from "../ActiveNumbero/ActiveNumbero"
import ScrollableText from '../ScrollableText/ScrollableText'
import "./MainContent.css"
import WaterWaveCanvas_WithImage from '../Canvases/WaterWaveCanvas_WithImage/WaterWaveCanvas_WithImage';
function MainContent(props) {
    const Products_Name = ["Energy", "Calm", "Passion", "Sleep"];
    const Products_Details = [
        "Energize any room to refresh and refocus.",
        "Zen in a bottle. 100% Pure Essential Oils designed to reduce stress and anxiety so you can focus on what matters.",
        "Life's Natural aphrodisiacs. 100% Pure Essential Oils designed to increase romance, excitement and libido.",
        "Welcome to a dreamy sleep. 100% Pure Essential Oils to help you fall asleep faster and wake up refreshed.",
    ]
    const Animation_SyncDelay = 10;
    return (
        <React.Fragment>
            <WaterWaveCanvas
                SyncDelay = {Animation_SyncDelay}
            ></WaterWaveCanvas>
            <main>
                <ActiveNumbero 
                    TotalPage = {4} 
                    SyncDelay = {Animation_SyncDelay}>
                </ActiveNumbero>
                <div id = "ProductDetails">
                    <ScrollableText 
                        MaxContent = {4}
                        TextStyle = {"Heading"}
                        ContentArray = {Products_Name} 
                        SyncDelay = {Animation_SyncDelay}>
                    </ScrollableText>
                    <ScrollableText 
                        MaxContent = {4}
                        TextStyle = {"Description"}
                        ContentArray = {Products_Details} 
                        SyncDelay = {Animation_SyncDelay}>
                    </ScrollableText>

                </div>
                <WaterWaveCanvas_WithImage MaxImages={4}
                    SyncDelay = {Animation_SyncDelay}
                ></WaterWaveCanvas_WithImage>
            </main>  
        </React.Fragment>
        
    );
}

export default MainContent;