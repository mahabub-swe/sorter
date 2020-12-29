let maxNum;

let mergeSort = async (arr, setSortedArray, speed) => {
  let inc = 0;
  let array = [...arr];
  disableControllPanel(true);
  maxNum = Math.max(...array);

  //call divider function to divide array recursively
  divide(array);
  async function divide(array, lp = 0, rp = array.length - 1) {
    if (lp < rp) {
      let mp = Math.floor((lp + rp) / 2);

      divide(array, lp, mp);
      divide(array, mp + 1, rp);
      merge(array, lp, mp, rp);
    }
  }

  //concure the divided array to form sorted one
  async function merge(array, lp, mp, rp) {
    let ivp = lp; //initial visual point
    let sortedArray = [];
    let i = 0;
    let j = 0;
    let firstHalf = array.slice(lp, mp + 1);
    let secondHalf = array.slice(mp + 1, rp + 1);

    //visualization of unsorted part going to be sorted
    let unsorted = [...array];
    setTimeout(() => {
      setSortedArray(
        unsorted.map((elem, indx) =>
          indx >= ivp && indx <= rp ? list(elem, "tomato") : list(elem)
        )
      );
    }, inc++ * speed);

    while (i < firstHalf.length && j < secondHalf.length) {
      if (firstHalf[i] < secondHalf[j]) {
        sortedArray.push(firstHalf[i]);
        i++;
      } else {
        sortedArray.push(secondHalf[j]);
        j++;
      }
    }
    while (i < firstHalf.length) {
      sortedArray.push(firstHalf[i]);
      i++;
    }
    while (j < secondHalf.length) {
      sortedArray.push(secondHalf[j]);
      j++;
    }
    for (let k = 0; k < sortedArray.length; k++) {
      array[lp] = sortedArray[k];
      lp++;
    }

    //visualization of sorted part
    let sorted = [...array];
    setTimeout(() => {
      setSortedArray(
        sorted.map((elem, indx) =>
          rp - ivp == array.length - 1
            ? list(elem)
            : indx >= ivp && indx <= rp
            ? list(elem, "pink")
            : list(elem)
        )
      );
    }, inc++ * speed);
    console.log(inc);
  }

  //enable controll-panel after sorting
  setTimeout(() => {
    disableControllPanel(false);
  }, (array.length - 1) * 2 * speed - speed);
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

function disableControllPanel(bv = true) {
  document.querySelector(".array-taker").disabled = bv;
  document.querySelector(".btn").disabled = bv;
}
export default mergeSort;
