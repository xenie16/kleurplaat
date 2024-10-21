"use strict";

export class ColoringGrid {
   constructor({ table, rows, columns, colors, colorPalette }) {

      this.table = table;
      this.rows = rows;
      this.columns = columns;
      this.colors = colors;
      this.defaultColor = colors[0];

      this.colorPalette = colorPalette;

      this.setupTable({
         table: this.table,
         rows: this.rows,
         columns: this.columns,
         defaultColor: this.defaultColor
      })
   }

   setupTable({ table, rows, columns, defaultColor }) {
      for (let i = 0; i < rows; i++) {
         const newRow = document.createElement("tr");
         for (let j = 0; j < columns; j++) {
            const newCell = document.createElement("td");
            newCell.style.backgroundColor = defaultColor;

            this.handleColorCellClick(newCell, i, j);

            newRow.appendChild(newCell);
         }
         table.appendChild(newRow);
      }
   }

   handleColorCellClick(cell, row, column) {
      cell.addEventListener("click", () => {
         const originalColor = cell.style.backgroundColor;
         const newColor = this.colorPalette.selectedColor;

         cell.style.backgroundColor = newColor;

         if (originalColor !== newColor) {
            console.log(`I am field ${row + 1}, ${column + 1} and I was just colored ${newColor}`);
         } else {
            console.log(`I am field ${row + 1}, ${column + 1} and I am ${originalColor}`);
         }
      });
   }
}