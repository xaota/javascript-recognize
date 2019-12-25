/** {Entity} Модель сущности @class @model @export @default
  *
  */
  export default class Entity {
  /** {Entity} Создание сущности @constructor
    * @param {number} id идентификатор сущности
    * @param {string} name название сущности
    */
    constructor(id, name, ...patterns) {
      this.id   = id;
      this.name = name;
      this.patterns = [];
      this.add(...patterns); // this.patterns: array{string}
    }

  /** Пополнение списка паттернов
    * @param {...string} values добавляемые паттерны
    * @return {Intent} @this
    */
    add(...values) {
      this.patterns = Array.from(new Set(this.patterns.concat(values.flat(Infinity))));
      return this;
    }

  /** */
    toJSON() {
      return {
        id:       this.id,
        name:     this.name,
        patterns: this.patterns
      }
    }

  /** */
    toString() {
      return '@' + this.name;
    }

  /** Является ли узел элементом {Entity} / is @static
    * @param {object} entity проверяемый элемент
    * @return {boolean} true, если является
    */
    static is(entity) {
      return entity instanceof Entity;
    }

  /** */
    static from(e) {
      return Entity.is(e)
        ? e
        : new Entity(e.id, e.name, ...e.patterns);
    }

  /** */
    static uniques(entity, index, list) {
      return list
        .findIndex(temp => temp.id === entity.id) === index;
    }

  /** */
    static import(array, entities) {
      return array.map(e => entities.find(entity => entity.id === e));
    }

  /** */
    static export(list) {
      return list.map(e => e.id);
    }

  /** создание списка сущностей, входящих в список намерений / listFromIntents */
    static listFromIntents(intents = []) {
      return intents.map(e => e.entities).flat().filter(Entity.uniques);
    }

  /** проверка вхождения сущности в список / in */
    static in(item, list) {
      return list.some(e => e.id === item.id);
    }
  }
