import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const getRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

export const isOverdue = (dueDate) => {
  return dayjs(dueDate).isBefore(dayjs(), 'day');
};

export const getDaysUntilDue = (dueDate) => {
  return dayjs(dueDate).diff(dayjs(), 'day');
};

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isTomorrow = (date) => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
};

export const getDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'day');
};