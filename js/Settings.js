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



// // main.js

// document.addEventListener('DOMContentLoaded', function () {
//    const generateButton = document.getElementById('generateButton');
//    const coloringTableBody = document.getElementById('coloringTableBody');
//    const rowInput = document.getElementById('rowInput');
//    const colInput = document.getElementById('colInput');
//    const settingsIcon = document.getElementById('settingsIcon');
//    const settingsContainer = document.getElementById('settingsContainer');

//    // Event listener for the cogwheel icon to toggle the visibility of the settings container
//    settingsIcon.addEventListener('click', function () {
//       if (settingsContainer.style.display === 'none' || settingsContainer.style.display === '') {
//          settingsContainer.style.display = 'block'; // Show settings
//       } else {
//          settingsContainer.style.display = 'none'; // Hide settings
//       }
//    });

//    // Generate table based on user input
//    generateButton.addEventListener('click', function () {
//       const numRows = parseInt(rowInput.value);
//       const numCols = parseInt(colInput.value);
//       generateTable(numRows, numCols);
//    });

//    function generateTable(rows, cols) {
//       // Clear the existing table
//       coloringTableBody.innerHTML = '';

//       // Create new rows and columns
//       for (let i = 0; i < rows; i++) {
//          const row = document.createElement('tr');
//          for (let j = 0; j < cols; j++) {
//             const cell = document.createElement('td');
//             cell.textContent = `${i + 1},${j + 1}`;
//             row.appendChild(cell);
//          }
//          coloringTableBody.appendChild(row);
//       }
//    }

//    // Initial table generation
//    generateTable(5, 5);
// });
