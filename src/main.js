import Menu from "./components/menu";
import Search from "./components/search";
import Filters from "./components/filters";
import TaskBoard from "./components/task-board";
import TaskEdit from "./components/task-edit";
import Task from "./components/task";
import LoadMore from "./components/button-load-more";
import {getTasksArray, getFilters} from "./data"
import {Position, render, unrender} from "./utils";

const menuContainer = document.querySelector(`.main__control.control.container`);

const menu = new Menu;
render(menuContainer, menu.getElement(), Position.BEFOREEND);

const TASK_COUNT = 10;

const mainContainer = document.querySelector(`.main`);

const search = new Search;
render(mainContainer, search.getElement(), Position.BEFOREEND);

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

const taskMocks = getTasksArray(TASK_COUNT);
const filterMocks = getFilters(taskMocks);

const filter = new Filters(filterMocks);
render(mainContainer, filter.getElement(), Position.BEFOREEND);

const taskBoard = new TaskBoard;
render(mainContainer, taskBoard.getElement(), Position.BEFOREEND);

const PAGE_SIZE = 8;
const PAGE_COUNT = Math.ceil(TASK_COUNT / PAGE_SIZE);
const loadMore = new LoadMore;

const tasksContainer = document.querySelector(`.board__tasks`);
const boardContainer = document.querySelector(`.board.container`);

const renderTasksPage = (firstIndex, lastIndex) => taskMocks.slice(firstIndex, lastIndex).forEach((taskMock) => renderTask(taskMock));

const renderPage = () => {
  let firstIndex = 0;
  let lastIndex = PAGE_SIZE;
  renderTasksPage(firstIndex, lastIndex);
  render(boardContainer, loadMore.getElement(), Position.BEFOREEND);
  boardContainer.querySelector(`.load-more`).addEventListener(`click`, () => {
    firstIndex = firstIndex + PAGE_SIZE;
    lastIndex = lastIndex + PAGE_SIZE;
    renderTasksPage(firstIndex, lastIndex);
    currentPage++;
    if (currentPage <= PAGE_COUNT - 1) {
      render(boardContainer, loadMore.getElement(), Position.BEFOREEND);
    } else {
      unrender(loadMore.getElement());
      loadMore.removeElement();
    }
  });
};

let currentPage = 1;
if (currentPage <= PAGE_COUNT - 1) {
  renderPage();
} else {
  taskMocks.forEach((taskMock) => renderTask(taskMock));
};
