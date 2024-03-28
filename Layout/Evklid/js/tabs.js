(() => {
  let tabsBtn = document.querySelectorAll('.how__btn')
  let tabsItem = document.querySelectorAll('.tabs-item')

  tabsBtn.forEach(function(element){
    element.addEventListener('click', function(e){
      const path = e.currentTarget.dataset.path;

      tabsBtn.forEach(function(btn){btn.classList.remove('how__btn--active')});
      e.currentTarget.classList.add('how__btn--active');

      tabsItem.forEach(function(element){element.classList.remove('tabs-item--active')});
      document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
    });
  });

})();

