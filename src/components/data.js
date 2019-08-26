const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const getTaskRandom = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 14 - 7) * 24 * 60 * 60 * 1000,
  tags: new Set(shuffleArray([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]).slice(0, Math.round(Math.random() * 3))),
  repeatingDays: {
    'mo': Boolean(Math.round(Math.random())),
    'tu': Boolean(Math.round(Math.random())),
    'we': Boolean(Math.round(Math.random())),
    'th': Boolean(Math.round(Math.random())),
    'fr': Boolean(Math.round(Math.random())),
    'sa': Boolean(Math.round(Math.random())),
    'su': Boolean(Math.round(Math.random())),
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const filters = (tasks) => {
  return [
    {
      title: `ALL`,
      count: tasks.length,
    },
    {
      title: `OVERDUE`,
      count: tasks.filter((array) => array.dueDate < Date.now() && new Date(tasks.dueDate).toDateString() !== new Date().toDateString()).length,
    },

    {
      title: `TODAY`,
      count: tasks.filter((array) => new Date(array.dueDate).toDateString() === new Date().toDateString()).length,
    },
    {
      title: `FAVORITES`,
      count: tasks.filter((array) => array.isFavorite).length,
    },
    {
      title: `REPEATING`,
      count: tasks.filter((array) => Object.keys(array.repeatingDays).some((day) => array.repeatingDays[day])).length,
    },
    {
      title: `TAGS`,
      count: tasks.filter((array) => Array.from(array.tags).length > 0).length,
    },
    {
      title: `ARCHIVE `,
      count: tasks.filter((array) => array.isArchive).length,
    },
  ];
};
