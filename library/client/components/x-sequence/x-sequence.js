import Component           from '/material/script/Component.js';
import MaterialChipTooltip from '/material/components/chip-tooltip/material-chip-tooltip.js';
import MaterialSwitch      from '/material/components/switch/material-switch.js';

import Entity from '../../../model/Entity.js';

const component = Component.meta(import.meta.url, 'x-sequence');
/**
  *
  */
  export default class XSequence extends Component {
  /**
    *
    */
    constructor(sequence = [], origin = '') {
      super(component);
      this.store({sequence, origin});
    }

  /** */
    mount(node) {
      const switcher = node.querySelector('material-switch');

      switcher.addEventListener('change', e => {
        const {sequence = [], origin = '', positive = []} = this.store();
        switcher.checked
          ? showSequence(this, sequence, positive)
          : showOriginText(this, origin);
      });

      return this;
    }

  /** */
    init() {
      // const node = this.shadowRoot;
      const {sequence, origin, positive = []} = this.store();
      showSequence(this, sequence, positive);
    }
  }

Component.define(component, XSequence);

// #region [Private]
/** показывает результаты разбора (список токенов) / showSequence */
  function showSequence(node, sequence, positive) {
    node.innerHTML = '';
    sequence.forEach(token => {
      const tag = token.entity
        ? createChipNode(token, positive)
        : createSpanNode(token);
      node.appendChild(tag);
    });
  }

/** показывает оригинальное сообщение / showOriginText */
  function showOriginText(node, text) {
    node.innerHTML = text;
  }

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
