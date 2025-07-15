export function parseDate(dateStr) {
  if (dateStr === null || dateStr === undefined || dateStr == "") {
    return null;
  } 
  
  try {
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
      return null;
    }

    if ((month) > 12 || (day) > 31 || (hours) > 23 || (minutes) > 59) {
      return null;
    }
    
    return new Date(year, month - 1, day, hours, minutes);
  } catch (e) {
    return null;
  }
}

export function isPromoActive(promo) {
  const now = new Date();
  
  let beginDate = parseDate(promo.promo_begin);
  if (!beginDate) {
    beginDate = new Date();
    beginDate.setHours(18, 0, 0, 0);
    console.error('Некорректная или пустая дата начала акции (установлена текущая дата 18:00). Необходим формат "ДД-ММ-ГГГГ ЧЧ:ММ" или null.', promo);
  }
  
  const endDate = parseDate(promo.promo_end);

  if (promo.promo_end != null && promo.promo_end != undefined && promo.promo_end != ""){
    if (!endDate) {
      console.error('Некорректная дата окончания акции. Необходим формат "ДД-ММ-ГГГГ ЧЧ:ММ" или null.', promo);
    }
  } else if (promo.promo_end == null || promo.promo_end == undefined || promo.promo_end == "") {
    return promo.toggle && now >= beginDate;
  }
  
  return promo.toggle && now >= beginDate && now <= endDate;
}
