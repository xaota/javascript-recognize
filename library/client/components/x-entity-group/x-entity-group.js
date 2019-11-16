import Component from '/material/script/Component.js';

import MaterialFigure  from '/material/components/figure/material-figure.js';

// также на этой странице использованы
import MaterialCaption from '/material/components/caption/material-caption.js';
import MaterialText    from '/material/components/text/material-text.js';

import XEntity from '../x-entity/x-entity.js';

const component = Component.meta(import.meta.url, 'x-entity-group');
/**
  *
  */
  export default class XEntityGroup extends Component {
  /**
    *
    */
    constructor(name, entities) {
      super(component);
      this.store({name, entities});
    }

  /** */
    mount(node) {
      const {name = '', entities = []} = this.store();
      const figure = node.querySelector('material-figure');
      const chaption = new MaterialCaption(name);
      chaption.small = true;
      chaption.slot = 'description'; //.setAttribute('slot')
      figure.prepend(chaption);

      const root = figure.querySelector('material-text');
      entities.forEach(entity => {
        const xEntity = new XEntity(entity);
        root.appendChild(xEntity);
      });

      return this;
    }
  }

Component.define(component, XEntityGroup);

// #region [Private]

// #endregion
