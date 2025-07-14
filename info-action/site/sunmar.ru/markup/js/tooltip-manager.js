let activeTooltip = null;
let hideTooltipTimer = null;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function hideTooltip() {
  if (activeTooltip) {
    activeTooltip.classList.remove('visible');
    activeTooltip.addEventListener('transitionend', () => {
      if (activeTooltip && !activeTooltip.classList.contains('visible')) {
        activeTooltip.remove();
        activeTooltip = null;
      }
    }, { once: true });
  }
  document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
  if (activeTooltip && !activeTooltip.contains(event.target) && !event.target.closest('.promo-card-ad-label')) {
    hideTooltip();
  }
}

export function createTooltipElement(promo) {
  const tooltip = document.createElement('div');
  tooltip.className = 'promo-card-tooltip';
  tooltip.dataset.erid = promo.erid;
  tooltip.innerHTML = `
    <div class="tooltip-content-line">
      <span class="tooltip-company-name">${promo.advertiser}</span>
      <span class="tooltip-erid-text">erid:</span>
      <span class="tooltip-erid">${promo.erid}</span>
      <button class="tooltip-copy-button" title="Копировать ERID">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6667 1.33331H2.66667C2.29848 1.33331 2 1.6318 2 1.99998V11.3333C2 11.7015 2.29848 12 2.66667 12H10.6667C11.0348 12 11.3333 11.7015 11.3333 11.3333V1.99998C11.3333 1.6318 11.0348 1.33331 10.6667 1.33331Z" stroke="#2E3465" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 4.00002H12.6667V12.6667C12.6667 13.4031 12.0698 14 11.3333 14H4V12.6667H11.3333C11.5174 12.6667 11.6667 12.5175 11.6667 12.3334V4.00002H14Z" fill="#2E3465"/>
        </svg>
      </button>
    </div>
  `;
  
  const copyButton = tooltip.querySelector('.tooltip-copy-button');
  copyButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(promo.erid).then(() => {
      copyButton.title = 'Скопировано!';
      setTimeout(() => { copyButton.title = 'Копировать ERID'; }, 2000);
    });
  });

  if (!isTouchDevice) {
    tooltip.addEventListener('mouseenter', () => clearTimeout(hideTooltipTimer));
    tooltip.addEventListener('mouseleave', () => {
      hideTooltipTimer = setTimeout(hideTooltip, 200);
    });
  }
  
  return tooltip;
}

export function showTooltip(targetLabel, promo) {
  clearTimeout(hideTooltipTimer);
  if (activeTooltip) hideTooltip();

  activeTooltip = createTooltipElement(promo);
  document.body.appendChild(activeTooltip);

  const labelRect = targetLabel.getBoundingClientRect();
  const tooltipRect = activeTooltip.getBoundingClientRect();
  const gap = 10;
  let top = labelRect.bottom + gap;
  let left = labelRect.right - tooltipRect.width;

  if (left < gap) left = gap;
  if (left + tooltipRect.width > window.innerWidth - gap) {
    left = window.innerWidth - tooltipRect.width - gap;
  }
  
  const labelCenterX = labelRect.left + labelRect.width / 2;
  const arrowPosition = labelCenterX - left;
  activeTooltip.style.top = `${top}px`;
  activeTooltip.style.left = `${left}px`;
  activeTooltip.style.setProperty('--arrow-left-position', `${arrowPosition}px`);
  
  requestAnimationFrame(() => activeTooltip.classList.add('visible'));

  if (isTouchDevice) {
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
  }
}

export function setupTooltipEvents(element, promo) {
  element.addEventListener('mouseenter', () => {
    clearTimeout(hideTooltipTimer);
    showTooltip(element, promo);
  });
  
  element.addEventListener('mouseleave', () => {
    hideTooltipTimer = setTimeout(hideTooltip, 200);
  });
}