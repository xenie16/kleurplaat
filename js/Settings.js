"use strict";

export class Settings {

   #elements;

   constructor() {
      this.initializeElements();
      this.bindEvents();
   }

   initializeElements() {
      this.#elements = {
         generateButton: document.getElementById("generateButton"),
         rowInput: document.getElementById("rowInput"),
         colInput: document.getElementById("colInput"),

         settingsIcon: document.getElementById("settingsIcon"),
         settingsContainer: document.getElementById("settingsContainer"),
      }
   }

   bindEvents() {
      this.#elements.settingsIcon.addEventListener("click", () => this.toggleSettings());

      this.#elements.rowInput.addEventListener("input", (event) => this.validateNumericInput(event));

      this.#elements.colInput.addEventListener("input", (event) => this.validateNumericInput(event));

   }

   validateNumericInput(event) {
      const input = event.target;
      const value = input.value.replace(/[^0-9]/g, '');
      const numValue = parseInt(value);

      if (numValue > 30) {
         input.value = 30;
      } else if (numValue < 1) {
         input.value = 1;
      } else {
         input.value = numValue;
      }
   }

   toggleSettings() {
      const isHidden =
         this.#elements.settingsContainer.style.display === "none" ||
         this.#elements.settingsContainer.style.display === "";

      this.#elements.settingsContainer.style.display = isHidden ? "block" : "none";
   }

   getRows() {
      return this.#elements.rowInput.value;
   }

   getColumns() {
      return this.#elements.colInput.value;
   }

   getGenerateButton() {
      return this.#elements.generateButton;
   }
}