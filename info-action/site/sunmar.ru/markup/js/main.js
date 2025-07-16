
import { hostReactAppReady } from "../../../common/js/usefuls.js";
import { promos } from "./data.js";
import { isPromoActive } from "./date-utils.js";
import { generateCard } from "./card-generator.js";


async function initApp() {
  await hostReactAppReady();
  renderAllPromos();
}

function renderAllPromos() {
  const container = document.getElementById("test");
  const template = document.getElementById("promo-card-template");
  
  if (!container || !template) return;

  container.innerHTML = '';

  const activePromos = promos.filter(isPromoActive);
  
  if (activePromos.length === 0) {
    container.innerHTML = '<p class="no-promos">Нет активных акций</p>';
    return;
  }

  activePromos.forEach(promo => {
    container.appendChild(generateCard(promo, template));
  });

  applyCategoryFilter('all');
}

function applyCategoryFilter(category = 'all') {
  const allCards = document.querySelectorAll('.promo-card-inner');
  let hasVisibleCards = false;

  allCards.forEach(card => {
    const cardCategories = card.dataset.categories?.split(' ') || ['all'];
    const shouldShow = category === 'all' || cardCategories.includes(category);
    
    card.style.display = shouldShow ? 'flex' : 'none';
    if (shouldShow) hasVisibleCards = true;
  });

  const noPromosMessage = document.querySelector('.no-promos');
  if (!hasVisibleCards) {
    if (!noPromosMessage) {
      const container = document.getElementById("test");
      container.insertAdjacentHTML('beforeend', '<p class="no-promos">Нет активных акций в этой категории</p>');
    }
  } else if (noPromosMessage) {
    noPromosMessage.remove();
  }
}

initApp();

window.addEventListener('filterPromos', (e) => {
  applyCategoryFilter(e.detail?.category);
});