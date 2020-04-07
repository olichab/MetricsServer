import { findMin, findMax } from "./findMinAndMax";
/**
 * Format data for cpu usage
 *
 * @param {Array} list list metrics
 */
const formatDataCpuUsage = (list) => {
  const formattedDataCpuUsage = [];
  let countEntries = 1; // init to 1 because first reduce index is 1
  const [arrUsr, arrSys, arrIdl, arrWai, arrHiq, arrSiq] = [
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  list.reduce((acc, val, index, array) => {
    if (
      val.cpu.usr !== undefined &&
      val.cpu.sys !== undefined &&
      val.cpu.idl !== undefined &&
      val.cpu.wai !== undefined &&
      val.cpu.hiq !== undefined &&
      val.cpu.siq !== undefined
    ) {
      countEntries += 1;
      acc.cpu.usr += val.cpu.usr;
      acc.cpu.sys += val.cpu.sys;
      acc.cpu.idl += val.cpu.idl;
      acc.cpu.wai += val.cpu.wai;
      acc.cpu.hiq += val.cpu.hiq;
      acc.cpu.siq += val.cpu.siq;
      arrUsr.push(val.cpu.usr);
      arrSys.push(val.cpu.sys);
      arrIdl.push(val.cpu.idl);
      arrWai.push(val.cpu.wai);
      arrHiq.push(val.cpu.hiq);
      arrSiq.push(val.cpu.siq);
    }
    return index === array.length - 1
      ? formattedDataCpuUsage.push({
          id: 0,
          usr: {
            min: findMin(arrUsr),
            max: findMax(arrUsr),
            avg: Math.round((acc.cpu.usr / countEntries) * 1000) / 1000,
          },
          sys: {
            min: findMin(arrSys),
            max: findMax(arrSys),
            avg: Math.round((acc.cpu.sys / countEntries) * 1000) / 1000,
          },
          idl: {
            min: findMin(arrIdl),
            max: findMax(arrIdl),
            avg: Math.round((acc.cpu.idl / countEntries) * 1000) / 1000,
          },
          wai: {
            min: findMin(arrWai),
            max: findMax(arrWai),
            avg: Math.round((acc.cpu.wai / countEntries) * 1000) / 1000,
          },
          hiq: {
            min: findMin(arrHiq),
            max: findMax(arrHiq),
            avg: Math.round((acc.cpu.hiq / countEntries) * 1000) / 1000,
          },
          siq: {
            min: findMin(arrSiq),
            max: findMax(arrSiq),
            avg: Math.round((acc.cpu.siq / countEntries) * 1000) / 1000,
          },
        })
      : acc;
  });
  return formattedDataCpuUsage;
};

export default formatDataCpuUsage;
