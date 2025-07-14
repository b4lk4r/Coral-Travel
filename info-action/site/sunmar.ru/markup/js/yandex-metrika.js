export function initYandexMetrika() {
  if (!window.ym) {
    window.ym = window.ym || function(){(window.ym.a=window.ym.a||[]).push(arguments)};
    window.ym.l = +new Date;
  }
}

export function trackPromoClick(promo) {
  if (!promo?.ym?.id || !promo?.ym?.target_name) {
    console.warn('Missing Yandex Metrika data:', promo);
    return;
  }

  // Инициализация счетчика, если еще не инициализирован
  if (!window.ym) initYandexMetrika();

  if (window.ym) {
    try {
      window.ym(
        promo.ym.id,
        'reachGoal',
        'entry_point',
        {
          name_stock: {
            [promo.ym.target_name]: {
              name_point: "promo_page",
              promo_name: promo.name,
              promo_url: promo.url
            }
          }
        }
      );
      console.debug('Yandex Metrika event sent:', promo.ym.target_name);
    } catch (e) {
      console.error('Yandex Metrika error:', e);
    }
  }
}