import Config from "../../../config.js";

import fs from "fs";
import path from "path";

let FileSystem = {
  maps: [],
  set_maps(maps) {
    this.maps = maps.filter(file => {
      if (file.substr(-4).toLowerCase()  !== ".pms") return false;
      return true;
    });
    this.maps = this.maps.map(map => map.substr(0, map.lastIndexOf(".")));

    console.log("Loaded Maps", this.maps);
  }
};

console.log(`Looking for files on ${Config.soldatserver.path}/maps/`);
FileSystem.set_maps(fs.readdirSync(`${Config.soldatserver.path}/maps/`));

export default FileSystem;
