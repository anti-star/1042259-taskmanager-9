const getDate = (time) => {
  const NAMES_MONTH = [
    `JANUARY`,
    `FEBRUARY`,
    `MARCH`,
    `APRIL`,
    `MAY`,
    `JUNE`,
    `JULY`,
    `AUGUST`,
    `SEPTEMBER`,
    `OCTOBER`,
    `NOVEMBER`,
    `DECEMBER`];
  return (new Date(time).getDate() + ` ` + NAMES_MONTH[new Date(time).getMonth()]);
};

const getTime = (time) => {
  let hours = new Date(time).getHours();
  let minutes = new Date(time).getMinutes();
  let dd = `AM`;
  if ((hours > 12) || (hours === 0)) {
    hours = hours - 12;
    dd = `PM`;
  }
  minutes = minutes < 10 ? `0` + minutes : minutes;
  return (hours + `:` + minutes + ` ` + dd);
};

export const makeTask = ({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) => {
  return `<article class="card card--${color}
  ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}
  ${isFavorite ? `card--favorite` : ``}
  ${isArchive ? `card--archive` : ``}
  ${dueDate === Date.now() ? `card--deadline` : ``}">
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
	                          <span class="card__date">${getDate(dueDate)}</span>
	                          <span class="card__time">${getTime(dueDate)}</span>
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
