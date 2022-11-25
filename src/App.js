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
    <div className="App">
      <div id="IntroPage">
      <Menu right isOpen={isMenuOpen} onStateChange={(state) => setMenuOpen(state.isOpen)}>
        <a value="IntroPage" href="#IntroPage" onClick={() => setMenuOpen(false)}>Home</a>
        <a value="AboutMePage" href="#AboutMePage" onClick={() => setMenuOpen(false)}>Work Experience</a>
        <a value="ProjectsPage" href="#ProjectsPage" onClick={() => setMenuOpen(false)}
         >Projects</a>
      </Menu>
        <Intro />
      </div>
      <div id="AboutMePage">
        <AboutMe />
      </div>
       <div id="ProjectsPage">
        <Projects />
      </div>
    </div>
  );
}

export default App;
