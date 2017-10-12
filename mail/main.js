document.addEventListener('DOMContentLoaded', fx, false);

function fx () {
  let clickables = document.querySelectorAll(".sidebar-nav li");

  clickables.forEach((el) => {
    el.addEventListener("click", clickEvent);
  });

}

function clickEvent(event) {
  let htmIll = event.target;
  let text = htmIll.innerText;
  text = text.toLowerCase();
  window.location.hash = text;
  console.log(htmIll);
}
