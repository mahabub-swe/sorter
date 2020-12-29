import React from "react";
import "./App.css";
import ControllPanel from "./ControllPanel";
import Visualizer from "./Visualizer";

function App() {
  const [array, setArray] = React.useState([]);
  const [sortedArray, setSortedArray] = React.useState([]);

  return (
    <div className="App">
      <ControllPanel
        array={array}
        setArray={setArray}
        setSortedArray={setSortedArray}
      />
      <Visualizer array={array} sortedArray={sortedArray} />
    </div>
  );
}

export default App;
