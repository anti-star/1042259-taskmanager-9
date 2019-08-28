import {formatDate} from "./data.js";

export const createTaskTemplate = ({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) => {
  let repeatDay = repeatingDays;
  let repeatDayObj = Object.keys(repeatDay);
  return `<article class="card card--${color}
  ${repeatDayObj.some((day) => repeatDay[day]) ? `card--repeat` : ``}
  ${isFavorite ? `card--favorite` : ``}
  ${isArchive ? `card--archive` : ``}
  ${formatDate(dueDate, `DAY MONTH`) === formatDate(Date.now(), `DAY MONTH`) ? `card--deadline` : ``}">
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
	                  <p class="card__text">${description}</p>
	                </div>
					<div class="card__hashtag">
					<div class="card__hashtag-list">
	                <div class="card__settings">
	                  <div class="card__details">
	                    <div class="card__dates">
	                      <div class="card__date-deadline">
	                        <p class="card__input-deadline-wrap">
	                          <span class="card__date">${formatDate(dueDate, `DAY MONTH`)}</span>
	                          <span class="card__time">${formatDate(dueDate, `HOUR:MINUTE DD`)}</span>
	                        </p>
	                      </div>
	                    </div>

	                    <div class="card__hashtag">
						  <div class="card__hashtag-list">
						  ${Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
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
			  </article>`.trim();
};
