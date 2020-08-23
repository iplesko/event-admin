import formatDate from '../../../src/function/formatDate';

describe('formatDate funcion', () => {
  it('should format date correctly', () => {
    const date = new Date(2020, 10, 20);

    const formattedDate = formatDate(date);

    expect(formattedDate).toEqual('2020-11-20');
  });

  it('should format date with leading zeros', () => {
    const date = new Date(2020, 3, 3);

    const formattedDate = formatDate(date);

    expect(formattedDate).toEqual('2020-04-03');
  });
});
