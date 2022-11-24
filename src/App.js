import React, { useEffect, useState } from "react";
import './App.css';
import Intro from './Components/Intro/Intro'
import Projects from './Components/Projects/Projects'
import AboutMe from './Components/AboutMe/AboutMe'
import { FullPage, Slide } from 'react-full-page';
import { slide as Menu } from 'react-burger-menu'

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <FullPage scrollMode="normal" className="App">
      {/* <Slide id="IntroPage">
      <Menu right isOpen={isMenuOpen} onStateChange={(state) => setMenuOpen(state.isOpen)}>
        <a value="IntroPage" href="#IntroPage" onClick={() => setMenuOpen(false)}>Home</a>
        <a value="ProjectsPage" href="#ProjectsPage" onClick={() => setMenuOpen(false)}
         >Projects</a>
      </Menu>
        <Intro />
      </Slide> */}
      <Slide id="AboutMePage">
        <AboutMe />
      </Slide>
       {/* <Slide id="ProjectsPage">
        <Projects />
      </Slide> */}
    </FullPage>
  );
}

export default App;
