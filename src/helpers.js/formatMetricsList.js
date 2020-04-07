import moment from "moment";

const formatMetricsList = (list) => {
  const formattedList = [];
  list.map((e, i) => {
    const dateComplete = [e.time.slice(0, 5), "-2020", e.time.slice(5)].join(
      ""
    );
    return formattedList.push({
      id: i,
      files: e.files,
      inodes: e.inodes,
      network: { recv: e.recv, send: e.send },
      memory: { used: e.used, buff: e.buff, cach: e.cach, free: e.free },
      cpu: {
        usr: e.usr,
        sys: e.sys,
        idl: e.idl,
        wai: e.wai,
        hiq: e.hiq,
        siq: e.siq,
      },
      time: moment(dateComplete, "DD-MM-YYYY h:mm:ss").format(
        "DD-MM-YYYY h:mm:ss"
      ),
      disk: { read: e.read, writ: e.writ },
      oneMin: e["1m"],
      fiveMin: e["5m"],
      fifteenMin: e["15m"],
    });
  });
  return formattedList;
};

export default formatMetricsList;
