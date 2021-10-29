import "./App.css";
import Block from "./Blocks/Block.js";
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        alert("left");
        setValue(value + 1);
        break;
      case 38:
        alert("up");
        setValue(value + 1);
        break;
      case 39:
        alert("right");
        setValue(value + 1);
        break;
      case 40:
        alert("down");
        setValue(value + 1);
        break;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div class="backLayer">
          <div class="frontLayer">
            <div class="blockRow">
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
            </div>
            <div class="blockRow">
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
            </div>
            <div class="blockRow">
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
            </div>
            <div class="blockRow">
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
              <Block value={value}></Block>
            </div>
          </div>
          <div class="buttonGroup">
            <button>Restart</button>
            <button>Pause</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
