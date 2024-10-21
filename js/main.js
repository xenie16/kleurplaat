"use strict";

import { ColoringPageCreator } from "./ColoringPageCreator.js";

const config = {
   coloringTableBodyId: document.getElementById("coloringTableBody"),
   colorsTableBodyId: document.getElementById("colorsTableBody"),
   rows: 5,
   columns: 5,
   colors: ["white", "red", "green", "blue"],
}

new ColoringPageCreator(config);


