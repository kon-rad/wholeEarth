export const getImageDate = (identifier) => {
  const year = identifier.substring(0, 4);
  const mon = identifier.substring(4, 6);
  const day = identifier.substring(6, 8);
  return { year, mon, day };
};

export const getHumanDateTime = (identifier) => {
  if (!identifier) return;
  const year = identifier.substring(0, 4);
  const mon = identifier.substring(4, 6);
  const day = identifier.substring(6, 8);
  const hour = identifier.substring(8, 10);
  const min = identifier.substring(10, 12);
  return `${mon}/${day}/${year} ${hour}:${min}`;
};


