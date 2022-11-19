let count = 1;
function cc() {
  dd();
  console.log(count);
}

function dd() {
  const arrs = [1, 2, 3, 4, 5, 6, 7, 8];
  (() => {
    for (let arr of arrs) {
      count += 1;
      // console.log(count, "cc");
    }
  })();
}

cc();
