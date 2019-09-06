export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
export const DAYS_WEEK = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

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
  const MONTH_NAMES = [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`];
  let hour = taskDate.getHours();
  let minute = taskDate.getMinutes();
  let dd = `AM`;
  if (hour > 12) {
    hour = hour - 12;
    dd = `PM`;
  } else if (hour === 0) {
    dd = `AM`;
  }

  minute = minute < 10 ? `0` + minute : minute;

  const formatedDate = format
  .replace(`DAY`, taskDate.getDate())
  .replace(`MONTH`, MONTH_NAMES[taskDate.getMonth()])
  .replace(`HOUR`, hour)
  .replace(`MINUTE`, minute)
  .replace(`DD`, dd);
  return formatedDate;
};

const isOverdue = (task) => {
  return task.dueDate < Date.now() && !isToday(task);
};

export const isFavorite = (task) => {
  return task;
};

export const isRepeating = (task) => {
  let repeatDaysValues = Object.values(task);
  return repeatDaysValues.some(day => day);
};

const isTags = (task) => {
  return Array.from(task.tags).length > 0;
};

export const isArchive = (task) => {
  return task;
};

const getTaskRandom = () => ({
  description: getRandomArrayElement([
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ]),
  dueDate: Date.now() + getRandomNumber(-7, 7) * 24 * 60 * 60 * 1000 + getRandomNumber(1, 5) * 60 * 60 * 1000,
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
  favorite: getRandomBoolean(),
  archive: getRandomBoolean(),
});

export const getTasksArray = (count) => {
  return new Array(count).fill(``).map(getTaskRandom);
};

export const isToday = (task) => {
  return formatDate(task, `DAY MONTH`) === formatDate(Date.now(), `DAY MONTH`);
};

export const getfilterStatus = (title,count) => {
  let filterStatus = ``;
  if (title === `all`) {
    filterStatus = `checked`;
  } else if (count == 0) {
    filterStatus = `disabled`;
  }
  return filterStatus;
}

export const getFilters = (tasks) => {
  return [
    {
      title: `all`,
      count: tasks.length - tasks.filter((task) => isArchive(task.archive)).length,
    },
    {
      title: `overdue`,
      count: tasks.filter(isOverdue).length,
    },
    {
      title: `today`,
      count: tasks.filter((task) => isToday(task.dueDate)).length,
    },
    {
      title: `favorites`,
      count: tasks.filter((task) => isFavorite(task.favorite)).length,
    },
    {
      title: `repeating`,
      count: tasks.filter((task) => isRepeating(task.repeatingDays)).length,
    },
    {
      title: `tags`,
      count: tasks.filter(isTags).length,
    },
    {
      title: `archive `,
      count: tasks.filter((task) => isArchive(task.archive)).length,
    },
  ];
};
