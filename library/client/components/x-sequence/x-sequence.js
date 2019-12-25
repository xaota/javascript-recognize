import Component           from '/material/script/Component.js';
import MaterialChipTooltip from '/material/components/chip-tooltip/material-chip-tooltip.js';

import Entity from '../../../model/Entity.js';

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
      const {sequence, positive = []} = this.store();

      this.innerHTML = '';
      sequence.forEach(token => {
        const tag = token.entity
          ? createChipNode(token, positive)
          : createSpanNode(token);
        this.appendChild(tag);
      });

      return this;
    }
  }

Component.define(component, XSequence);

// #region [Private]
/** / createChipNode */
  function createChipNode(token, positive = []) {
    const tag = new MaterialChipTooltip(token.match, '@' + token.entity.name); // Entity.from(token.entity).toString()
    if (!Entity.in(token.entity, positive)) tag.outline = true;
    return tag;
  }

/** / createSpanNode */
  function createSpanNode({match}) {
    const tag = document.createElement('span');
    tag.innerText = match;
    return tag;
  }
// #endregion
