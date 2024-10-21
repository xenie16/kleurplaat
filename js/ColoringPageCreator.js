"use strict";

export class ColoringPageCreator {
   constructor(config) {
      this.rows = config.rows || 10;
      this.columns = config.columns || 10;
      this.colors = config.colors || ["white", "red", "green", "blue",];

      this.coloringTableBody = document.getElementById("coloringTableBody");
      this.colorsTableBody = document.getElementById("colorsTableBody");

      if (!this.coloringTableBody || !this.colorsTableBody) {
         throw new Error("Table elements not found in the DOM");
      }

      this.saveButton = document.getElementById("saveButton");
      this.loadButton = document.getElementById("loadButton");
      this.resetButton = document.getElementById("resetButton");


      this.selectedColor = this.colors[0];

      this.setupTable({
         table: this.coloringTableBody,
         rows: this.rows,
         columns: this.columns,
         selectedColor: this.selectedColor,
      });

      this.setupTable({
         table: this.colorsTableBody,
         rows: 1,
         columns: this.colors.length,
         colors: this.colors
      });

      this.saveButton.addEventListener("click", () => this.saveClicked());
      this.loadButton.addEventListener("click", () => this.loadClicked());
      this.resetButton.addEventListener("click", () => this.resetClicked());
   }

   setupTable({ table, rows, columns, selectedColor, colors = null }) {
      for (let i = 0; i < rows; i++) {
         const newRow = document.createElement("tr");
         for (let j = 0; j < columns; j++) {
            const newCell = document.createElement("td");

            if (colors) {
               this.customCellSetup(newCell, colors[j]);
               this.handleColorCellClick(newCell, colors[j]);
            } else {
               newCell.style.backgroundColor = selectedColor;
               this.handleColoringCellClick(newCell, i, j);
            }
            newRow.appendChild(newCell);
         }
         table.appendChild(newRow);
      }
   }

   customCellSetup(newCell, color) {
      newCell.style.backgroundColor = color;
   }

   handleColoringCellClick(cell, row, column) {
      cell.addEventListener("click", () => {
         cell.style.backgroundColor = this.selectedColor;
         console.log(`I am field ${row + 1}, ${column + 1} and I was just colored ${this.selectedColor}`);
      });
   }

   handleColorCellClick(cell, color) {
      cell.addEventListener("click", () => {
         this.selectedColor = color;
      })
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