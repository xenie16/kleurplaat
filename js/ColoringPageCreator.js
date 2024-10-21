"use strict";

import { ColoringGrid } from "./ColoringGrid.js";
import { ColorPalette } from "./ColorPalette.js";

export class ColoringPageCreator {
   constructor(config) {
      this.coloringTableBody = config.coloringTableBodyId;
      this.colorsTableBody = config.colorsTableBodyId;

      this.rows = config.rows || 10;
      this.columns = config.columns || 10;
      this.colors = config.colors || ["white", "red", "green", "blue",];
      this.resetColor = this.colors[0];

      this.colorPalette = new ColorPalette({
         table: this.colorsTableBody,
         rows: 1,
         columns: this.colors.length,
         colors: this.colors,
      });

      this.coloringGrid = new ColoringGrid({
         table: this.coloringTableBody,
         rows: this.rows,
         columns: this.columns,
         colors: this.colors,
         colorPalette: this.colorPalette,
      });

      this.saveButton = document.getElementById("saveButton");
      this.loadButton = document.getElementById("loadButton");
      this.resetButton = document.getElementById("resetButton");

      this.saveButton.addEventListener("click", () => this.saveClicked());
      this.loadButton.addEventListener("click", () => this.loadClicked());
      this.resetButton.addEventListener("click", () => this.resetClicked());
   }

   resetClicked(resetColor = this.colors[0]) {
      for (let i = 0; i < this.rows; i++) {
         for (let j = 0; j < this.columns; j++) {
            const cell = this.coloringTableBody.children[i].children[j];
            cell.style.backgroundColor = resetColor;
         }
      }
   }

   saveClicked() {
      console.log('save clicked');
   }

   loadClicked() {
      console.log('load clicked');
   }
}