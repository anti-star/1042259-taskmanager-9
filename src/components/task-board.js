import AbstractComponent from "./absctract-component";

export default class TaskBoard extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
