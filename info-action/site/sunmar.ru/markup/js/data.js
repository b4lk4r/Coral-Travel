export const tag = {
  all: "all",
  recomendation: 'recomendation',
  hotels: "hotels",
  destination: "destinations",
  sunmar_bonus: "sunmarbonus",
  other: "other"
};

export const promos = [
  {
    toggle: true,
    erid: "F7k2C1xLp",
    showAdLabel: true,
    advertiser: "ООО «МирТурСервис»",
    name: "Горящие туры в Турцию",
    description: "Раннее бронирование — шанс купить пятёрку по цене четвёрки с предоплатой 20%",
    visual: "https://avatars.mds.yandex.net/i?id=68d28770f58b629e474c0cce5f4b4b7d_l-5248827-images-thumbs&n=13",
    url: "https://sunmar.ru/tours/turkey",
    promo_begin: "2025-07-01 00:00:00",
    string_promo_end: "до 31 июля 2025 г.",
    promo_end: "2025-07-31 23:59:59",
    categories: [tag.all],
    YM: ''  
  },
  {
    toggle: true,
    erid: "F7k2C1xLp",
    showAdLabel: true,
    advertiser: "ООО «МирТурСервис»",
    name: "Отдых в Сочи",
    description: "Раннее бронирование — шанс купить пятёрку по цене четвёрки с предоплатой 20%",
    visual: "https://avatars.mds.yandex.net/i?id=68d28770f58b629e474c0cce5f4b4b7d_l-5248827-images-thumbs&n=13",
    url: "https://sunmar.ru/tours/sochi",
    promo_begin: "2025-07-10 00:00:00",
    string_promo_end: "до 8 августа 2025 г.",
    promo_end: "2025-08-15 23:59:59",
    categories: [tag.all, tag.sunmar_bonus]
  },
  {
    toggle: true,
    erid: "F7k2C1xLp",
    showAdLabel: true,
    advertiser: "ООО «МирТурСервис»",
    name: "Раннее бронирование 2026",
    description: "Раннее бронирование — шанс купить пятёрку по цене четвёрки с предоплатой 20% Раннее бронирование — шанс купить пятёрку по цене четвёрки с предоплатой 20%",
    visual: "https://avatars.mds.yandex.net/i?id=68d28770f58b629e474c0cce5f4b4b7d_l-5248827-images-thumbs&n=13",
    url: "https://sunmar.ru/early-booking",
    promo_begin: "2025-07-01 00:00:00",
    string_promo_end: "до 30 июля 2025 г.",
    promo_end: "2025-07-30 23:59:59",
    categories: [tag.all]
  },
  {
    toggle: true,
    erid: "F7k2C1xLp",
    showAdLabel: false,
    advertiser: "ООО «МирТурСервис»",
    name: "Бонусы Sunmar",
    description: "Получите двойные бонусы при бронировании",
    visual: "https://avatars.mds.yandex.net/i?id=68d28770f58b629e474c0cce5f4b4b7d_l-5248827-images-thumbs&n=13",
    url: "https://sunmar.ru/bonus",
    promo_begin: "2025-07-15 00:00:00",
    promo_end: "2025-08-15 23:59:59",
    string_promo_end: "до 15 августа 2025 г.",
    categories: [tag.all]
  },
  {
    toggle: true,
    erid: "F7k2C1xLp",
    showAdLabel: false,
    advertiser: "ООО «МирТурСервис»",
    name: "Специальное предложение",
    description: "Эксклюзивные условия для наших клиентов",
    visual: "https://avatars.mds.yandex.net/i?id=68d28770f58b629e474c0cce5f4b4b7d_l-5248827-images-thumbs&n=13",
    url: "https://sunmar.ru/special",
    isUnlimited: true,
    promo_begin: "2025-07-01 00:00:00",
    string_promo_end: "Бессрочно",
    promo_end: null,
    categories: [tag.all]
  }
];
