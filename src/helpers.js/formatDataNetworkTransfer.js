import readableBytes from "./readableBytes";
/**
 * Format data for network transfer
 *
 * @param {Array} list list metrics
 * @param {Number} index index row selected
 */
const formatDataNetworkTransfer = (list, id) => {
  const formattedDataNetworkTransfer = [];
  // if a row is selected
  if (id !== -1) {
    list
      .filter((e) => e.id === id)
      .map((e) =>
        formattedDataNetworkTransfer.push({
          id: 0,
          received: readableBytes(e.network.recv),
          send: readableBytes(e.network.send),
        })
      );
  } else {
    let receivedtotal = 0;
    let sendTotal = 0;
    list.map((e, index) => {
      if (e.network.recv !== undefined && e.network.send !== undefined) {
        receivedtotal += e.network.recv;
        sendTotal += e.network.send;
      }
      return (
        index === list.length - 1 &&
        formattedDataNetworkTransfer.push({
          id: 0,
          received: readableBytes(receivedtotal),
          send: readableBytes(sendTotal),
        })
      );
    });
  }
  return formattedDataNetworkTransfer;
};

export default formatDataNetworkTransfer;
