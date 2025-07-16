let isYMLoaded = false;

export function initYandexMetrika() {
  if (!window.ym) {
    window.ym = function(){(window.ym.a = window.ym.a || []).push(arguments)};
    window.ym.l = +new Date;
    
    const script = document.createElement('script');
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.onload = () => { isYMLoaded = true; };
    document.head.appendChild(script);
  }
}

export function trackPromoClick(promo) {
  if (!promo?.ym?.id || !promo?.ym?.target_name) {
    console.error('Missing YM data in promo:', promo);
    return false;
  }

  try {
    if (window.ym && isYMLoaded) {
      window.ym(
        promo.ym.id,
        'reachGoal',
        'promo_click',
        {
          name: promo.name,
          url: promo.url,
          target: promo.ym.target_name
        }
      );
      return true;
    }
    
    window.ym = window.ym || function(){(window.ym.a = window.ym.a || []).push(arguments)};
    window.ym(promo.ym.id, 'reachGoal', 'promo_click', {
      name: promo.name,
      url: promo.url,
      target: promo.ym.target_name
    });
    console.log('YM initialized with:', {
      isLoaded: isYMLoaded,
      ymFunction: typeof window.ym,
      queue: window.ym?.a || []
    });
    return true;
  } catch (e) {
    console.error('YM tracking error:', e);
    return false;
  }

  
}