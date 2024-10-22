"use strict";

export class ColorPalette {

   #table
   #paletteState;
   #eventHandlers;

   constructor(config) {
      this.validateConfig(config);
      this.initializeState(config);
      this.initializeEventHandlers();
      this.createPalette();
   }

   validateConfig({ table, rows, columns, colors }) {
      if (!table || !rows || !columns || !colors) {
         throw new Error("Missing required configuration properties");
      }

      if (!Array.isArray(colors) || colors.length < 1) {
         throw new Error("Colors must be an array with at least one color");
      }
   }

   initializeState({ table, rows, columns, colors }) {
      this.#table = table;
      this.#paletteState = {
         rows,
         columns,
         colors: [...colors],
         selectedColor: colors[0],
      };
   }

   initializeEventHandlers() {
      this.#eventHandlers = {
         cellClick: this.handleColorCellClick.bind(this),
      };
   }

   createPalette() {
      for (let row = 0; row < this.#paletteState.rows; row++) {
         const newRow = document.createElement("tr");

         for (let column = 0; column < this.#paletteState.columns; column++) {
            const newCell = document.createElement("td");
            newCell.style.backgroundColor = this.#paletteState.colors[column];
            newCell.addEventListener("click", this.#eventHandlers.cellClick);
            newRow.appendChild(newCell);
         }

         this.#table.appendChild(newRow);
      }
   }

   handleColorCellClick(event) {
      const color = event.target.style.backgroundColor;
      this.#paletteState.selectedColor = color;
   }

   get selectedColor() {
      return this.#paletteState.selectedColor;
   }
}