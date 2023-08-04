import React from "react";
import "./App.css";
import Slider from "./components/SideBar";
import CustomHeader from "./components/CustomHeader";
import Conteudo from "./components/Content";

function App() {
  return (
    <div className="App">
      <Slider />
      <CustomHeader />
      <Conteudo />
    </div>
  );
}

export default App;
