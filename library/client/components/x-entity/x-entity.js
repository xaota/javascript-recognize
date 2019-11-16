import Component           from '/material/script/Component.js';
import MaterialChipTooltip from '/material/components/chip-tooltip/material-chip-tooltip.js';

const component = Component.meta(import.meta.url, 'x-entity');
/**
  *
  */
  export default class XEntity extends Component {
  /**
    *
    */
    constructor(entity, options = undefined) {
      super(component);
      this.store({entity, options});
    }

  /** */
    mount(node) {
      const {entity, options = {}} = this.store();
      const chip = node.querySelector('material-chip-tooltip');

      const at = options.at !== false ? '@' : '';
      this.innerText = at + entity.name;

      chip.content = entity.patterns.join(',\n');
      if (options.action) {
        chip.action = options.action;
        chip.addEventListener('action', _ => this.event(options.action, entity));
      }

      return this;
    }

  /** */
    get entity() {
      return this.store().entity;
    }
  }

Component.define(component, XEntity);

// #region [Private]

// #endregion
