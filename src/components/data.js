const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.slice(0, getRandomNumber(0, 3));
};

const getRandomBoolean = () => {
  return Boolean(getRandomNumber(0, 1));
};

export const formatDate = (time, format) => {
  const taskDate = new Date(time);
  const monthNames = [
    `JANUARY`,
    `FEBRUARY`,
    `MARCH`,
    `APRIL`,
    `MAY`,
    `JUNE`,
    `JULY`,
    `AUGUST`,
    `SEPTEMBER`,
    `OCTOBER`,
    `NOVEMBER`,
    `DECEMBER`];
  let hours = taskDate.getHours();
  let minutes = taskDate.getMinutes();
  let dd = `AM`;
  if ((hours > 12) || (hours === 0)) {
    hours = hours - 12;
    dd = `PM`;
  }
  minutes = minutes < 10 ? `0` + minutes : minutes;

  const formatedDate = format
  .replace(`DAY`, taskDate.getDate())
  .replace(`MONTH`, monthNames[taskDate.getMonth()])
  .replace(`HOUR`, hours)
  .replace(`MINUTE`, minutes)
  .replace(`DD`, dd);
  return formatedDate;
};

const getTaskRandom = () => ({
  description: getRandomArrayElement([
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ]),
  dueDate: Date.now() + 1 + getRandomNumber(-7, 7) * 24 * 60 * 60 * 1000,
  tags: new Set(shuffleArray([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ])),
  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': getRandomBoolean(),
    'we': getRandomBoolean(),
    'th': getRandomBoolean(),
    'fr': getRandomBoolean(),
    'sa': getRandomBoolean(),
    'su': getRandomBoolean(),
  },
  color: getRandomArrayElement([
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ]),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});

export const getTasksArray = (count) => {
  return new Array(count).fill(``).map(getTaskRandom);
};

export const isToday = (task) => {
  return formatDate(task.dueDate, `DAY MONTH`) === formatDate(Date.now(), `DAY MONTH`);
};

const isOverdue = (task) => {
  return task.dueDate < Date.now() && !isToday(task);
};

const isFavorites = (task) => {
  return task.isFavorite;
};

export const isRepeating = (task) => {
  let repeatDay = task.repeatingDays;
  let repeatDayObj = Object.keys(repeatDay);
  return repeatDayObj.some((day) => repeatDay[day]);
};

const isTags = (task) => {
  return Array.from(task.tags).length > 0;
};

const isArchive = (task) => {
  return task.isArchive;
};

export const getFilters = (tasks) => {
  return [
    {
      title: `ALL`,
      count: tasks.length,
    },
    {
      title: `OVERDUE`,
      count: tasks.filter(isOverdue).length,
    },
    {
      title: `TODAY`,
      count: tasks.filter(isToday).length,
    },
    {
      title: `FAVORITES`,
      count: tasks.filter(isFavorites).length,
    },
    {
      title: `REPEATING`,
      count: tasks.filter(isRepeating).length,
    },
    {
      title: `TAGS`,
      count: tasks.filter(isTags).length,
    },
    {
      title: `ARCHIVE `,
      count: tasks.filter(isArchive).length,
    },
  ];
};
