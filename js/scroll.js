let menu = document.querySelector(".mobile-nav-toggle");
let nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  let visibility = nav.getAttribute("data-visible");

  if (visibility == "false") {
    nav.setAttribute("data-visible", true);
    menu.setAttribute("data-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    menu.setAttribute("data-expanded", false);
  }
});

let links = Array.from(document.querySelectorAll("nav a"));

let running = false;
links.forEach((l) =>
  l.addEventListener("click", (e) => {
    if (!running) running = true;
    else return;

    let id = l.href.slice(l.href.indexOf("#"));
    let target = document.querySelector(id);

    let top = target.getBoundingClientRect().top;
    let topRelativeToTheDocument = top + scrollY;

    if (topRelativeToTheDocument > document.body.scrollHeight - innerHeight) {
      topRelativeToTheDocument = document.body.scrollHeight - innerHeight;
    }

    function move(time) {
      let dist = topRelativeToTheDocument - scrollY;

      if (Math.abs(dist) < 20) {
        window.scrollTo(0, topRelativeToTheDocument);

        let navBottom = nav.getBoundingClientRect().bottom;
        top = target.getBoundingClientRect().top;

        if (navBottom > top && scrollY > 0 && innerWidth > 576) {
          window.scrollBy(0, top - navBottom);
        }

        running = false;
        return false;
      }

      if (topRelativeToTheDocument > scrollY) {
        window.scrollBy(0, time * 2500);
      } else {
        window.scrollBy(0, -(time * 2500));
      }

      return true;
    }

    runAnimation(move);

    e.preventDefault();
  })
);

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
