import {hostReactAppReady} from "../../../common/js/usefuls.js";
import { promos } from "./data.js";

(async () => {
  await hostReactAppReady();

  let activeTooltip = null; 

  function createTooltipElement(promo) {
    const tooltip = document.createElement('div');
    tooltip.className = 'promo-card-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content-line">
        <span class="tooltip-company-name">${promo.advertiser}</span>
        <span class="tooltip-erid-text">erid:</span>
        <span class="tooltip-erid">${promo.erid}</span>
        <button class="tooltip-copy-button" title="Копировать ERID">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6667 1.33331H2.66667C2.29848 1.33331 2 1.6318 2 1.99998V11.3333C2 11.7015 2.29848 12 2.66667 12H10.6667C11.0348 12 11.3333 11.7015 11.3333 11.3333V1.99998C11.3333 1.6318 11.0348 1.33331 10.6667 1.33331Z" stroke="#2E3465" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 4.00002H12.6667V12.6667C12.6667 13.4031 12.0698 14 11.3333 14H4V12.6667H11.3333C11.5174 12.6667 11.6667 12.5175 11.6667 12.3334V4.00002H14Z" fill="#2E3465"/>
          </svg>
        </button>
      </div>
    `;
    
    const copyButton = tooltip.querySelector('.tooltip-copy-button');
    copyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigator.clipboard.writeText(promo.erid).then(() => {
        copyButton.title = 'Скопировано!';
        setTimeout(() => { copyButton.title = 'Копировать ERID'; }, 2000);
      }).catch(err => console.error('Не удалось скопировать ERID:', err));
    });

    return tooltip;
  }

  function showTooltip(targetLabel, promo) {
    if (activeTooltip) activeTooltip.remove();

    activeTooltip = createTooltipElement(promo);
    document.body.appendChild(activeTooltip);

    const labelRect = targetLabel.getBoundingClientRect();
    const tooltipRect = activeTooltip.getBoundingClientRect();
    const gap = 10;

    let top = labelRect.bottom + gap;
    let left = labelRect.right - tooltipRect.width;

    if (left < gap) left = gap;
    if (left + tooltipRect.width > window.innerWidth - gap) {
      left = window.innerWidth - tooltipRect.width - gap;
    }

    const labelCenterX = labelRect.left + labelRect.width / 2;
    const arrowPosition = labelCenterX - left;

    activeTooltip.style.top = `${top}px`;
    activeTooltip.style.left = `${left}px`;
    activeTooltip.style.setProperty('--arrow-left-position', `${arrowPosition}px`);
    
    requestAnimationFrame(() => activeTooltip.classList.add('visible'));
  }

  function hideTooltip() {
    if (activeTooltip) {
      activeTooltip.classList.remove('visible');
      activeTooltip.addEventListener('transitionend', () => {
        if (activeTooltip && !activeTooltip.classList.contains('visible')) {
           activeTooltip.remove();
           activeTooltip = null;
        }
      }, { once: true });
    }
  }

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
    const promoLinkButton = fragment.querySelector(".promo-card-button");
    if (promoLinkButton) {
      promoLinkButton.href = promo.url;
    }

    if (promo.erid && promo.showAdLabel && promo.advertiser) {
      const adLabelWrapper = fragment.querySelector('.promo-card-ad-label-wrapper');
      const adLabel = adLabelWrapper.querySelector('.promo-card-ad-label');
      
      adLabelWrapper.style.display = 'block';

      adLabel.addEventListener('mouseenter', () => {
        showTooltip(adLabel, promo);
      });
      
      adLabel.addEventListener('mouseleave', () => {
        hideTooltip();
      });
    }

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