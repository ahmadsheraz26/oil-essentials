import React from 'react';
import './App.css';
import NavigationLinks from './Components/NavigationLinks/NavigationLinks';
import InformationLinks from './Components/InformationLinks/InformationLinks';
import Header from './Components/Header/Header';
//import ActiveNumbero from './Components/ActiveNumbero/ActiveNumbero';
//import HamburgerIcon from './Components/HamburgerIcon/HamburgerIcon';
//import SocialIcons from './Components/SocialIcons/SocialIcons';
import WaterWaveCanvas from './Components/Canvases/WaterWaveCanvas/WaterWaveCanvas'
import MainContent from './Components/MainContent/MainContent';
// import WaterWaveCanvas_WithImage from './Components/WaterWaveCanvas_WithImage/WaterWaveCanvas_WithImage'
// import Button from './Components/PrimaryButton/PrimaryButton'
// import PrimaryButton from './Components/PrimaryButton/PrimaryButton';
//import TimeButton from "./Components/TimerButton/TimerButton"
//import ScrollableText from './Components/ScrollableText/ScrollableText'
function App() {
  
  const DelayBetweenAnimation = 8;
  return (
    <React.Fragment>
      <div className="App">
        <Header></Header>
        <MainContent></MainContent>
      </div>
    </React.Fragment>
  );
}

export default App;
