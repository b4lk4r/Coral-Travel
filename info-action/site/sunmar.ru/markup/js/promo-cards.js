import {hostReactAppReady} from "../../../common/js/usefuls.js";
import { promos } from "./data.js";

(async () => {
  await hostReactAppReady();

  function parseDate(dateStr) {
    if (!dateStr) return null;
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  function getMonthName(date) {
    const formatter = new Intl.DateTimeFormat('ru-RU',  {
      day: 'numeric',
      month: 'long'
    });
    const parts = formatter.formatToParts(date);
    
    const monthPart = parts.find(part => part.type === 'month');
    return monthPart ? monthPart.value : '';
  }

  function isPromoActive(promo) {
    const now = new Date();
    const beginDate = parseDate(promo.promo_begin);
    
    if (promo.isUnlimited) {
      return promo.toggle && now >= beginDate;
    }
    
    const endDate = parseDate(promo.promo_end);
    return promo.toggle && now >= beginDate && now <= endDate;
  }

  function formatEndDate(promo) {
    if (promo.isUnlimited) {
      return 'Бессрочно';
    }
    
    const endDate = parseDate(promo.promo_end);
    if (!endDate) return '';

    const day = endDate.getDate();
    const month = getMonthName(endDate);
    const year = endDate.getFullYear();
    
    return `до ${day} ${month} ${year} г.`;
  }

  function generateCard(promo) {
    const template = document.querySelector("#promo-card-template");
    const fragment = template.content.cloneNode(true);

    const image = fragment.querySelector(".promo-card-image");
    image.src = promo.visual;
    image.alt = promo.name;

    fragment.querySelector(".promo-card-title").textContent = promo.name;
    fragment.querySelector(".promo-card-description").textContent = promo.description;
    fragment.querySelector(".promo-end-date").textContent = formatEndDate(promo);
    fragment.querySelector(".promo-card-button").href = promo.url;

    return fragment;
  }

  function renderPromos(category = 'all') {
    const place = document.querySelector("#test");
    place.innerHTML = '';

    let filteredPromos = promos.filter(isPromoActive);
    
    if (category !== 'all') {
      filteredPromos = filteredPromos.filter(promo => {
        if (Array.isArray(promo.categories)) {
          return promo.categories.includes(category);
        } else if (promo.category) {
          return promo.category === category;
        }
        return false;
      });
    }

    filteredPromos.sort((a, b) => {
      if (a.isUnlimited && !b.isUnlimited) return 1;
      if (!a.isUnlimited && b.isUnlimited) return -1;
      if (a.isUnlimited && b.isUnlimited) return 0;
      
      const dateA = parseDate(a.promo_end);
      const dateB = parseDate(b.promo_end);
      return dateA - dateB;
    });

    if (filteredPromos.length === 0) {
      place.innerHTML = '<p>Нет активных акций в этой категории</p>';
      return;
    }

    filteredPromos.forEach(promo => {
      place.appendChild(generateCard(promo));
    });
  }

  renderPromos();

  window.addEventListener('filterPromos', (e) => {
    renderPromos(e.detail.category);
  });

})();