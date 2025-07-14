import { trackPromoClick } from './yandex-metrika';
import { setupTooltipEvents } from './tooltip-manager';

export function generateCard(promo, template) {
  const fragment = template.content.cloneNode(true);
  const cardInner = fragment.querySelector('.promo-card-inner');

  if (Array.isArray(promo.categories)) {
    cardInner.dataset.categories = promo.categories.join(' ');
  } else if (promo.category) {
    cardInner.dataset.categories = promo.category;
  } else {
    cardInner.dataset.categories = 'all';
  }
  
  const image = fragment.querySelector(".promo-card-image");
  if (image) {
    image.src = promo.visual;
    image.alt = promo.name;
  }


  fragment.querySelector(".promo-card-title").textContent = promo.name;
  fragment.querySelector(".promo-card-description").textContent = promo.description;
  fragment.querySelector(".promo-end-date").textContent = promo.string_promo_end;

  const promoButton = fragment.querySelector(".promo-card-info-button");
  if (promoButton) {
    promoButton.href = promo.url;
    promoButton.addEventListener('click', (e) => {
      e.preventDefault();
      trackPromoClick(promo);
      window.open(promo.url, '_blank', 'noopener,noreferrer');
    });
  }

  if (promo.erid && promo.showAdLabel && promo.advertiser) {
    const adLabelWrapper = fragment.querySelector('.promo-card-ad-label-wrapper');
    if (adLabelWrapper) {
      adLabelWrapper.style.display = 'block';
      const adLabel = adLabelWrapper.querySelector('.promo-card-ad-label');
      if (adLabel) setupTooltipEvents(adLabel, promo);
    }
  }

  return fragment;
}