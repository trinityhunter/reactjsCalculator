// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let [previous, setPrevious] = useState("ANS");

  let numerics = new Set("0123456789.");
  let operators = new Set("+-*/%");

  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  let evaluateExpression = function () {
    // eslint-disable-next-line no-eval
    let evaluation = eval(expression);
    setOldExpression("ANSWER = " + expression);
    setExpression(String(evaluation));
    // expression = evaluation 
    setPrevious("ANS");

  }

  let putNumerics = function (value) {
    if (previous === "ANS") {
      setOldExpression("ANSWER = " + expression);
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
    setPrevious("NUM");
  };

  let putOperator = function (value) {
    if (previous !== "OP") {
      setExpression(expression + value);
    } else {
      setExpression(expression.slice(0, -1) + value);
    }
    setPrevious("OP");
  };

  let putDelete = function () {
    if (expression.length >= 1) {
      setExpression(expression.slice(0, -1));
    }
    setPrevious("DEL");
  };
  let handleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      putDelete();
    }
    else if (numerics.has(event.key)) {
      putNumerics(event.key);
    }
    else if (operators.has(event.key)) {
      putOperator(event.key);
    }
    else if (event.key === "Enter") {
      // eslint-disable-next-line no-eval
      evaluateExpression();
    }
  }




  return (
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp}>
      <div style={{
        padding: "10px",
        borderRadius: "10px",
        background: "#2A2B2DFF",
        paddingBottom: "30px",

      }}>

        <h1 style={{
          color: "#ffffff",
          textAlign: "center"
        }}>  <strong id = "col">YOU CAN COUNT ON ME !!</strong></h1>
        <div
          style={{
            width: "400px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            margin: "20px",
            padding: "20px",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >

          <h6>{oldExpression}</h6>
          <h1>{expression}</h1>


        </div>


        <div 
          style={{
            width: "400px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",

            alignItems: "flex-end",
            justifyContent: "center",

            padding: "20px",
            marginLeft: "20px",
            borderRadius: "15px",
            flexWrap: "wrap",
          }}
        >

          {buttons.map(function (buttonValue, idx) {
            return <button id = "btn" style={{
              width: "90px",
              margin: "5px",
              padding: "5px",
              borderRadius: "25px",
              backgroundColor: "#D4AF37",
              

            }}
              onClick={function () {
                if (buttonValue === "AC") {
                  putDelete();
                } else if (numerics.has(buttonValue)) {
                  putNumerics(buttonValue);
                } else if (operators.has(buttonValue)) {
                  putOperator(buttonValue);
                } else if (buttonValue === "=") {
                  evaluateExpression();
                }
              }}
            >
              {buttonValue}</button>
          })}


        </div>


      </div>
    </div>
  );
}

export default App;
