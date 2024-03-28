(() => {
  const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: 'true',
    },

    autoplay: {
      delay: 4100,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    a11y: {
      paginationBulletMessage: 'Перейти на слайд {{index}}'
    },
  });
})();


