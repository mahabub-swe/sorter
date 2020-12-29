let maxNum;
let insertion = async (array, setSortedArray, speed) => {
  disableControllPanel(true);
  maxNum = Math.max(...array);
  //split the array into two
  let sorted = [];
  let unsorted = [];
  sorted.push(array[0]);
  unsorted = [...array.slice(1, array.length)];

  //visualize the splited two part
  setSortedArray([
    ...sorted.map((elem) => list(elem)),
    ...unsorted.map((elem) => list(elem, "tomato")),
  ]);

  //wait for visualization
  await waitfor(speed - 500 <= 0 ? 50 : speed - 500);

  //sorting start
  while (unsorted.length > 0) {
    let actuallPosition;

    //visualize the considering element with red background
    setSortedArray([
      ...sorted.map((elem) => list(elem)),
      ...unsorted.map((elem, indx) =>
        indx === 0 ? list(elem, "red") : list(elem, "tomato")
      ),
    ]);
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i] > unsorted[0]) {
        actuallPosition = i;
        sorted[i + 1] = sorted[i];
      }
    }
    actuallPosition === undefined
      ? (sorted[sorted.length] = unsorted[0])
      : (sorted[actuallPosition] = unsorted[0]);
    unsorted = unsorted.slice(1, unsorted.length);

    //wait for visualization
    await waitfor(speed);

    //visualize the updated position of considering element with pink background
    setSortedArray([
      ...sorted.map((elem, indx) => {
        if (actuallPosition === undefined)
          return indx === sorted.length - 1 ? list(elem, "pink") : list(elem);
        else return indx === actuallPosition ? list(elem, "pink") : list(elem);
      }),
      ...unsorted.map((elem) => list(elem, "tomato")),
    ]);

    //wait for visualization
    await waitfor(speed - 500 <= 0 ? 200 : speed - 500);
  }

  //visualize the final sorted array
  setSortedArray([...sorted.map((elem) => list(elem))]);

  //enable the array-taker input-bpx and submit button
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

export default insertion;
