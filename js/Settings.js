"use strict";

export class Settings {
   constructor() {
      this.generateButton = document.getElementById("generateButton");
      this.rowInput = document.getElementById("rowInput");
      this.colInput = document.getElementById("colInput");

      this.settingsIcon = document.getElementById("settingsIcon");
      this.settingsContainer = document.getElementById("settingsContainer");

      this.settingsIcon.addEventListener("click", () => {
         this.toggleSettings();
      });
   }

   getRows() {
      return this.rowInput.value;
   }

   getColumns() {
      return this.colInput.value;
   }

   toggleSettings() {
      if (this.settingsContainer.style.display === "none" || this.settingsContainer.style.display === "") {
         this.settingsContainer.style.display = "block";
      } else {
         this.settingsContainer.style.display = "none";
      }
   }
}