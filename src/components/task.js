import {formatDate} from "../data";
import {isToday} from "../data";
import {isRepeating} from "../data";
import {createElement} from "../utils";

export default class Task {
  constructor({description, dueDate, tags, color, repeatingDays}) {
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._element = null;
    this._repeatingDays = repeatingDays;
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

  getTemplate() {
    return `<article class="card card--${this._color}
    ${isRepeating(this._repeatingDays) ? `card--repeat` : ``}
    ${isToday(this._dueDate) ? `card--deadline` : ``}">
	            <div class="card__form">
	              <div class="card__inner">
	                <div class="card__control">
	                  <button type="button" class="card__btn card__btn--edit">
	                    edit
	                  </button>
	                  <button type="button" class="card__btn card__btn--archive">
	                    archive
	                  </button>
	                  <button
	                    type="button"
	                    class="card__btn card__btn--favorites card__btn--disabled"
	                  >
	                    favorites
	                  </button>
	                </div>

	                <div class="card__color-bar">
	                  <svg class="card__color-bar-wave" width="100%" height="10">
	                    <use xlink:href="#wave"></use>
	                  </svg>
	                </div>

	                <div class="card__textarea-wrap">
	                  <p class="card__text">${this._description}</p>
	                </div>
					<div class="card__hashtag">
					<div class="card__hashtag-list">
	                <div class="card__settings">
	                  <div class="card__details">
	                    <div class="card__dates">
	                      <div class="card__date-deadline">
	                        <p class="card__input-deadline-wrap">
	                          <span class="card__date">${formatDate(this._dueDate, `DAY MONTH`)}</span>
	                          <span class="card__time">${formatDate(this._dueDate, `HOUR:MINUTE DD`)}</span>
	                        </p>
	                      </div>
	                    </div>

	                    <div class="card__hashtag">
						  <div class="card__hashtag-list">
						  ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
	                          <span class="card__hashtag-name">
                                #${tag}
                              </span>
                            </span>`).join(``)}
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
			  </article>`;
  }
}
