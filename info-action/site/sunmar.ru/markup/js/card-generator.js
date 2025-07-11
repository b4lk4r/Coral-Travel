import { setupTooltipEvents } from './tooltip-manager.js';

export function generateCard(promo, template) {
  const fragment = template.content.cloneNode(true);

  const image = fragment.querySelector(".promo-card-image");
  image.src = promo.visual;
  image.alt = promo.name;

  fragment.querySelector(".promo-card-title").textContent = promo.name;
  fragment.querySelector(".promo-card-description").textContent = promo.description;
  fragment.querySelector(".promo-end-date").textContent = promo.string_promo_end;
  
  const promoLinkButton = fragment.querySelector(".promo-card-button");
  if (promoLinkButton) {
    promoLinkButton.href = promo.url;
  }

  if (promo.erid && promo.showAdLabel && promo.advertiser) {
    const adLabelWrapper = fragment.querySelector('.promo-card-ad-label-wrapper');
    const adLabel = adLabelWrapper.querySelector('.promo-card-ad-label');
    
    adLabelWrapper.style.display = 'block';
    setupTooltipEvents(adLabel, promo);
  }

  return fragment;
}