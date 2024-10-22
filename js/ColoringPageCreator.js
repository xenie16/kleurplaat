"use strict";

import { ColoringGrid } from "./ColoringGrid.js";
import { ColorPalette } from "./ColorPalette.js";
import { Settings } from "./Settings.js";


export class ColoringPageCreator {
   constructor(config) {
      this.validateConfig(config);
      this.initialState(config.initialState);
      this.initializeElements(config.coloringTableBody, config.colorsTableBody);
      this.initializeComponents();
      this.bindEventListeners();
   }

   // Initialization methods
   validateConfig(config) {
      const requiredProperties = ['coloringTableBody', 'colorsTableBody', 'initialState'];
      const missing = requiredProperties.filter(prop => !config[prop]);

      if (missing.length) {
         throw new Error(`Missing required properties: ${missing.join(', ')}`);
      }

      const requiredState = ['rows', 'columns', 'colors'];
      const missingState = requiredState.filter(prop => !config.initialState[prop]);

      if (missingState.length) {
         throw new Error(`Missing required state properties: ${missingState.join(', ')}`);
      }
   }

   initialState({ rows, columns, colors }) {
      this.state = {
         rows,
         columns,
         colors: [...colors],
         resetColor: colors[0],
      };
   }

   initializeElements(coloringTableBody, colorsTableBody) {
      this.elements = {
         coloringTableBody: document.getElementById(coloringTableBody),
         colorsTableBody: document.getElementById(colorsTableBody),
         saveButton: document.getElementById("saveButton"),
         loadButton: document.getElementById("loadButton"),
         resetButton: document.getElementById("resetButton"),
      };

      for (const [key, element] of Object.entries(this.elements)) {
         if (!element) {
            throw new Error(`Missing element: ${key}`);
         }
      }
   }

   initializeComponents() {
      this.settings = new Settings();
      this.colorPalette = new ColorPalette({
         table: this.elements.colorsTableBody,
         rows: 1,
         columns: this.state.colors.length,
         colors: this.state.colors,
      });

      this.createColoringGrid();
   }

   createColoringGrid() {
      this.coloringGrid = new ColoringGrid({
         table: this.elements.coloringTableBody,
         rows: this.state.rows,
         columns: this.state.columns,
         colors: this.state.colors,
         colorPalette: this.colorPalette,
      });
   }

   bindEventListeners() {
      this.settings.getGenerateButton().addEventListener("click", () => this.handleGenerateClick());
      this.elements.saveButton.addEventListener("click", () => this.handleSave());
      this.elements.loadButton.addEventListener("click", () => this.handleLoad());
      this.elements.resetButton.addEventListener("click", () => this.handleReset());
   }

   // Event handlers
   handleGenerateClick() {
      const newRows = this.settings.getRows();
      const newColumns = this.settings.getColumns();

      if (newRows && newColumns) {
         this.updateGrid(newRows, newColumns);
      }

      this.settings.toggleSettings();
   }

   handleReset() {
      this.resetGrid(this.state.resetColor);
   }

   handleSave() {
      const gridData = this.serializeGridData();
      this.downloadJSON(gridData, "drawing.json");
   }

   handleLoad() {
      this.createFileInput().click();
   }

   // Grid operations
   updateGrid(newRows, newColumns) {
      this.state.rows = newRows;
      this.state.columns = newColumns;
      this.elements.coloringTableBody.innerHTML = "";

      this.createColoringGrid();
   }

   resetGrid(resetColor = this.state.colors[0]) {
      for (let i = 0; i < this.state.rows; i++) {
         for (let j = 0; j < this.state.columns; j++) {
            const cell = this.elements.coloringTableBody.children[i].children[j];
            cell.style.backgroundColor = resetColor;
         }
      }
   }

   // Data operations
   serializeGridData() {
      const bodyRows = this.elements.coloringTableBody.children;
      return Array.from(bodyRows).map(row =>
         Array.from(row.children).map(cell => cell.style.backgroundColor)
      )
   }

   downloadJSON(data, filename) {
      const json = JSON.stringify(data);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
   }

   createFileInput() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "aplication/json";
      input.addEventListener("change", () => {
         this.handleFileSelect(input)
      });

      return input;
   }

   async handleFileSelect(input) {
      const file = input.files[0];
      if (!file) {
         return;
      }

      try {
         const content = await this.readFile(file);
         const gridData = JSON.parse(content);
         this.loadGridData(gridData);
      } catch (error) {
         console.error('Error loading file', error);
      }
   }

   readFile(file) {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = reject;
         reader.readAsText(file);
      });
   }

   loadGridData(gridData) {
      this.state.rows = gridData.length;
      this.state.columns = gridData[0].length;

      this.elements.coloringTableBody.innerHTML = "";

      this.createColoringGrid();

      gridData.forEach((row, i) => {
         row.forEach((color, j) => {
            const cell = this.elements.coloringTableBody.children[i].children[j];
            cell.style.backgroundColor = color;
         });
      });
   }
}