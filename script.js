// ---------------------------
// Event Listeners
// ---------------------------

// Attach event listener to the "Forge Gladiator" button
var btnForgeGladiator = document.getElementById("btnForgeGladiator");
btnForgeGladiator.addEventListener("click", forgeHeroGladiator);

// Query for all randomizer dice elements
var randomiserDice = document.querySelectorAll(".randomizerDie");

// Add event listeners to all randomizer dice
randomiserDice.forEach(addEventListenerRandomizer);

// ---------------------------
// Variables
// ---------------------------

// Variables for randomizer states
var isHeightGenerated = false; // Tracks if height has been generated
var isWeightGenerated = false; // Tracks if weight has been generated
var isSomatotypeGenerated = false; // Tracks if somatotype has been generated
var isWeaponGenerated = false; // Tracks if weapon has been generated
var isConstitutionGenerated = false; // Tracks if constitution has been generated
var isLuckGenerated = false; // Tracks if luck has been generated
var isSpeedGenerated = false; // Tracks if speed has been generated
var amountRandomiserDiceLeft = 3; // Number of dice available

// Array to store gladiators
var gladiators = []; // List of created gladiators

// ---------------------------
// Functions
// ---------------------------

// Function to draw the gladiator on the HTML page based on height and weight
function drawHero() {
  let bodyHTMLStyle = document.getElementById("heroBody").style;
  let headHTMLStyle = document.getElementById("heroFace").style;

  // Set dimensions for the body and head based on the gladiator's height and weight
  bodyHTMLStyle.height = gladiators[0].height * 2 + "px"; // Body height
  bodyHTMLStyle.width = gladiators[0].weight * 2 + "px"; // Body width

  headHTMLStyle.width = bodyHTMLStyle.width; // Match head width to body width
  headHTMLStyle.height = ((15 * gladiators[0].height) / 90) * 3 + "px"; // Adjust head height based on body height

  // Set background image based on the gladiator's somatotype
  if (gladiators[0].somatotype.toLowerCase() == "endomorph") {
    bodyHTMLStyle.backgroundImage = "url('img/endomorph.png')";
  } else if (gladiators[0].somatotype.toLowerCase() == "ectomorph") {
    bodyHTMLStyle.backgroundImage = "url('img/ectomorph.png')";
  } else if (gladiators[0].somatotype.toLowerCase() == "mesomorph") {
    bodyHTMLStyle.backgroundImage = "url('img/mesomorph.png')";
  }

  // Set a default background image for the head
  headHTMLStyle.backgroundImage = "url('img/head.png')";
}

// Function to add event listener to each randomizer die
function addEventListenerRandomizer(element) {
  element.addEventListener("click", randomizeStat); // Attach click event to randomize stats
}

// Function to forge a new gladiator and add them to the list
function forgeHeroGladiator() {
  // Retrieve values from input fields
  let gladiatorsName = document.getElementById("heroName").value;
  let gladiatorsHeight = document.getElementById("heroHeight").value;
  let gladiatorsWeight = document.getElementById("heroWeight").value;
  let gladiatorsSomatotype = document.getElementById("heroSomatotype").value;
  let gladiatorsWeapon = document.getElementById("heroWeapon").value;
  let gladiatorsConstitution =
    document.getElementById("heroConstitution").value;
  let gladiatorsLuck = document.getElementById("heroLuck").value;
  let gladiatorsSpeed = document.getElementById("heroSpeed").value;
  if (
    gladiatorsName != "" &&
    gladiatorsHeight != "" &&
    gladiatorsWeight != "" &&
    gladiatorsSomatotype != "" &&
    gladiatorsWeapon != "" &&
    gladiatorsConstitution != "" &&
    gladiatorsLuck != "" &&
    gladiatorsSpeed != ""
  ) {
    // Create a new Gladiator object
    var gladiatorObject = new Gladiator(
      gladiatorsName,
      gladiatorsHeight,
      gladiatorsWeight,
      gladiatorsSomatotype,
      gladiatorsWeapon,
      gladiatorsConstitution,
      gladiatorsLuck,
      gladiatorsSpeed
    );

    // Add the new gladiator to the array
    gladiators.push(gladiatorObject);

    // Update the HTML with the new gladiator's attributes
    document.getElementById("heroStrength").value = String(
      gladiatorObject.strength
    );
    document.getElementById("heroDexterity").value = String(
      gladiatorObject.dexterity
    );
    document.getElementById("heroHP").value = String(gladiatorObject.hp);

    // Draw the gladiator on the HTML page
    drawHero();
  } else {
    alert("Please generate all the attributes before forging the gladiator.");
  }
}

