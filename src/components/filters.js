const getTemplateElements = (array) => {
  let templateElement = ` `;
  for (let i = 0; i < array.length; i++) {
    let filterStatus = ``;
    if (array[i].title === `ALL`) {
      filterStatus = `checked`;
    } else if (array[i].title === `OVERDUE` || array[i].title === `TODAY`) {
      filterStatus = `disabled`;
    }

    templateElement = templateElement + (`<input
	  type="radio"
	  id="filter__${array[i].title.toLowerCase()}"
	  class="filter__input visually-hidden"
	  name="filter"
	  ${filterStatus}/>
	  <label for="filter__${array[i].title.toLowerCase()}" class="filter__label">${array[i].title} <span class="filter__${array[i].title.toLowerCase()}-count">${array[i].count}</span></label>`);
  }
  return templateElement;
};

export const createFiltersTemplate = (array) => {
  return (`<section class="main__filter filter container">` + getTemplateElements(array) + `</section>`);
};
