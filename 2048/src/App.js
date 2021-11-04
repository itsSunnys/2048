import "./App.scss";
import Block from "./Blocks/Block.js";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const testState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
  ];
  const testColumn = convertColumn(testState);

  const [valueRow, setValueRow] = useState(testState);
  const [valueColumn, setValueColumn] = useState(testColumn);
  const [valueNew, setValueNew] = useState([]);
  const [action, setAction] = useState(0);

  function convertColumn(valueInput) {
    let value = [[], [], [], []];
    for (let i = 0; i < valueInput.length; i++) {
      valueInput.map((row) => value[i].push(row[i]));
    }
    return value;
  }

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

  function fillBlock(row, moveDirection, randomCase, randomRow) {
    let count = 0;
    if (moveDirection == "L") {
      while (row.length != 4) {
        row.push(0);
        ++count;
      }
      if (randomCase) {
        const index = getRndInteger(4 - count, 4);
        row[index] = rollValue();
        setValueNew([randomRow, index]);
      }
    } else {
      while (row.length != 4) {
        row.unshift(0);
        ++count;
      }
      if (randomCase) {
        const index = getRndInteger(0, count);
        row[index] = rollValue();
        setValueNew([randomRow, index]);
      }
    }
  }

  function addBlock(row, moveDirection) {
    if (moveDirection == "L") {
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
          row[i] *= 2;
          row.splice(i + 1, 1);
        }
      }
    } else {
      for (let i = row.length - 1; i > -1; i--) {
        if (row[i] == row[i - 1]) {
          row[i] *= 2;
          row.splice(i - 1, 1);
          --i;
        }
      }
    }
  }

  function getRndInteger(min, max) {
    if (min < max) return Math.floor(Math.random() * (max - min)) + min;
  }
  function rollValue() {
    if (Math.random() < 0.1) {
      return 4;
    } else return 2.0;
  }

  function generateRandom() {
    let counter = 0;
    const num = getRndInteger(0, 2);

    loop1: while (counter > -1) {
      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (let ColumnIndex = 0; ColumnIndex < 4; ColumnIndex++) {
          if (valueRow[rowIndex][ColumnIndex] == 0 && counter == num) {
            valueRow[rowIndex][ColumnIndex] = 2;
            counter = -1;
            setValueRow(valueRow);
            break loop1;
          }
          ++counter;
        }
      }
    }
  }
  function generateRandom2() {
    const x = getRndInteger(0, 4);
    const y = getRndInteger(0, 4);

    console.log(x);
    console.log(y);
    if (valueRow[x][y] === 0) valueRow[x][y] = 2;
    else generateRandom2();
  }
  function generateRandom3() {
    const row = getRndInteger(0, 4);
    valueRow.map((row) => {
      for (let i = 0; i < 4; i++) {
        row.indexOf(0, i);
      }
    });
  }
  function generateRandom4(row, rowIndex, direction, randomRow) {
    if (randomRow === rowIndex) {
      const availableColumns = row.filter((i) => i === 0).length;
      if (direction === "L") {
        valueRow[getRndInteger(4 - availableColumns, 4)] = 2;
      } else {
        valueRow[getRndInteger(0, availableColumns)] = 2;
      }
    }
  }

  function respondAction(type, direction) {
    const randomRow = getRndInteger(0, 4);
    if (type == 37 || type == 39) {
      valueRow.map((row, rowIndex) => {
        moveBlock(row, direction);
        addBlock(row, direction);
        fillBlock(row, direction, randomRow === rowIndex, randomRow);
      });

      setValueColumn(convertColumn(valueRow));
    } else {
      valueColumn.map((Column, columnIndex) => {
        moveBlock(Column, direction);
        addBlock(Column, direction);
        fillBlock(Column, direction, randomRow === columnIndex, randomRow);
      });

      setValueRow(convertColumn(valueColumn));
    }
  }

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      //left
      case 37:
        respondAction(37, "L");
        setAction(0);
        break;
      //up
      case 38:
        respondAction(38, "L");
        setAction(1);
        break;
      //right
      case 39:
        respondAction(39, "R");
        setAction(0);
        break;
      //down
      case 40:
        respondAction(40, "R");
        setAction(1);
        break;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div class="backLayer">
          <div class="frontLayer">
            {valueRow.map((row, rowCount) => (
              <div class="blockRow">
                {row.map((column, columnCount) => (
                  <Block
                    class="block"
                    valueRow={valueRow[rowCount][columnCount]}
                    animation={
                      valueNew[0 + action] === rowCount &&
                      valueNew[1 - action] === columnCount
                    }
                  />
                ))}
              </div>
            ))}
          </div>
          <div class="buttonGroup">
            <button
              className="btn btn-warning"
              onClick={() => {
                setValueRow(testState);
                setValueColumn(convertColumn(testState));
              }}
            >
              Restart
            </button>
            <button className="btn btn-primary" onClick={() => alert("PAUSED")}>
              Pause
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
