export function initYandexMetrika() {
  if (!window.ym) {
    window.ym = window.ym || function(){(window.ym.a=window.ym.a||[]).push(arguments)};
    window.ym.l = +new Date;
    window.ym(YM_COUNTER_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true
    });
  }
}

export function trackPromoClick(promo) {
  if (window.ym) {
    window.ym(YM_COUNTER_ID, 'reachGoal', 'promoClick', {
      promoId: promo.id,
      promoName: promo.name,
      promoUrl: promo.url,
      promoCategory: promo.category || 'general'
    });
  }
  console.debug('Promo click tracked:', promo.name);
}