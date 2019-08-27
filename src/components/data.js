const getRandom = (min, max) => {
  return (Math.round(Math.random() * (max - min) + min));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getBoolean = () => {
  return Boolean(getRandom(0, 1));
};

const getTaskDate = (time) => {
  const taskDate = new Date(time);
  const NAMES_MONTH = [
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
  return ([taskDate.getDate() + ` ` + NAMES_MONTH[taskDate.getMonth()], hours + `:` + minutes + ` ` + dd]);
};

export const getTaskRandom = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandom(0, 3)],
  dueDate: getTaskDate(Date.now() + 1 + getRandom(-7, 7) * 24 * 60 * 60 * 1000),
  tags: new Set(shuffleArray([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]).slice(0, getRandom(0, 3))),
  repeatingDays: {
    'mo': getBoolean(),
    'tu': getBoolean(),
    'we': getBoolean(),
    'th': getBoolean(),
    'fr': getBoolean(),
    'sa': getBoolean(),
    'su': getBoolean(),
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][getRandom(0, 5)],
  isFavorite: getBoolean(),
  isArchive: getBoolean(),
});

const getOverdueCount = (array) => {
  return array.dueDate < Date.now();
};

const getTodayCount = (array) => {
  return new Date(array.dueDate).toDateString() === new Date().toDateString();
};

const getFavoritesCount = (array) => {
  return array.isFavorite;
};

const getRepeatingCount = (array) => {
  let repeatDay = array.repeatingDays;
  let repeatDayObj = Object.keys(repeatDay);
  return repeatDayObj.some((day) => repeatDay[day]);
};

const getTagsCount = (array) => {
  return Array.from(array.tags).length > 0;
};

const getArchiveCount = (array) => {
  return array.isArchive;
};

export const filters = (tasks) => {
  return [
    {
      title: `ALL`,
      count: tasks.length,
    },
    {
      title: `OVERDUE`,
      count: tasks.filter(getOverdueCount).length,
    },
    {
      title: `TODAY`,
      count: tasks.filter(getTodayCount).length,
    },
    {
      title: `FAVORITES`,
      count: tasks.filter(getFavoritesCount).length,
    },
    {
      title: `REPEATING`,
      count: tasks.filter(getRepeatingCount).length,
    },
    {
      title: `TAGS`,
      count: tasks.filter(getTagsCount).length,
    },
    {
      title: `ARCHIVE `,
      count: tasks.filter(getArchiveCount).length,
    },
  ];
};
