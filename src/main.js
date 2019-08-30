import { createMenuTemplate } from "./components/menu.js";
import { createSearchTemplate } from "./components/search.js";
import { createFiltersTemplate } from "./components/filters.js";
import { createTaskBoardTemplate } from "./components/task-board.js";
import { createTaskEditTemplate } from "./components/task-edit.js";
import { createTaskTemplate } from "./components/task.js";
import { createLoadMoreTemplate } from "./components/button-load-more.js";
import { getTasksArray } from "./components/data.js"
import { getFilters } from "./components/data.js";

const renderComponent = (componentContainer, markup, place = `beforeend`) => {
  componentContainer.insertAdjacentHTML(place, markup);
};

const menuContainer = document.querySelector(`.main__control.control.container`);
renderComponent(menuContainer, createMenuTemplate());

const TASK_COUNT = 16;
const tasks = getTasksArray(TASK_COUNT);

const PAGE_SIZE = 8;
const PAGE_COUNT = Math.ceil(TASK_COUNT / PAGE_SIZE);

const filters = getFilters(tasks);

const mainContainer = document.querySelector(`.main`);
renderComponent(mainContainer, createSearchTemplate());
renderComponent(mainContainer, createFiltersTemplate(filters));
renderComponent(mainContainer, createTaskBoardTemplate());

const taskContainer = document.querySelector(`.board__tasks`);
renderComponent(taskContainer, createTaskEditTemplate(tasks[0]));
renderComponent(taskContainer, tasks.slice(1,8).map(createTaskTemplate).join(``));

let currentPage = 1;

const boardContainer = document.querySelector(`.board.container`);
const showButton = () => {
  let button = document.querySelector(`.load-more`);
  if (!button) {
    renderComponent(boardContainer, createLoadMoreTemplate());
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
  return tasks.slice(firstIndex, lastIndex);
};

const renderTasksPage = () => {
  const pageTasks = getTasks(currentPage);
  taskContainer.insertAdjacentHTML(`beforeend`, pageTasks.map(createTaskTemplate).join(``));
  if (currentPage < PAGE_COUNT - 1) {
    showButton();
  } else {
    hideButton();
  };
  currentPage++;
};

if (currentPage <= PAGE_COUNT - 1) {
  showButton();
} else {
  hideButton();
};