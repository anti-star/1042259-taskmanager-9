import Menu from "./components/menu";
import Search from "./components/search";
import Filters from "./components/filters";
import { getTasksArray } from "./data"
import { getFilters } from "./data";
import { Position } from "./utils";
import { render } from  "./utils";
import BoardController from "./controllers/board";

const menuContainer = document.querySelector(`.main__control.control.container`);

const menu = new Menu;
render(menuContainer, menu.getElement(), Position.BEFOREEND);

const TASK_COUNT = 5;

const mainContainer = document.querySelector(`.main`);

const search = new Search;
render(mainContainer, search.getElement(), Position.BEFOREEND);

const taskMocks = getTasksArray(TASK_COUNT);
const filterMocks = getFilters(taskMocks);
console.log(filterMocks);

const filter = new Filters(filterMocks);
render(mainContainer, filter.getElement(), Position.BEFOREEND);

const boardController = new BoardController(mainContainer, taskMocks);
boardController.init();
