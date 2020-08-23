const leadingZero = (num: number): string => `${num > 9 ? '' : '0'}${num}`;

export default (date: Date): string => {
  const year = date.getFullYear();
  const month = leadingZero(date.getMonth() + 1);
  const day = leadingZero(date.getDate());

  return `${year}-${month}-${day}`;
};
