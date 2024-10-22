"use strict";

import { ColoringPageCreator } from "./ColoringPageCreator.js";

const config = {
   coloringTableBody: "coloringTableBody",
   colorsTableBody: "colorsTableBody",
   initialState: {
      rows: 5,
      columns: 5,
      colors: ["white", "red", "green", "blue", "black"],
   },
}

new ColoringPageCreator(config);
