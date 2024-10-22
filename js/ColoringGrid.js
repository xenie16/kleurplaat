"use strict";

export class ColoringGrid {
   #table;
   #colorPalette;
   #gridState;
   #eventHandlers;

   constructor(config) {
      this.validateConfig(config);
      this.initializeState(config);
      this.initializeEventHandlers();
      this.createColoringGrid();
   }

   validateConfig({ table, rows, columns, colors, colorPalette }) {
      if (!table || !rows || !columns || !colors, !colorPalette) {
         throw new Error("Missing required configuration properties");
      }

      if (!Array.isArray(colors) || colors.length < 1) {
         throw new Error("Colors must be an array with at least one color");
      }
   }

   initializeState({ table, rows, columns, colors, colorPalette }) {
      this.#table = table;
      this.#colorPalette = colorPalette;
      this.#gridState = {
         rows,
         columns,
         colors: [...colors],
         defaultColor: colors[0],
      };
   }

   initializeEventHandlers() {
      this.#eventHandlers = {
         cellClick: this.handleCellClick.bind(this),
      };
   }

   createColoringGrid() {
      const { rows, columns, defaultColor } = this.#gridState;

      this.#table.style.setProperty("--columns", columns);

      for (let row = 0; row < rows; row++) {
         const newRow = document.createElement("tr");

         for (let column = 0; column < columns; column++) {
            const newCell = document.createElement("td");
            newCell.style.backgroundColor = defaultColor;

            newCell.dataset.row = row;
            newCell.dataset.column = column;

            newCell.addEventListener("click", this.#eventHandlers.cellClick);
            newRow.appendChild(newCell);
         }

         this.#table.appendChild(newRow);
      }
   }

   handleCellClick(event) {
      const cell = event.target;
      const row = parseInt(cell.dataset.row);
      const column = parseInt(cell.dataset.column);
      const originalColor = cell.style.backgroundColor;
      const newColor = this.#colorPalette.selectedColor;

      cell.style.backgroundColor = newColor;

      if (originalColor !== newColor) {
         console.log(`I am field ${row + 1}, ${column + 1} and I was just colored ${newColor}`);
      } else {
         console.log(`I am field ${row + 1}, ${column + 1} and I am ${originalColor}`);
      }

   }
}