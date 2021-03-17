let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

/**
 * tube-1
 * tube-2
 */
ids = ["complete-flow"];

let asyncMove = async (id, curPosition = 0, finalPosition = 1) => {
  let path = document.getElementById(id);
  let flags = [true, true, true, true, true, true, true];
  while (true) {
    speed2 = document.getElementById("water-flow").value;
    speed2 = speed2 * 0.0001;
    speed2 = speed2 == 0 ? 0.0001 : speed2;
    // For Moving water in all seven pipes asynchronusly
    if (curPosition > finalPosition) break;
    curPosition += speed2;
    path.setAttribute("offset", curPosition);
    await sleep(0.5);
  }
};

let startAnimation = async () => {
  let flags = [1, 1, 1, 1];
  for (let i = 0; i < ids.length; i++) {
    id = ids[i];
    let path = document.getElementById(id);
    let finalPosition = 1;
    let curPosition = 0;
    while (true) {
      speed2 = document.getElementById("water-flow").value;
      speed2 = speed2 * 0.0001;
      speed2 = speed2 == 0 ? 0.0001 : speed2;
      if (id == "complete-flow") {
        if (curPosition > 0.45 && flags[0]) {
          asyncMove("tube-1");
          flags[0] = 0;
        }
        if (curPosition > 0.5 && flags[1]) {
          asyncMove("u1l1");
          flags[1] = 0;
        }
        if (curPosition > 0.45 && flags[2]) {
          asyncMove("tube-2");
          flags[2] = 0;
        }
        if (curPosition > 0.7 && flags[3]) {
          asyncMove("u2l2");
          flags[3] = 0;
        }
      }
      if (curPosition > finalPosition) break;
      curPosition += speed2;
      path.setAttribute("offset", curPosition);
      await sleep(2);
    }
  }
};

let resetEverything = () => {
  tube_ids = ["tube-1", "tube-2", "u1l1", "u2l2"];
  tube_ids.forEach((element) => {
    let path = document.getElementById(element);
    path.setAttribute("offset", 0);
  });
  ids.forEach((ele) => {
    let path = document.getElementById(ele);
    path.setAttribute("offset", 0);
  });
};
disablestart = false;
let startAn = async () => {
  resetEverything();
  document.getElementById("startbutton").disabled = true;
  document.getElementById("resetbutton").disabled = true;
  await startAnimation();
  document.getElementById("startbutton").disabled = false;
  document.getElementById("resetbutton").disabled = false;
};
