export default {
  unpause(client) {
    let command_time = Date.now();
    let diff;
    let secs = 1;
    do {
      diff = Date.now() - command_time;
      if (diff >= secs * 1000) {
        client.write(`/say ${4-secs}...\r\n`);
        secs++;
      }
    } while(diff < 3100);

    client.write(`/unpause\r\n`);
  },

  pause(client) {
    client.write(`/pause\r\n`);
  },
};
