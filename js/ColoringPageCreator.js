"use strict";

export class ColoringPageCreator {
   constructor(config) {
      this.rows = config.rows;
      this.columns = config.columns;
      this.colors = config.colors;

      this.coloringTableBody = document.getElementById("coloringTableBody");
      this.colorsTableBody = document.getElementById("colorsTableBody");

      if (!this.coloringTableBody || !this.colorsTableBody) {
         throw new Error("Table elements not found in the DOM");
      }

      this.saveButton = document.getElementById("saveButton");
      this.loadButton = document.getElementById("loadButton");
      this.resetButton = document.getElementById("resetButton");

      this.setupTable({
         table: this.coloringTableBody,
         rows: this.rows,
         columns: this.columns,
         selectedColor: "white",
      });

      this.setupTable({
         table: this.colorsTableBody,
         rows: 1,
         columns: this.colors.length,
         colors: this.colors
      });
   }

   setupTable({ table, rows, columns, selectedColor = "white", colors = null }) {
      for (let i = 0; i < rows; i++) {
         const newRow = document.createElement("tr");
         for (let j = 0; j < columns; j++) {
            const newCell = document.createElement("td");

            if (colors) {
               this.customCellSetup(newCell, colors[j]);
               this.handleColorCellClick(newCell, colors[j], i, j);
            } else {
               newCell.classList.add("white");
               this.handleColoringCellClick(newCell, i, j, selectedColor);
            }
            newRow.appendChild(newCell);
         }
         table.appendChild(newRow);

      }
   }

   customCellSetup(newCell, color) {
      newCell.classList.add(color);
   }

   handleColoringCellClick(newCell, row, column, selectedColor) {
      newCell.addEventListener("click", () => {
         newCell.classList.toggle(selectedColor);
         console.log(`I am field ${row + 1}, ${column + 1} and I was just colored ${newCell.classList.value}`);
      });

   }

   handleColorCellClick(newCell, color, row, column) {

   }
}