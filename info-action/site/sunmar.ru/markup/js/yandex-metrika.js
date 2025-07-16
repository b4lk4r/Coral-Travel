const isYMOnPage = window.ym

export async function trackPromoClick(promo) {
if (!isYMOnPage) {
    console.warn('Метрики нет');
    return;
}
try {
    ym(promo.ym.id, "reachGoal", "entry_point", {
     name_stock: {
        [promo.ym.target_name]: {
         name_point: "promo_page",
        },
     },
    });
} catch (e) {
    console.error('Событие не отправлено', e);
}
}