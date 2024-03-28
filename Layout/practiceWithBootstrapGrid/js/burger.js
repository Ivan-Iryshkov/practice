let menu = document.querySelector(".header__list");
let burger = document.querySelector(".burger");
let menuLinks = document.querySelectorAll("header__link");

burger.addEventListener("click", function () {

  menu.classList.toggle("header__list--active");

  if (!menu.classList.contains("header__list--actived")) {
    menu.classList.add("header__list--actived");
  }

  burger.classList.toggle('burger--active');

  document.body.classList.toggle("stop-scroll");

});


menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {

    menu.classList.remove("header__list--active");

    burger.classList.remove('burger--active');

    document.body.classList.remove("stop-scroll");

  });
});
