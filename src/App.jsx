import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Filter from './components/Filter/Filter';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='buscador' element={<Filter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
