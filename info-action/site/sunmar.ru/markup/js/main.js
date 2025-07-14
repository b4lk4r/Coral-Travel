// main.js
import { hostReactAppReady } from "../../../common/js/usefuls.js";
import { promos } from "./data.js";
import { isPromoActive } from "./date-utils.js";
import { generateCard } from "./card-generator.js";
import { initYandexMetrika } from "./yandex-metrika.js";

//метрикa
initYandexMetrika();

async function initApp() {
  await hostReactAppReady();
  renderPromos();
}

function filterPromosByCategory(category = 'all') {
  return promos
    .filter(isPromoActive)
    .filter(promo => 
      category === 'all' || 
      (Array.isArray(promo.categories) 
        ? promo.categories.includes(category) 
        : promo.category === category
    ));
}

function renderPromos(category = 'all') {
  const container = document.getElementById("test");
  const template = document.getElementById("promo-card-template");
  
  if (!container || !template) return;

  container.innerHTML = '';
  
  const filteredPromos = filterPromosByCategory(category);
  
  if (filteredPromos.length === 0) {
    container.innerHTML = '<p class="no-promos">Нет активных акций</p>';
    return;
  }

  filteredPromos.forEach(promo => {
    container.appendChild(generateCard(promo, template));
  });
}

initApp();

window.addEventListener('filterPromos', (e) => {
  renderPromos(e.detail?.category);
});