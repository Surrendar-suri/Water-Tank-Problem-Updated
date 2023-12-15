document.addEventListener("DOMContentLoaded", function () {
  const inputBlocksInput = document.getElementById("inputBlocksInput");
  const waterTankTable = document.getElementById("water-tank");

  function calculateWaterUnits(blocks) {
    let totalUnits = 0;
    let leftMax = 0;
    let rightMax = 0;

    // maximum height of the blocks
    const maxBlockHeight = Math.max(...blocks);

    for (let col = 0; col < blocks.length; col++) {
      leftMax = Math.max(leftMax, blocks[col]);
      rightMax = Math.max(...blocks.slice(col + 1));
      const minHeight = Math.min(leftMax, rightMax);
      const waterUnits = minHeight > blocks[col] ? minHeight - blocks[col] : 0;
      totalUnits += waterUnits;

      for (let row = 0; row < maxBlockHeight; row++) {
        if (!waterTankTable.rows[row]) {
          waterTankTable.insertRow(row);
        }
        const cell = waterTankTable.rows[row].insertCell(col);
        if (row >= maxBlockHeight - blocks[col]) {
          cell.textContent = '';
          cell.classList.add("input-block");
        }
        else if (row >= maxBlockHeight - (blocks[col] + waterUnits)) {
          cell.textContent = '';
          cell.classList.add("output-block");
        }
        else {
          cell.textContent = '';
        }
      }
    }
    return totalUnits;
  }

  function updateWaterTank() {
    const userInput = inputBlocksInput.value.trim();
    const inputBlocks = userInput.split(',').map(Number);

    // Clear previous water tank visualization
    while (waterTankTable.rows.length > 0) {
      waterTankTable.deleteRow(0);
    }

    const units = calculateWaterUnits(inputBlocks);
    const outputResult = document.getElementById('totalUnits');
    outputResult.textContent = `Total Water: ${units} Units`;
  }

  // submit button to recalculate
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", updateWaterTank);

  // Default input
  const defaultInput = [5, 4, 3, 2, 1, 2, 3, 4, 5];
  inputBlocksInput.value = defaultInput.join(',');
  updateWaterTank();
});
