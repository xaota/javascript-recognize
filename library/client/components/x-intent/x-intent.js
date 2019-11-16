import Component from '/material/script/Component.js';

import MaterialCaption  from '/material/components/caption/material-caption.js';
import MaterialTooltip  from '/material/components/tooltip/material-tooltip.js';
import MaterialCheckbox from '/material/components/checkbox/material-checkbox.js';
import MaterialText     from '/material/components/text/material-text.js';

import XEntity from '../x-entity/x-entity.js';

const component = Component.meta(import.meta.url, 'x-intent');
/**
  *
  */
  export default class XIntent extends Component {
  /**
    *
    */
    constructor(intent, options = {}) {
      super(component);
      this.store({intent, options});
      this.innerText = intent.name;
    }

  /** */
    mount(node) {
      const {intent} = this.store();
      const root     = node.querySelector('material-text');
      const checkbox = node.querySelector('material-checkbox');

      checkbox.checked = intent.checked === true;
      checkbox.addEventListener('change', () => {
        const status = checkbox.checked;
        this.event('change-status', {status});
        this.event(status ? 'enable' : 'disable');
      });

      intent.entities.forEach(entity => {
        const item = new XEntity(entity);
        root.appendChild(item);
      });

      const detail = node.querySelector('#detail');
      detail.innerText = intent.detail;

      return this;
    }

  /** */
    get intent() {
      return this.store().intent;
    }
  }

Component.define(component, XIntent);

// #region [Private]

// #endregion
