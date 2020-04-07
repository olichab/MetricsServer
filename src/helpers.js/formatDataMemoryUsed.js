import readableBytes from "./readableBytes";
/**
 * Format data for memory used
 *
 * @param {Array} list list metrics
 * @param {Number} index index row selected
 */
const formatDataMemoryUsed = (list, id) => {
  const formattedDataMemoryUsed = [];
  if (id !== -1) {
    list
      .filter((e) => e.id === id)
      .map((e) => {
        const total =
          e.memory.used + e.memory.buff + e.memory.cach + e.memory.free;
        return formattedDataMemoryUsed.push({
          id: 0,
          used: {
            value: readableBytes(e.memory.used),
            percentage: ((100 * e.memory.used) / total).toFixed(1),
          },
          buff: {
            value: readableBytes(e.memory.buff),
            percentage: ((100 * e.memory.buff) / total).toFixed(1),
          },
          cach: {
            value: readableBytes(e.memory.cach),
            percentage: ((100 * e.memory.cach) / total).toFixed(1),
          },
          free: {
            value: readableBytes(e.memory.free),
            percentage: ((100 * e.memory.free) / total).toFixed(1),
          },
        });
      });
  } else {
    let usedTotal = 0;
    let buffTotal = 0;
    let cachTotal = 0;
    let freeTotal = 0;
    list.map((e, index) => {
      if (
        e.memory.used !== undefined &&
        e.memory.buff !== undefined &&
        e.memory.cach !== undefined &&
        e.memory.free !== undefined
      ) {
        usedTotal += e.memory.used;
        buffTotal += e.memory.buff;
        cachTotal += e.memory.cach;
        freeTotal += e.memory.free;
      }

      const total = usedTotal + buffTotal + cachTotal + freeTotal;
      return (
        index === list.length - 1 &&
        formattedDataMemoryUsed.push({
          id: 0,
          used: {
            value: readableBytes(usedTotal),
            percentage: ((100 * usedTotal) / total).toFixed(1),
          },
          buff: {
            value: readableBytes(buffTotal),
            percentage: ((100 * buffTotal) / total).toFixed(1),
          },
          cach: {
            value: readableBytes(cachTotal),
            percentage: ((100 * cachTotal) / total).toFixed(1),
          },
          free: {
            value: readableBytes(freeTotal),
            percentage: ((100 * freeTotal) / total).toFixed(1),
          },
        })
      );
    });
  }
  return formattedDataMemoryUsed;
};

export default formatDataMemoryUsed;
