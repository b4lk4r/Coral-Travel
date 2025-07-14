export function parseDate(dateStr) {
  if (!dateStr) return null;
  
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
    beginDate.setHours(18, 10, 0, 0);
    console.error('Некорректная или пустая дата начала акции (установлена текущая дата 18:00):', promo);


  }
  
  const endDate = parseDate(promo.promo_end);
  if (!endDate && !promo.isUnlimited) {
     console.error('Некорректная или пустая дата окончания акции:', promo);

  }

  if (promo.isUnlimited) {
    return promo.toggle && now >= beginDate;
  }
  
  if (!endDate) {
    return false;
  }
  
  return promo.toggle && now >= beginDate && now <= endDate;
}