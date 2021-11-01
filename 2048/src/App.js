import "./App.css";
import Block from "./Blocks/Block.js";
import React, { useState } from "react";

function App() {
  const testState = [
    [2, 2, 2, 2],
    [0, 0, 4, 4],
    [2, 2, 4, 8],
    [0, 0, 16, 0],
  ];

  const [valueRow, setValueRow] = useState(testState);

  function convertColumn() {}

  function moveBlock(row, moveDirection) {
    if (moveDirection == "L") {
      for (let i = 0; i < row.length; i++) {
        if (row[i] == 0) {
          row.splice(i, 1);
          moveBlock(row);
        }
      }
    } else {
      for (let i = row.length - 1; i > -1; i--) {
        if (row[i] == 0) {
          row.splice(i, 1);
          moveBlock(row);
        }
      }
    }
  }

  function fillBlock(row, moveDirection) {
    if (moveDirection == "L") {
      while (row.length != 4) {
        row.push(0);
      }
    } else {
      while (row.length != 4) {
        row.unshift(0);
      }
    }
  }

  function addBlock(row, moveDirection) {
    if (moveDirection == "L") {
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
          row[i] *= 2;
          row[i + 1] = 0;
        }
      }
    } else {
      for (let i = row.length - 1; i > -1; i--) {
        if (row[i] == row[i - 1]) {
          row[i] *= 2;
          row[i - 1] = 0;
        }
      }
    }
  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        let newValueLeft = [];

        valueRow.map((row) => {
          addBlock(row, "L");
          moveBlock(row, "L");
          fillBlock(row, "L");
          newValueLeft.push(row);
        });
        setValueRow(newValueLeft);
        break;

      case 38:
        alert("up");
        setValueRow(valueRow + 1);
        break;
      case 39:
        let newValueRight = [];

        valueRow.map((row) => {
          addBlock(row, "R");
          moveBlock(row, "R");
          fillBlock(row, "R");
          newValueRight.push(row);
        });
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
            <button onClick={() => setValueRow(testState)}>Restart</button>
            <button>Pause</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
