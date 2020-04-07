/**
 * Format data for select
 *
 * @param {Array} list list metrics
 * @param {String} type type (files or inodes)
 */

const formatListSelectAndSort = (list, type) => {
  const formattedList = [];
  list.map((e) =>
    formattedList.push({ value: e[`${type}`], label: e[`${type}`] })
  );
  // unique values and sort asc
  const uniqueFilesList = [...new Set(formattedList.map(JSON.stringify))]
    .map(JSON.parse)
    .sort((a, b) => a.value - b.value);
  return uniqueFilesList;
};

export default formatListSelectAndSort;
