import Component           from '/material/script/Component.js';
import MaterialChipTooltip from '/material/components/chip-tooltip/material-chip-tooltip.js';

// import Entity from '/model/entity.js';

const component = Component.meta(import.meta.url, 'x-sequence');
/**
  *
  */
  export default class XSequence extends Component {
  /**
    *
    */
    constructor(sequence = []) {
      super(component);
      this.store({sequence});
    }

  /** */
    mount(node) {
      const {sequence} = this.store();

      this.innerHTML = '';
      sequence.forEach(token => {
        const tag = token.entity
          ? new MaterialChipTooltip(token.match, '@' + token.entity.name) // Entity.from(token.entity).toString()
          : document.createElement('span');
        if (!token.entity) tag.innerText = token.match;
        this.appendChild(tag);
      });

      return this;
    }
  }

Component.define(component, XSequence);

// #region [Private]

// #endregion
