const leadingZero = (num: number): string => `${num > 9 ? '' : '0'}${num}`;

export default (date: Date) =>
    `${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`
