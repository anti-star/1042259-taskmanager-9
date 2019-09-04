import {createElement} from "../utils.js";
import {filterMocks} from "../main.js";
import {getfilterStatus} from "../data.js";

export default class Filters {
  constructor() {
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

  getTemplateItem({title, count}) {
    return `<input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${getfilterStatus({title, count})}
  />
  <label for="filter__${title}" class="filter__label">
    ${title} <span class="filter__${title}-count">${count}</span></label>`;
  }

  getTemplate() {
    return `<section class="main__filter filter container">${filterMocks.map((filter) => this.getTemplateItem(filter)).join(``)}</section>`;
  }
}
