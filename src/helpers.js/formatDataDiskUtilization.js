import readableBytes from "./readableBytes";
/**
 * Format data for disk utilization
 *
 * @param {Array} list list metrics
 * @param {Number} index index row selected
 */
const formatDataDiskUtilization = (list, id) => {
  const formattedDataDiskUtilization = [];
  // if a row is selected
  if (id !== -1) {
    list
      .filter((e) => e.id === id)
      .map((e) =>
        formattedDataDiskUtilization.push({
          id: 0,
          read: readableBytes(e.disk.read),
          writ: readableBytes(e.disk.writ),
        })
      );
  } else {
    let readTotal = 0;
    let writeTotal = 0;
    list.map((e, index) => {
      if (e.disk.read !== undefined && e.disk.writ !== undefined) {
        readTotal += e.disk.read;
        writeTotal += e.disk.writ;
      }
      return (
        index === list.length - 1 &&
        formattedDataDiskUtilization.push({
          id: 0,
          read: readableBytes(readTotal),
          writ: readableBytes(writeTotal),
        })
      );
    });
  }
  return formattedDataDiskUtilization;
};

export default formatDataDiskUtilization;
