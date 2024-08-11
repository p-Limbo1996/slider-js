const mybtns = [...document.querySelectorAll(".mybtn")];
const container = document.querySelector(".container");
const items = [...document.querySelectorAll(".item")];
const pagebtns = [...document.querySelectorAll(".page-btn")];
const tapes = [...document.querySelectorAll(".tape")];
const autobtns = [...document.querySelectorAll(".auto-btn")];

//---------------tapes-rotate------------

for (const tape of tapes) {
  const randomNumber = Math.floor(Math.random() * 15) + 1;
  tapes[randomNumber].style.transform = `rotate(${randomNumber * 3}0deg)`;
}

//---------------prev && next btn------------
for (const btn of mybtns) {
  btn.addEventListener("click", () => {
    if (btn.id == "prev") {
      container.scrollLeft += 340;
      ChangePageBtnColor();
    } else {
      container.scrollLeft -= 340;
      ChangePageBtnColor();
    }
  });
}

//------------------------------------------mouse-event-start--------------------------------------------
//--------------scroll--------------------
container.addEventListener("wheel", function (e) {
  e.deltaY > 0 ? (container.scrollLeft += 320) : (container.scrollLeft -= 320);
  ChangePageBtnColor();
});

//--------------drag--------------------

let isDragging = false;
let startX, scrollLeft;
container.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  console.log(e.pageX);
  console.log(container.offsetLeft);
  console.log(startX);
  console.log(scrollLeft);
});

// -----------mousemove--------------
container.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  console.log(x);
  const walk = (x - startX) * 2;
  container.scrollLeft = scrollLeft - walk;

  ChangePageBtnColor();
  container.style.scrollBehavior = "auto";
});
// -----------mouseup--------------
container.addEventListener("mouseup", function () {
  isDragging = false;
  container.style.scrollBehavior = "smooth";
});

// -----------mouseleave--------------
container.addEventListener("mouseleave", function () {
  isDragging = false;
});

//------------------------------------------mouse-event-end--------------------------------------------

//---------------pagebtns-active && move scrollLeft------------

let removeactive = () => {
  for (const pagebtn of pagebtns) {
    pagebtn.classList.remove("active");
  }
};

let ChangePageBtnColor = () => {
  let scrolled = container.scrollLeft;
  if (scrolled < 800) {
    removeactive();
    pagebtns[0].classList.add("active");
  } else if (scrolled > 800 && scrolled < 2100) {
    removeactive();
    pagebtns[1].classList.add("active");
  } else if (scrolled > 2100 && scrolled < 3100) {
    removeactive();
    pagebtns[2].classList.add("active");
  } else if (scrolled > 3200) {
    removeactive();
    pagebtns[3].classList.add("active");
  }
};

for (const pagebtn of pagebtns) {
  pagebtn.addEventListener("click", () => {
    if (pagebtn.id == 1) {
      removeactive();
      container.scrollLeft = 0;
      pagebtn.classList.add("active");
    } else if (pagebtn.id == 2) {
      removeactive();
      container.scrollLeft = 1372;
      pagebtn.classList.add("active");
    } else if (pagebtn.id == 3) {
      removeactive();
      container.scrollLeft = 2736;
      pagebtn.classList.add("active");
    } else if (pagebtn.id == 4) {
      removeactive();
      container.scrollLeft = 4108;
      pagebtn.classList.add("active");
    }
  });
}

//---------------setInterval------------
let timer;
for (const autobtn of autobtns) {
  autobtn.addEventListener("click", () => {
    if (autobtn.id == "play") {
      clearActive();
      autobtn.classList.add("active");
      timer = setInterval(() => {
        ChangePageBtnColor();
        if (container.scrollLeft > 3600) {
          container.scrollLeft -= 4000;
        } else {
          container.scrollLeft += 340;
        }
      }, 3000);
    } else if (autobtn.id == "pause") {
      clearActive();
      autobtn.classList.add("active");
      clearInterval(timer);
    } else {
      removeactive();
      pagebtns[0].classList.add("active");
      clearActive();
      clearInterval(timer);
      container.scrollLeft -= 4000;
    }
  });
}
let clearActive = () => {
  for (const autobtn of autobtns) {
    autobtn.classList.remove("active");
  }
};
