import TaskBoard from "../components/task-board";
import TaskList from "../components/task-list";
import {render, unrender, Position} from "../utils";
import TaskEdit from "../components/task-edit";
import Task from "../components/task";
import LoadMore from "../components/button-load-more";
import TaskBoardEmpty from "../components/task-board-empty";
import Sort from "../components/sort";

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new TaskBoard();
    this._taskList = new TaskList();
    this._loadMore = new LoadMore();
    this._emptyBoard = new TaskBoardEmpty();
    this._sort = new Sort();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    const PAGE_SIZE = 8;
    const PAGE_COUNT = Math.ceil(this._tasks.length / PAGE_SIZE);

    if (this._tasks.length === 0) {
      render(this._board.getElement(), this._emptyBoard.getElement(), Position.BEFOREEND);
    } else {
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);

      let firstIndex = 0;
      let lastIndex = PAGE_SIZE;
      this._renderTaskPage(firstIndex, lastIndex);

      if (PAGE_COUNT > 1) {
        let currentPage = 1;
        render(this._board.getElement(), this._loadMore.getElement(), Position.BEFOREEND);

        this._loadMore.getElement().addEventListener(`click`, () => {
          firstIndex = firstIndex + PAGE_SIZE;
          lastIndex = lastIndex + PAGE_SIZE;
          this._renderTaskPage(firstIndex, lastIndex);
          currentPage++;

          if (currentPage === PAGE_COUNT) {
            unrender(this._loadMore.getElement());
            this._loadMore.removeElement();
          }
        });
      }
    }

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderTaskPage(firstIndex, lastIndex) {
    this._tasks.slice(firstIndex, lastIndex).forEach((taskMock) => this._renderTask(taskMock));
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}
