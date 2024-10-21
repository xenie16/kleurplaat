"use strict";

export class ColorPalette {

   constructor({ table, rows, columns, colors }) {
      this.table = table;
      this.rows = rows;
      this.columns = columns;
      this.colors = colors;

      this.selectedColor = colors[0];

      this.setupTable(
         {
            table: this.table,
            rows: this.rows,
            columns: this.columns,
            colors: this.colors
         }
      );
   }

   setupTable({ table, rows, columns, colors }) {
      for (let i = 0; i < rows; i++) {
         const newRow = document.createElement("tr");
         for (let j = 0; j < columns; j++) {
            const newCell = document.createElement("td");
            newCell.style.backgroundColor = colors[j];
            this.handleColorCellClick(newCell, colors[j]);
            newRow.appendChild(newCell);
         }
         table.appendChild(newRow);
      }
   }

   handleColorCellClick(cell, color) {
      cell.addEventListener("click", () => {
         this.selectedColor = color;
      });
   }
}