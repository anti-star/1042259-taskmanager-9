import {getfilterStatus} from "../data";
import {createElement} from "../utils";

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _getTemplateItem(filter) {
    return `<input
    type="radio"
    id="filter__${filter.title}"
    class="filter__input visually-hidden"
    name="filter"
    ${getfilterStatus(filter.title, filter.count)}
  />
  <label for="filter__${filter.title}" class="filter__label">
    ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span></label>`;
  }

  getTemplate() {
    return `<section class="main__filter filter container">${this._filters.map((filter) => this._getTemplateItem(filter)).join(``)}</section>`;
  }
}
