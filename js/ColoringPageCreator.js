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
      const bodyRows = this.coloringTableBody.children;
      const rows = [];

      for (let i = 0; i < bodyRows.length; i++) {
         const row = [];
         const rowCells = bodyRows[i].children;

         for (let j = 0; j < rowCells.length; j++) {
            const cell = rowCells[j];
            row.push(cell.style.backgroundColor);
         }

         rows.push(row);
      }

      const json = JSON.stringify(rows);
      const blob = new Blob([json], { type: "application/json" });
      console.log(json);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "drawing.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
   }

   loadClicked() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";

      input.addEventListener("change", () => {
         const file = input.files[0];

         if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
               const json = reader.result;
               const rows = JSON.parse(json);

               for (let i = 0; i < rows.length; i++) {
                  for (let j = 0; j < rows[i].length; j++) {
                     const cell = this.coloringTableBody.children[i].children[j];
                     cell.style.backgroundColor = rows[i][j];
                  }
               }
            });

            reader.readAsText(file);
         }
      });

      input.click();
   }
}