import React from "react";

export default function visualizer({ array, sortedArray }) {
  let maxNum = Math.max(...array);
  if (sortedArray.length > 0) {
    return (
      <div className="visualizer">
        <ul>{sortedArray}</ul>
      </div>
    );
  } else {
    return array.length !== 0 ? (
      !isNaN(array[0]) ? (
        <div className="visualizer">
          <ul>
            {array.map((num, indx) => {
              return (
                <li
                  key={indx}
                  className="num-bar"
                  style={{ width: Math.round((100 / maxNum) * num) + "%" }}
                >
                  {num}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h2 style={{ fontSize: "30px" }}>put some number</h2>
      )
    ) : (
      <h2 style={{ fontSize: "30px" }}>put some number</h2>
    );
  }
}