// Function to validate and update the state of randomizing dice
function validatingRandomisingDice() {
  let result = false;
  // Check if there are any dice left to use
  if (amountRandomiserDiceLeft >= 1) {
    amountRandomiserDiceLeft -= 1; // Decrement the number of dice left
    // console.log("One die consumed");
    // console.log("Dice left: " + amountRandomiserDiceLeft);
    result = true;
  } else {
    // console.log("Out of dice");
    result = false;
  }
  // Update the UI based on the remaining dice
  updateDiceUI();
  return result;
}

// Function to update the UI for randomizer dice based on the remaining dice
function updateDiceUI() {
  let die1 = document.getElementById("extraDie1");
  let die2 = document.getElementById("extraDie2");
  let die3 = document.getElementById("extraDie3");

  // Update dice classes based on the number of dice left
  if (amountRandomiserDiceLeft == 3) {
    die1.classList.add("extraDie");
    die2.classList.add("extraDie");
    die3.classList.add("extraDie");
  } else if (amountRandomiserDiceLeft == 2) {
    die1.classList.add("extraDie");
    die2.classList.add("extraDie");
    die3.classList.remove("extraDie");
    die3.classList.add("outExtraDie");
  } else if (amountRandomiserDiceLeft == 1) {
    die1.classList.add("extraDie");
    die2.classList.remove("extraDie");
    die2.classList.add("outExtraDie");
    die3.classList.remove("extraDie");
    die3.classList.add("outExtraDie");
  } else if (amountRandomiserDiceLeft == 0) {
    die1.classList.remove("extraDie");
    die1.classList.add("outExtraDie");
    die2.classList.remove("extraDie");
    die2.classList.add("outExtraDie");
    die3.classList.remove("extraDie");
    die3.classList.add("outExtraDie");
  }
}

// Function to generate a random number between min and max (inclusive)
function randomiseNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to calculate hero Weapon, with randomization and dice validation
function calculateHeroWeapon(number) {
  let weapon = document.getElementById("heroWeapon").value;
  // Generate random Weapon if not already generated or if dice are available
  if (isWeaponGenerated == false) {
    // Map number to Weapon
    if (number == 1) {
      weapon = "Sword";
    } else if (number == 2) {
      weapon = "Bow";
    }
    isWeaponGenerated = true;
  } else {
    if (isWeaponGenerated && validatingRandomisingDice()) {
      // Map number to Weapon
      // Map number to weapon
      if (number == 1) {
        weapon = "Sword";
      } else if (number == 2) {
        weapon = "Bow";
      }
    }
  }
  return weapon;
}

// Function to calculate hero height, with randomization and dice validation
function calculateHeroHeight() {
  let height = document.getElementById("heroHeight").value;
  // Generate random height if not already generated or if dice are available
  if (isHeightGenerated == false) {
    height = randomiseNumber(100, 210);
    isHeightGenerated = true;
  } else {
    if (isHeightGenerated && validatingRandomisingDice()) {
      height = randomiseNumber(100, 210);
    }
  }
  return height;
}

// Function to calculate hero Weight, with randomization and dice validation
function calculateHeroWeight() {
  let Weight = document.getElementById("heroWeight").value;
  // Generate random Weight if not already generated or if dice are available
  if (isWeightGenerated == false) {
    Weight = randomiseNumber(50, 140); //Generate a random weight between 50 and 140 kg
    isWeightGenerated = true;
  } else {
    if (isWeightGenerated && validatingRandomisingDice()) {
      Weight = randomiseNumber(50, 140); //Generate a random weight between 50 and 140 kg
    }
  }
  return Weight;
}

