let maxNum;

let bubble = async (arr, setSortedArray, speed) => {
  let array = [...arr];
  disableControllPanel(true);
  maxNum = Math.max(...array);

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      //highlite the elements those are under consideration
      setSortedArray(
        array.map((elem, indx) =>
          indx === j || indx === j + 1 ? list(elem, "tomato") : list(elem)
        )
      );

      //waite for animation
      await waitfor(speed);

      //finding the max
      let max = Math.max(array[j], array[j + 1]);
      let maxIndx = j + array.slice(j, array.index).indexOf(max);

      //highlite the max element
      setSortedArray(
        array.map((elem, indx) =>
          indx === j || indx === j + 1
            ? indx === maxIndx
              ? list(elem, "red")
              : list(elem, "tomato")
            : list(elem)
        )
      );

      //waite for animation
      await waitfor(speed - 500 === 0 ? 50 : speed - 500);

      //swap the max
      if (j === maxIndx) {
        array[j] = array[j + 1];
        array[j + 1] = max;
      }
    }
    setSortedArray(array.map((elem) => list(elem)));
  }
  disableControllPanel(false);
};

function list(elem, bg) {
  return (
    <li
      className="num-bar"
      style={{
        backgroundColor: bg,
        width: Math.round((100 / maxNum) * elem) + "%",
      }}
    >
      {elem}
    </li>
  );
}
function waitfor(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}
function disableControllPanel(bv) {
  document.querySelector(".array-taker").disabled = bv;
  document.querySelector(".btn").disabled = bv;
}

export default bubble;
