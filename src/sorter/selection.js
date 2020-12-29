let maxNum;
let selection = async (arr, setSortedArray, speed) => {
  let array = [...arr];
  disableControllPanel(true);
  maxNum = Math.max(...array);

  for (let i = 0; i < array.length; i++) {
    //highlite the elements those are under consideration
    setSortedArray(
      array.map((elem, indx) => (indx >= i ? list(elem, "tomato") : list(elem)))
    );

    //waite for animation
    await waitfor(speed);

    //finding the minimum
    let min = Math.min(...array.slice(i, array.length));
    let minIndx = i + array.slice(i, array.length).indexOf(min);

    //highlite the minimum element
    setSortedArray(
      array.map((elem, indx) =>
        indx >= i
          ? indx === minIndx
            ? list(elem, "red")
            : list(elem, "tomato")
          : list(elem)
      )
    );

    //waite for animation
    await waitfor(speed - 500 === 0 ? 50 : speed - 500);

    //swap the minimum with array[i]
    array[minIndx] = array[i];
    array[i] = min;
  }
  setSortedArray(array.map((elem) => list(elem)));
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

export default selection;
