import React from "react";
import selection from "./sorter/selection";
import bubble from "./sorter/bubble";
import insertion from "./sorter/insertion";
import merge from "./sorter/merge";

export default function ControllPanel({ array, setArray, setSortedArray }) {
  function submissionHandler(event) {
    event.preventDefault();
    let method = document.querySelector(".sortmethod-selector").value;
    let speed = document.querySelector("#speed").value;
    if (method === "selection") {
      selection(array, setSortedArray, speed);
    } else if (method === "bubble") {
      bubble(array, setSortedArray, speed);
    } else if (method === "insertion") {
      insertion(array, setSortedArray, speed);
    } else if (method === "merge") {
      merge(array, setSortedArray, speed);
    }
  }

  function arrayIputHandler(event) {
    setSortedArray([]);
    let input = event.target.value.split(",");
    if (!/,$/.test(input)) {
      // setArray(input.map((num) => parseInt(num)));
      setArray(input.map((num) => parseInt(num)).filter((num) => !isNaN(num)));
    }
  }
  function arrayInputChacker(event) {
    if (!/\d|,/.test(event.key)) event.preventDefault();
  }

  return (
    <form className="controll-panel" action="/sdsdg">
      <input
        type="text"
        className="array-taker"
        placeholder="45,7,56,12,26,9"
        onKeyPress={arrayInputChacker}
        onChange={arrayIputHandler}
      />
      <select className="sortmethod-selector">
        <option value="selection">selection</option>
        <option value="bubble">bubble</option>
        <option value="insertion">insertion</option>
        <option value="merge">merge</option>
      </select>
      <div className="speed-controller">
        <input id="speed" type="range" min="10" max="4010" step="100" />
        <div className="speed-ticks">
          <span className="tick">fast</span>
          <span className="tick">regular</span>
          <span className="tick">slow</span>
        </div>
      </div>
      <button className="btn" onClick={submissionHandler}>
        sort
      </button>
    </form>
  );
}
