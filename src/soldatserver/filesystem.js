import Config from "../config.js";
import glob from "glob";

let FileSystem = {
  maps: [],
  set_maps(err, maps) {
    if (err) {
      console.log({filesyste_err: err});
      this.maps = [];
    } else this.maps = maps;
  }
};

glob(`${Config.soldatserver.path}/maps/**/*.pms`, FileSystem.set_maps);

export default FileSystem;
