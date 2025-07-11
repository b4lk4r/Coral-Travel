import { hostReactAppReady } from "../../../common/js/usefuls.js";
import { promos } from "./data.js";
import { isPromoActive } from "./date-utils.js";
import { generateCard } from "./card-generator.js";

export async function initPromoCards() {
  await hostReactAppReady();

  function filterPromosByCategory(promosList, category = 'all') {
    if (category === 'all') return promosList;
    
    return promosList.filter(promo => {
      if (Array.isArray(promo.categories)) {
        return promo.categories.includes(category);
      } else if (promo.category) {
        return promo.category === category;
      }
      return false;
    });
  }

  function renderPromos(category = 'all') {
    const place = document.querySelector("#test");
    const template = document.querySelector("#promo-card-template");
    place.innerHTML = '';

    const activePromos = promos.filter(isPromoActive);
    const filteredPromos = filterPromosByCategory(activePromos, category);

    if (filteredPromos.length === 0) {
      place.innerHTML = '<p>Нет активных акций в этой категории</p>';
      return;
    }

    filteredPromos.forEach(promo => {
      place.appendChild(generateCard(promo, template));
    });
  }

  renderPromos();

  window.addEventListener('filterPromos', (e) => {
    renderPromos(e.detail.category);
  });
}

initPromoCards();