"use strict";

import { ColoringGrid } from "./ColoringGrid.js";
import { ColorPalette } from "./ColorPalette.js";
import { Settings } from "./Settings.js";


export class ColoringPageCreator {
   constructor(config) {
      this.coloringTableBody = config.coloringTableBodyId;
      this.colorsTableBody = config.colorsTableBodyId;

      this.settings = new Settings();

      this.rows = config.rows;
      this.columns = config.columns;
      this.colors = config.colors;
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

      this.settings.generateButton.addEventListener("click", () => {
         const newRows = this.settings.getRows();
         const newColumns = this.settings.getColumns();

         if (newRows && newColumns) {
            this.updateGrid(newRows, newColumns);
         }
      })

      this.saveButton = document.getElementById("saveButton");
      this.loadButton = document.getElementById("loadButton");
      this.resetButton = document.getElementById("resetButton");

      this.saveButton.addEventListener("click", () => this.saveClicked());
      this.loadButton.addEventListener("click", () => this.loadClicked());
      this.resetButton.addEventListener("click", () => this.resetClicked());
   }

   updateGrid(newRows, newColumns) {
      this.coloringTableBody.innerHTML = "";
      this.rows = newRows;
      this.columns = newColumns;
      this.coloringGrid = new ColoringGrid({
         table: this.coloringTableBody,
         rows: this.rows,
         columns: this.columns,
         colors: this.colors,
         colorPalette: this.colorPalette,
      });

      this.settings.toggleSettings();
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
               const rowsArray = JSON.parse(json);

               this.rows = rowsArray.length;
               this.columns = rowsArray[0].length;

               this.coloringTableBody.innerHTML = "";

               this.coloringGrid = new ColoringGrid({
                  table: this.coloringTableBody,
                  rows: this.rows,
                  columns: this.columns,
                  colors: this.colors,
                  colorPalette: this.colorPalette,
               });

               for (let i = 0; i < rowsArray.length; i++) {
                  for (let j = 0; j < rowsArray[i].length; j++) {
                     const cell = this.coloringTableBody.children[i].children[j];
                     cell.style.backgroundColor = rowsArray[i][j];
                  }
               }
            });

            reader.readAsText(file);
         }
      });

      input.click();
   }
}