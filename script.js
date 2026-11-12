// Assignment 1: Blacksmith — The Tiny Forge

// PLAN: Write a short pseudocode plan for making a sword here.
// 1. Check if the forge heat is at 30 or higher.
// 2. If yes: decrease heat by 30, increment sword count by 1, and print a success message.
// 3. If no: keep heat and sword count as they are, and print a warning message.
// 4. Update the page to show the current numbers, status text, image, and style.

// 1. selectin the forge, heat, sword count, status, image, and message elements.
const forgeElement = document.getElementById("forge");
const heatValueElement = document.getElementById("heat-value");
const swordCountElement = document.getElementById("sword-count");
const forgeStatusElement = document.getElementById("forge-status");
const forgeImageElement = document.getElementById("forge-image");
const actionMessageElement = document.getElementById("action-message");

// 2. creating the two state variables: heat and swords made.
let forgeHeat = 20;
let swordsMade = 0;

// 3. writes getForgeStatus(heatValue). Return the correct status string.
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}

// 4. write updateForge(). update text and apply one status class.
//    Change the supplied forge image src and alt to match the heat.
//    Keep the most recent action message visible.
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

// 5. writing resetForge(). Restore the state, message, and display.
function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;
  actionMessageElement.textContent = "Welcome to the forge. Add heat to begin.";
  updateForge();
}

// 6. write heatForge(amount). add heat, cap it, and update the page.
function heatForge(amount) {
  forgeHeat += amount;
  if (forgeHeat > 100) {
    forgeHeat = 100;
  }
  actionMessageElement.textContent = `Heating complete. The forge is at ${forgeHeat} heat.`;
  updateForge();
}

// 7. write makeSword(). Handle both success and insufficient heat.
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

// 8. call resetForge() once to start the game
resetForge();

//9. select DOM elements for forge status, stats, and feedback
const heatDisplay = document.querySelector("#heat-value"); // match your A1 ID
const swordsDisplay = document.querySelector("#swords-value"); // match your A1 ID
const statusText = document.querySelector("#forge-status"); // match your A1 ID
const forgeImage = document.querySelector("#forge-image"); // match your A1 ID
const feedbackEl = document.querySelector("#feedback-message");

//10. update displayed numbers, status text, single active status class, and image
function updateForge() {
  const status = getForgeStatus();
  heatDisplay.textContent = heat;
  swordsDisplay.textContent = swordsMade;
  statusText.textContent = status;
  // Clear old status classes so only one is active at a time
  statusText.classList.remove("too-cold", "ready-to-forge", "roaring-fire");

  if (heat < 30) {
    statusText.classList.add("too-cold");
    forgeImage.src = "images/forge-cold.png"; // match your A1 filename
    forgeImage.alt = "Cold blacksmith forge";
  } else if (heat < 70) {
    statusText.classList.add("ready-to-forge");
    forgeImage.src = "images/forge-ready.png"; // match your A1 filename
    forgeImage.alt = "Forge ready for crafting";
  } else {
    statusText.classList.add("roaring-fire");
    forgeImage.src = "images/forge-roaring.png"; // match your A1 filename
    forgeImage.alt = "Roaring hot blacksmith forge";
  }
}
// reset game state to 20 heat, 0 swords, and empty feedback log
function resetForge() {
  heat = 20;
  swordsMade = 0;
  feedbackEl.textContent = "";
  updateForge();
}

// select interactive controls
const heatForm = document.querySelector("#heat-form");
const heatInput = document.querySelector("#heat-input");

// plan: read heat input on submit -> validate positive whole number ->
// show error if invalid, otherwisew call heatForge(amount) and clear input
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
    feedbackEl.textContent = "Enter a positive whole number to add heat.";
    return;
  }

  heatForge(amount);
  heatInput.value = "";
});