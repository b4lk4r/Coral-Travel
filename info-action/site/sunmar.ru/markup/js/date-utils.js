export function parseDate(dateStr) {
  if (!dateStr) return null;
  const [datePart, timePart] = dateStr.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export function isPromoActive(promo) {
  const now = new Date();
  const beginDate = parseDate(promo.promo_begin);
  
  if (promo.isUnlimited) {
    return promo.toggle && now >= beginDate;
  }
  
  const endDate = parseDate(promo.promo_end);
  return promo.toggle && now >= beginDate && now <= endDate;
}