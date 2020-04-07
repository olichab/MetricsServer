/**
 * Converts a long string of bytes into a readable format  (KB, MB, GB, TB, YB)
 *
 * @param {Int} bytes The number of bytes.
 */
const readableBytes = (bytes) => {
  if (bytes > 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }
  return "0";
};

export default readableBytes;
