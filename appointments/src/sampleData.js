const randomInt = range => Math.floor(Math.random() * range);
const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];
Array.prototype.pickRandom = function() {
  return this[randomInt(this.length)];
};
const pickMany = (items, number) =>
  Array(number)
    .fill(1)
    .map(() => items.pickRandom());

const buildTimeSlots = () => {
  const today = new Date();
  const startTime = today.setHours(9, 0, 0, 0);
  const times = [...Array(7).keys()].map(day => {
    const daysToAdd = day * 24 * 60 * 60 * 1000;
    return [...Array(20).keys()].map(halfHour => {
      const halfHoursToAdd = halfHour * 30 * 60 * 1000;
      return {
        startsAt: startTime + daysToAdd + halfHoursToAdd,
        stylists: pickMany(stylists, randomInt(stylists.length))
      };
    });
  });
  return [].concat(...times);
};

export const sampleAvailableTimeSlots = pickMany(
  buildTimeSlots(),
  50
);
