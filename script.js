// Assignment 3: Interactive Blacksmith — the tiny forge

// 1. select the forge display, stats, image, and workshop log elements
const forgeElement = document.getElementById("forge");
const heatValueElement = document.getElementById("heat-value");
const swordCountElement = document.getElementById("sword-count");
const forgeStatusElement = document.getElementById("forge-status");
const forgeImageElement = document.getElementById("forge-image");
const actionMessageElement = document.getElementById("action-message");

// 2. select the interactive form, input, and buttons
const heatForm = document.getElementById("heat-form");
const heatInput = document.getElementById("heat-input");
const makeSwordBtn = document.getElementById("make-sword-btn");
const resetForgeBtn = document.getElementById("reset-forge-btn");

// 3. game state variables
let forgeHeat = 20;
let swordsMade = 0;

// 4. return the forge status string based on current heat
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}

// 5. update numbers, status text, single active status class, and forge image
function updateForge() {
  heatValueElement.textContent = forgeHeat;
  swordCountElement.textContent = swordsMade;

  const status = getForgeStatus(forgeHeat);
  forgeStatusElement.textContent = status;

  forgeElement.classList.remove("is-cold", "is-ready", "is-roaring");

  if (status === "Too cold") {
    forgeElement.classList.add("is-cold");
    forgeImageElement.src = "assets/forge-cold.svg";
    forgeImageElement.alt = "A stone forge with dark coals and no flames";
  } else if (status === "Ready to forge") {
    forgeElement.classList.add("is-ready");
    forgeImageElement.src = "assets/forge-ready.svg";
    forgeImageElement.alt = "A stone forge with a small orange fire";
  } else if (status === "Roaring fire") {
    forgeElement.classList.add("is-roaring");
    forgeImageElement.src = "assets/forge-roaring.svg";
    forgeImageElement.alt = "A stone forge with tall bright flames and sparks";
  }
}

// 6. reset state to 20 heat, 0 swords, empty input, and blank workshop log
function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;
  heatInput.value = "";
  actionMessageElement.textContent = "";
  updateForge();
}

// 7. add valid heat, cap at 100, and update the page
function heatForge(amount) {
  forgeHeat += amount;
  if (forgeHeat > 100) {
    forgeHeat = 100;
  }
  actionMessageElement.textContent = `Heating complete. The forge is at ${forgeHeat} heat.`;
  updateForge();
}

// 8. craft one sword if heat is at least 30, or show insufficient-heat message
// plan:
// - check if forgeheat is 30 or higher.
// - if yes: subtract 30 heat, add 1 sword, and show success message.
// - if no: leave numbers unchanged and show warning message.
// - update the page.
function makeSword() {
  if (forgeHeat >= 30) {
    forgeHeat -= 30;
    swordsMade += 1;
    actionMessageElement.textContent = "Clang! You successfully forged a new sword.";
  } else {
    actionMessageElement.textContent = "The forge is too cold to strike steel. Add more heat first.";
  }
  updateForge();
}

// 9. listen for add heat form submission
// plan:
// - prevent page reload.
// - read and trim the input value, convert to number.
// - reject empty string, non-finite numbers, decimals, and numbers <= 0.
// - show clear error message if invalid; otherwise call heatforge(amount) and clear input.
heatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const rawValue = heatInput.value.trim();
  const amount = Number(rawValue);

  if (
    rawValue === "" ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    actionMessageElement.textContent = "Enter a positive whole number to add heat.";
    return;
  }

  heatForge(amount);
  heatInput.value = "";
});

// 10. listen for make sword button click
// plan: call makesword() to attempt crafting one sword.
makeSwordBtn.addEventListener("click", function () {
  makeSword();
});

// 11. listen for reset forge button click
// plan: call resetforge() to restore starting values and clear input/log.
resetForgeBtn.addEventListener("click", function () {
  resetForge();
});

// 12. initialize starting state when the page loads
resetForge();