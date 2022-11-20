import logo from './logo.svg';
import './App.css';
import Intro from './Components/Intro/Intro'
import Projects from './Components/Projects/Projects'
import { FullPage, Slide } from 'react-full-page';

function App() {
  return (
    <FullPage scrollMode="normal" className="App">
      <Slide>
        <Intro />
      </Slide>
      <Slide>
        <Projects />
      </Slide>
    </FullPage>
  );
}

export default App;
