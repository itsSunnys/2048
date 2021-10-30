import "./App.css";
import Block from "./Blocks/Block.js";
import React, { useState } from "react";

function App() {
  const [valueRow, setValueRow] = useState([
    [2, 2, 2, 2],
    [0, 0, 4, 0],
    [0, 4, 3, 0],
    [0, 0, 0, 0],
  ]);

  function moveBlock(row) {
    for (let i = 1; i < 3; i++) {
      if (row[i - 1] == 0) {
        row[i - 1] = row[i];
        row[i] = 0;
        console.log(row);
        moveBlock(row);
      } else {
      }
    }
  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        let newValueLeft = [];

        valueRow.map((row) => {
          for (let i = 0; i < row.length - 1; i++) {
            if (row[i] == row[i + 1]) {
              row[i] *= 2;
              row[i + 1] = 0;
              break;
            }
          }

          // moveBlock(row);

          newValueLeft.push(row);
        });

        console.log(newValueLeft);
        setValueRow(newValueLeft);

        break;
      case 38:
        alert("up");
        setValueRow(valueRow + 1);
        break;
      case 39:
        let newValueRight = [];

        valueRow.map((row) => {
          row.sort(function (a, b) {
            return a - b;
          });
          for (let i = 0; i < row.length - 1; i++) {
            if (row[i] == row[i + 1]) {
              row[i] = 0;
              row[i + 1] *= 2;
            }
          }
          newValueRight.push(row);
          console.log(row);
        });

        console.log(newValueRight);
        setValueRow(newValueRight);

        break;
      case 40:
        alert("down");
        setValueRow(valueRow + 1);
        break;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div class="backLayer">
          <div class="frontLayer">
            <div class="blockRow">
              <Block valueRow={valueRow[0][0]}></Block>
              <Block valueRow={valueRow[0][1]}></Block>
              <Block valueRow={valueRow[0][2]}></Block>
              <Block valueRow={valueRow[0][3]}></Block>
            </div>
            <div class="blockRow">
              <Block valueRow={valueRow[1][0]}></Block>
              <Block valueRow={valueRow[1][1]}></Block>
              <Block valueRow={valueRow[1][2]}></Block>
              <Block valueRow={valueRow[1][3]}></Block>
            </div>
            <div class="blockRow">
              <Block valueRow={valueRow[2][0]}></Block>
              <Block valueRow={valueRow[2][1]}></Block>
              <Block valueRow={valueRow[2][2]}></Block>
              <Block valueRow={valueRow[2][3]}></Block>
            </div>
            <div class="blockRow">
              <Block valueRow={valueRow[3][0]}></Block>
              <Block valueRow={valueRow[3][1]}></Block>
              <Block valueRow={valueRow[3][2]}></Block>
              <Block valueRow={valueRow[3][3]}></Block>
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
