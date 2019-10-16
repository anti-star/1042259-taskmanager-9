import {getfilterStatus} from "../data";
import AbstractComponent from "./absctract-component";

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplateItem(filter) {
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
    return `<section class="main__filter filter container">${this._filters.map((filter) => this.getTemplateItem(filter)).join(``)}</section>`;
  }
}
