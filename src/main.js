import { getMenuMarkup } from "./components/menu.js";
import { getSearchMarkup } from "./components/search.js";
import { makeFilters } from "./components/filters.js";
import { getTaskBoardMarkup } from "./components/task-board.js";
import { makeTaskEdit } from "./components/task-edit.js";
import { makeTask } from "./components/task.js";
import { getLoadMoreMarkup } from "./components/button-load-more.js";
import { getTaskRandom } from "./components/data.js"
import { filters } from "./components/data.js";

const renderComponent = (componentContainer, markup, place = `beforeend`) => {
  componentContainer.insertAdjacentHTML(place, markup);
};

const menuContainer = document.querySelector(`.main__control.control.container`);
renderComponent(menuContainer, getMenuMarkup());

const TASK_COUNT = 13;
const TASKS = new Array(TASK_COUNT)
.fill(``)
.map(getTaskRandom);

const PAGE_SIZE = 8;
const PAGE_COUNT = Math.ceil(TASK_COUNT / PAGE_SIZE);

const FILTERS = filters(TASKS);

const mainContainer = document.querySelector(`.main`);
renderComponent(mainContainer, getSearchMarkup());
renderComponent(mainContainer, makeFilters(FILTERS));
renderComponent(mainContainer, getTaskBoardMarkup());

const taskContainer = document.querySelector(`.board__tasks`);
renderComponent(taskContainer, makeTaskEdit(TASKS[0]));
renderComponent(taskContainer, TASKS.slice(1,8).map(makeTask).join(``));

let currentPage = 1;

const boardContainer = document.querySelector(`.board.container`);
const showButton = () => {
  let button = document.querySelector(`.load-more`);
  if (!button) {
    renderComponent(boardContainer, getLoadMoreMarkup());
    button = document.querySelector(`.load-more`);
    button.addEventListener('click', renderTasksPage);
  }
};

const hideButton = () => {
  const button = document.querySelector(`.load-more`);
  if (button) {
    button.remove();
  }
}

const getTasks = (page) => {
  const firstIndex = page * PAGE_SIZE;
  const lastIndex = firstIndex + PAGE_SIZE;
  return TASKS.slice(firstIndex, lastIndex);
};

const renderTasksPage = () => {
  const pageTasks = getTasks(currentPage);
  taskContainer.insertAdjacentHTML(`beforeend`, pageTasks.map(makeTask).join(``));
  if (currentPage < PAGE_COUNT - 1) {
    showButton();
  } else {
    hideButton();
  };
  currentPage++;
};

if (currentPage < PAGE_COUNT - 1) {
  showButton();
} else {
  hideButton();
};