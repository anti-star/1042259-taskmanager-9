import {formatDate} from "./data.js";

export const createTaskEditTemplate = (task) => {
  let repeatDay = task.repeatingDays;
  let repeatDayObj = Object.keys(repeatDay);
  return `<article class="card card--edit card--${task.color} ${repeatDayObj.some((day) => repeatDay[day]) ? `card--repeat` : ``}
  ${task.isFavorite ? `card--favorite` : ``}
  ${task.isArchive ? `card--archive` : ``}
  ${formatDate(task.dueDate, `DAY MONTH`) === formatDate(Date.now(), `DAY MONTH`) ? `card--deadline` : ``}">
		            	<form class="card__form" method="get">
		              	<div class="card__inner">
		                	<div class="card__control">
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
		                  <label>
		                    <textarea
		                      class="card__text"
		                      placeholder="Start typing your text here..."
		                      name="text"
		                    >${task.description}</textarea>
		                  </label>
		                </div>

		                <div class="card__settings">
		                  <div class="card__details">
		                    <div class="card__dates">
		                      <button class="card__date-deadline-toggle" type="button">
								date: <span class="card__date-status">${task.dueDate ? `yes` : `no`}</span>
		                      </button>

		                      <fieldset class="card__date-deadline" ${task.dueDate ? `` : `disabled`}>
		                        <label class="card__input-deadline-wrap">
		                          <input
		                            class="card__date"
		                            type="text"
		                            placeholder=""
									name="date"
									value="${formatDate(task.dueDate, `DAY MONTH HOUR:MINUTE DD`)}"
		                          />
		                        </label>
		                      </fieldset>

		                      <button class="card__repeat-toggle" type="button">
								repeat:<span class="card__repeat-status">
								${Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]) ? `yes` : `no`}</span>
		                      </button>

							  <fieldset class="card__repeat-days" ${Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]) ? `` : `disabled`}>
								<div class="card__repeat-days-inner">
								${[`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`].map((day) => `<input
								class="visually-hidden card__repeat-day-input"
								type="checkbox"
								id="repeat-${day}-1"
								name="repeat"
								value="${day}"
								${task.repeatingDays[day] ? `checked` : ``}
							  />
							  <label class="card__repeat-day" for="repeat-${day}-1"
								>${day}</label>`).join(``)}
								
		                        </div>
		                      </fieldset>
		                    </div>

		                    <div class="card__hashtag">
							  <div class="card__hashtag-list">
							  ${Array.from(task.tags).map((tag) => `<span class="card__hashtag-inner">
							  <input
								type="hidden"
								name="hashtag"
								value="repeat"
								class="card__hashtag-hidden-input"
							  />
							  <p class="card__hashtag-name">
							  #${tag}
							  </p>
							  <button type="button" class="card__hashtag-delete">
								delete
							  </button>
							</span>`).join(``)}
							  </div>

		                      <label>
		                        <input
		                          type="text"
		                          class="card__hashtag-input"
		                          name="hashtag-input"
		                          placeholder="Type new hashtag here"
		                        />
		                      </label>
		                    </div>
		                  </div>

		                  <div class="card__colors-inner">
		                    <h3 class="card__colors-title">Color</h3>
							<div class="card__colors-wrap">
							${[`black`, `yellow`, `blue`, `green`, `pink`].map((color) => `<input
								  type="radio"
		                          id="color-${color}-1"
		                          class="card__color-input card__color-input--${color} visually-hidden"
		                          name="color"
								  value="${color}"
								  ${color === task.color ? `checked` : ``}
		                        />
		                      <label
		                        for="color-${color}-1"
		                        class="card__color card__color--${color}"
		                        >${color}</label>`).join(``)}
		                    </div>
		                  </div>
		                </div>

		                <div class="card__status-btns">
		                  <button class="card__save" type="submit">save</button>
		                  <button class="card__delete" type="button">delete</button>
		                </div>
		              </div>
		            </form>
				  </article>`;
};