// Function to calculate hero Constitution, with randomization and dice validation
function calculateHeroConstitution() {
  let Constitution = document.getElementById("heroConstitution").value;
  // Generate random Constitution if not already generated or if dice are available
  if (isConstitutionGenerated == false) {
    Constitution = randomiseNumber(12, 18); //Generate a random Constitution between 12 and 18
    isConstitutionGenerated = true;
  } else {
    if (isConstitutionGenerated && validatingRandomisingDice()) {
      Constitution = randomiseNumber(12, 18); //Generate a random Constitution between 12 and 18
    }
  }
  return Constitution;
}

// Function to calculate hero Luck, with randomization and dice validation
function calculateHeroLuck() {
  let Luck = document.getElementById("heroLuck").value; // Get the initial Luck value from the HTML element with id "heroLuck"
  let extraLuck = 1; // Initialize extraLuck to control the luck increment process
  let extraLuckModifier = 1; // Initialize extraLuckModifier to determine how much extra luck to add each iteration

  // Generate random Luck if not already generated or if dice are available
  if (isLuckGenerated == false) {
    // Generate a random Luck between 12 and 18
    // Then there is a 50% chance of getting extra luck points, and 50% chance of keeping the initial luck
    Luck = randomiseNumber(12, 18);
    while (extraLuck == 1) {
      // Continue to add extra luck while extraLuck is 1 (indicating a 50% chance)
      Luck = Luck + extraLuckModifier; // Increment Luck by the current value of extraLuckModifier
      extraLuckModifier = extraLuckModifier + 1; // Increment the extraLuckModifier for the next potential iteration
      extraLuck = randomiseNumber(0, 1); // Randomly set extraLuck to either 0 or 1, simulating a 50% chance

      if (extraLuck == 0) {
        // If extraLuck is 0, break out of the loop
        break;
      }
    }
    isLuckGenerated = true; // Mark that Luck has been generated to prevent re-generation
  } else {
    // If Luck is already generated and dice validation passes, re-generate Luck
    if (isLuckGenerated && validatingRandomisingDice()) {
      // Generate a random Luck between 12 and 18
      // Then there is a 50% chance of getting extra luck points, and 50% chance of keeping the initial luck
      Luck = randomiseNumber(12, 18);
      while (extraLuck == 1) {
        // Continue to add extra luck while extraLuck is 1 (indicating a 50% chance)
        Luck = Luck + extraLuckModifier; // Increment Luck by the current value of extraLuckModifier
        extraLuckModifier = extraLuckModifier + 1; // Increment the extraLuckModifier for the next potential iteration
        extraLuck = randomiseNumber(0, 1); // Randomly set extraLuck to either 0 or 1, simulating a 50% chance

        if (extraLuck == 0) {
          // If extraLuck is 0, break out of the loop
          break;
        }
      }
    }
  }
  return Luck; // Return the final calculated Luck value
}

// Function to calculate hero Speed, with randomization and dice validation
function calculateHeroSpeed() {
  let somatotypeSpeedModifier = 0;
  if (
    document.getElementById("heroSomatotype").value.toLowerCase() == "endomorph"
  ) {
    //if the gladiator is endomorph, will be slower, -1 speed
    somatotypeSpeedModifier = 0;
  } else if (
    document.getElementById("heroSomatotype").value.toLowerCase() == "mesomorph" //if the gladiator is mesomorph, will be "normal", no speed modification
  ) {
    somatotypeSpeedModifier = 0;
  } else if (
    document.getElementById("heroSomatotype").value.toLowerCase() == "ectomorph" //if the gladiator is ectomorph, will be faster, +1 speed
  ) {
    somatotypeSpeedModifier = 1;
  }
  let Speed = document.getElementById("heroSpeed").value;
  // Generate random Speed if not already generated or if dice are available
  if (isSpeedGenerated == false) {
    Speed = randomiseNumber(12, 18) + somatotypeSpeedModifier; //Generate a random Speed between 12 and 18 and adds the body type speed modifier to it
    isSpeedGenerated = true;
  } else {
    if (isSpeedGenerated && validatingRandomisingDice()) {
      Speed = randomiseNumber(12, 18) + somatotypeSpeedModifier; //Generate a random Speed between 12 and 18 and adds the body type speed modifier to it
    }
  }
  return Speed;
}

