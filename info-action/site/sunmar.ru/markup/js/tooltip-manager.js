import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

/*
 * @param {HTMLElement} element - Элемент-триггер, на который вешается тултип.
 * @param {object} promo - Объект с данными акции.
 */
export function setupTooltipEvents(element, promo) {
  tippy(element, {
    allowHTML: true,
    interactive: true,
    placement: 'bottom-end',
    theme: 'promo-theme',
    
    onShow(instance) {
      const content = document.createElement('div');
      content.innerHTML = `
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
      
      const copyButton = content.querySelector('.tooltip-copy-button');
      copyButton.addEventListener('click', () => {
         navigator.clipboard.writeText(promo.erid);
         instance.setContent('Скопировано!');
         setTimeout(() => {
            instance.hide();
         }, 1500);
      });

      instance.setContent(content);
    }
  });
}