import FileSystem from "./includes/filesystem.js";
export default {
  triggers: ["!map"],
  context: {},
  execute(nickname, args) {
    if (!args.length) return;
    let maps = FileSystem.maps.filter(map => {
      return map.toLowerCase().indexOf(args[0].toLowerCase()) !== -1 &&
        map.length - args[0].length <= 4;
    });
    console.log({maps});
    if (maps.length) {
      let map = maps[0];
      const regex = /^(ctf|htf|inf)_/;
      let map1_length = regex.test(map) ? map.length - 4 : map.length;
      let map2_length = 0;
      for (let i = 1; i < maps.length; i++) {
        map2_length = regex.test(maps[i]) ? maps[i].length - 4 : maps[i].length;
        if (map2_length <= map1_length) {
          map = maps[i];
          map1_length = map2_length;
        }
      }
      this.context.client.write(`/map ${map}\r\n`);
    } else this.context.client.write(`/map ${args[0]}\r\n`);
  }
}