// Function to calculate hero Somatotype, with randomization and dice validation
function calculateHeroSomatotype(number) {
  let somatotype = document.getElementById("heroSomatotype").value;
  // Generate random Somatotype if not already generated or if dice are available
  if (isSomatotypeGenerated == false) {
    // Map number to somatotype
    if (number == 1) {
      somatotype = "Ectomorph";
    } else if (number == 2) {
      somatotype = "Mesomorph";
    } else if (number == 3) {
      somatotype = "Endomorph";
    }
    isSomatotypeGenerated = true;
  } else {
    if (isSomatotypeGenerated && validatingRandomisingDice()) {
      // Map number to somatotype
      if (number == 1) {
        somatotype = "Ectomorph";
      } else if (number == 2) {
        somatotype = "Mesomorph";
      } else if (number == 3) {
        somatotype = "Endomorph";
      }
    }
  }
  return somatotype;
}

// Function to randomize stat based on the clicked element
function randomizeStat(event) {
  let textBoxStat = "";
  // Determine which stat to randomize based on the clicked element
  if (event.target.id == "heroHeightDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroHeight(); // Generates a random height between 100cm and 210cm
  } else if (event.target.id == "heroWeightDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroWeight(); // Generates a random weight between 50 and 140 kg
  } else if (event.target.id == "heroSomatotypeDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroSomatotype(randomiseNumber(1, 3)); // Randomize somatotype
  } else if (event.target.id == "heroWeaponDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroWeapon(randomiseNumber(1, 2)); // Randomize weapon
  } else if (event.target.id == "heroConstitutionDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroConstitution(); // Randomize constitution
  } else if (event.target.id == "heroLuckDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroLuck(); // Randomize luck
  } else if (event.target.id == "heroSpeedDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = calculateHeroSpeed(0); // Randomize speed, we are passing the main gladiator as parameter (0 is main hero)
  }
}

// ---------------------------
// Gladiator Class
// ---------------------------

// Define the Gladiator class
class Gladiator {
  // Constructor to initialize the Gladiator's properties
  constructor(
    name,
    height,
    weight,
    somatotype,
    weapon,
    constitution,
    luck,
    speed
  ) {
    // Initialize instance properties
    this.name = String(name); // Name of the gladiator
    this.height = Number(height); // Height of the gladiator
    this.weight = Number(weight); // Weight of the gladiator
    this.somatotype = String(somatotype); // Somatotype of the gladiator
    this.weapon = String(weapon); // Weapon of the gladiator
    this.constitution = Number(constitution); // Constitution of the gladiator
    this.luck = Number(luck); // Luck of the gladiator
    this.speed = Number(speed); // Speed of the gladiator

    // Calculate and assign attributes based on methods
    this.hp = this.calculateHP(); // Health Points
    this.strength = this.calculateStrength(); // Strength
    this.dexterity = this.calculateDexterity(); // Dexterity
  }

  // Method to calculate the gladiator's HP
  calculateHP() {
    return randomiseNumber(13, 18) * this.constitution; // HP is based on constitution
  }

  // Method to calculate the gladiator's strength
  calculateStrength() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = 0.6; // Ectomorphs have a lower strength modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a standard strength modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = 1.4; // Endomorphs have a higher strength modifier
    }

    // Calculate strength
    return Math.ceil(
      randomiseNumber(13, 18) + this.weight / this.height + bodyTypeModifier
    );
  }

  // Method to calculate the gladiator's dexterity
  calculateDexterity() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = 1.4; // Ectomorphs have a higher dexterity modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a standard dexterity modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = 0.6; // Endomorphs have a lower dexterity modifier
    }

    // Calculate dexterity
    return Math.ceil(
      randomiseNumber(13, 18) + this.weight / this.height + bodyTypeModifier
    );
  }
}
