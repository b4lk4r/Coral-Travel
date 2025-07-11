import { hostReactAppReady } from "../../../common/js/usefuls.js";
import { tag } from "./data.js";

(async () => {
  await hostReactAppReady();
  
  const buttons = document.querySelectorAll('.navbar-button');
  
  const handleButtonClick = (clickedButton, categoryIndex) => {
    buttons.forEach(btn => 
        btn.classList.remove('active')
    );

    clickedButton.classList.add('active');
    
    window.dispatchEvent(new CustomEvent('filterPromos', {
       
      detail: { category: Object.values(tag)[categoryIndex] }
    }));
  };

  if (buttons.length > 0) {
    buttons[0].classList.add('active');
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => handleButtonClick(button, index));
  });
   
  window.dispatchEvent(new CustomEvent('filterPromos', {
    detail: { category: tag.all }  
  }));
})();
