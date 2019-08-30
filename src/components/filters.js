const getTemplateElements = (item) => {
  let filterStatus = ``;
  if (item.title === `ALL`) {
    filterStatus = `checked`;
  } else if (item.title === `OVERDUE` || item.title === `TODAY`) {
    filterStatus = `disabled`;
  }

  return `<input
	  type="radio"
	  id="filter__${item.title.toLowerCase()}"
	  class="filter__input visually-hidden"
	  name="filter"
	  ${filterStatus}/>
	  <label for="filter__${item.title.toLowerCase()}" class="filter__label">${item.title} <span class="filter__${item.title.toLowerCase()}-count">${item.count}</span></label>`;
};

export const createFiltersTemplate = (array) => {
  return `<section class="main__filter filter container">` + array.map(getTemplateElements).join(``) + `</section>`;
};
