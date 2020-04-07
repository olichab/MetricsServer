/**
 * Format data for cpu chart
 *
 * @param {Array} list list metrics
 * @param {Number} index index row selected
 * @param {Array} infosCpu list infos cpu (min, max, avg)
 */
const formatDataCpuChart = (list, index, infosCpu) => {
  const formattedDataCpuChart = [];
  list
    .filter((e) => e.id === index)
    .map((e) =>
      formattedDataCpuChart.push(
        [
          {
            x: `usr : ${e.cpu.usr}`,
            y: e.cpu.usr,
          },
          {
            x: `avg : ${infosCpu[0].usr.avg}`,
            y: infosCpu[0].usr.avg,
            opacity: 0.3,
          },
        ],
        [
          {
            x: `sys : ${e.cpu.sys}`,
            y: e.cpu.sys,
          },
          {
            x: `avg : ${infosCpu[0].sys.avg}`,
            y: infosCpu[0].sys.avg,
            opacity: 0.3,
          },
        ],
        [
          {
            x: `idl : ${e.cpu.idl}`,
            y: e.cpu.idl,
          },
          {
            x: `avg : ${infosCpu[0].idl.avg}`,
            y: infosCpu[0].idl.avg,
            opacity: 0.3,
          },
        ],
        [
          {
            x: `wai : ${e.cpu.wai}`,
            y: e.cpu.wai,
          },
          {
            x: `avg : ${infosCpu[0].wai.avg}`,
            y: infosCpu[0].wai.avg,
            opacity: 0.3,
          },
        ],
        [
          {
            x: `hiq : ${e.cpu.hiq}`,
            y: e.cpu.hiq,
          },
          {
            x: `avg : ${infosCpu[0].hiq.avg}`,
            y: infosCpu[0].hiq.avg,
            opacity: 0.3,
          },
        ],
        [
          {
            x: `siq : ${e.cpu.siq}`,
            y: e.cpu.siq,
          },
          {
            x: `avg : ${infosCpu[0].siq.avg}`,
            y: infosCpu[0].siq.avg,
            opacity: 0.3,
          },
        ]
      )
    );

  return formattedDataCpuChart;
};

export default formatDataCpuChart;
