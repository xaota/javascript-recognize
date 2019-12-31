import Entity from './Entity.js';

/** {Intent} Модель намерения @class @model @export @default
  *
  */
  export default class Intent {
  /** {Intent} Создание намерения @constructor
    * @param {number} id идентификатор намерения
    * @param {string} name название намерения
    */
    constructor(id, name, ...entities) {
      this.id   = id;
      this.name = name;
      this.entities = [];
      this.add(...entities); // this.entities: array{string}
      this.checked = false;
      this.detail = null;
    }

  /** Пополнение списка намерений
    * @param {...string} values добавляемые намерения
    * @return {Intent} @this
    */
    add(...values = []) {
      this.entities = this.entities
        .concat(values.flat(Infinity))
        .filter(Entity.uniques)
        .map(Entity.from);

      return this;
    }

  /** */
    toJSON() {
      return {
        id:       this.id,
        name:     this.name,
        entities: this.entities,
        checked:  this.checked,
        detail:   this.detail
      }
    }

  /** */
    toString() {
      return '&(' + this.name + ')';
    }

  /** Является ли узел элементом {Intent} / is @static
    * @param {object} intent проверяемый элемент
    * @return {boolean} true, если является
    */
    static is(intent) {
      return intent instanceof Intent;
    }

  /** */
    static from(e) {
      if (Intent.is(e)) return e;
      const id = e.id || e.intent;
      const entities = e.entities || [];
      const intent = new Intent(id, e.name, ...entities);

      if (e.checked) intent.checked = e.checked;
      if (e.detail)  intent.detail  = e.detail;
      return intent;
    }

  /** */
    static uniques(intent, index, list = []) {
      return list
        .findIndex(temp => temp.id === intent.id) === index;
    }

  /** */
    static import(array = [], intents = []) { // !
      return array.map(e => intents.find(intent => intent.id === e));
    }

  /** */
    static export(list = []) {
      return list.map(e => e.id);
    }

  /** проверка вхождения намерения в список / in */
    static in(item, list = []) {
      return list.some(e => e.id === item.id);
    }
  }
