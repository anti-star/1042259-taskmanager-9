import {getMenuMarkup} from "./components/menu.js";
import {getSearchMarkup} from "./components/search.js";
import {getFiltersMarkup} from "./components/filters.js";
import {getTaskBoardMarkup} from "./components/task-board.js";
import {getNewTaskMarkup} from "./components/new-task.js";
import {getCardMarkup} from "./components/task-card.js";
import {getLoadMoreMarkup} from "./components/button-load-more.js";

function renderComponent(componentContainer, markup) {
  componentContainer.innerHTML += markup;
}

const menuContainer = document.querySelector(`.main__control.control.container`);
const mainContainer = document.querySelector(`main`);

renderComponent(menuContainer, getMenuMarkup());
renderComponent(mainContainer, getSearchMarkup());
renderComponent(mainContainer, getFiltersMarkup());
renderComponent(mainContainer, getTaskBoardMarkup());

const taskContainer = document.querySelector(`.board__tasks`);

renderComponent(taskContainer, getNewTaskMarkup());

for (let i = 0; i < 3; i++) {
  renderComponent(taskContainer, getCardMarkup());
}

const boardContainer = document.querySelector(`.board.container`);
renderComponent(boardContainer, getLoadMoreMarkup());