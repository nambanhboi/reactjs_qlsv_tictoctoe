import './App.css';

import { Route, Routes, Link  } from 'react-router-dom'; 

import Qlsv from './components/qlsv/Qlsv';
import Home from './components/Home';
import Game from './components/game/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/qlsv">Qlsv</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/qlsv' element={<Qlsv />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
