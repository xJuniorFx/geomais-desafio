import React from 'react';
import './App.css';
import Slider from './components/layout/SideBar';
import CustomHeader from './components/layout/CustomHeader';
import Conteudo from './components/layout/Content';

function App() {
  return (
    <div className="App">
      <Slider/>
      <CustomHeader />
      <Conteudo />
    </div>
  );
}

export default App;
