import { hostReactAppReady } from "../../../common/js/usefuls.js";

(async () => {
  await hostReactAppReady();
  
  const buttons = document.querySelectorAll('.navbar-button');
  
  const categories = ['all', 'recommended', 'hotels', 'destinations', 'sunmarbonus', 'other'];
 
  if (buttons.length > 0) {
      buttons[0].classList.add('active');
  }
 
  buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => {
              btn.classList.remove('active');
          });
 
          button.classList.add('active');
 
          window.dispatchEvent(new CustomEvent('filterPromos', {
              detail: { category: categories[index] }
          }));
      });
  });
 
  window.dispatchEvent(new CustomEvent('filterPromos', {
      detail: { category: 'all' }
  }));
})();