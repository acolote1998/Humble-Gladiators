// Define the Gladiator class
class Gladiator {
  // Constructor to initialize the Gladiator's properties
  constructor(
    name, // Name of the gladiator
    height, // Height in cm
    weight, // Weight in kg
    somatotype, // Body type (e.g., ectomorph, mesomorph, endomorph)
    weapon, // Weapon used by the gladiator
    constitution, // Constitution attribute
    luck, // Luck attribute
    speed // Speed attribute
  ) {
    // Initialize instance properties
    this.name = String(name); // Convert name to string
    this.height = Number(height); // Convert height to number
    this.weight = Number(weight); // Convert weight to number
    this.somatotype = String(somatotype); // Convert somatotype to string
    this.weapon = String(weapon); // Convert weapon to string
    this.constitution = Number(constitution); // Convert constitution to number
    this.luck = Number(luck); // Convert luck to number
    this.speed = Number(speed); // Convert speed to number

    // Calculate and assign attributes based on methods
    this.hp = this.calculateHP(); // HP calculation is not yet implemented
    this.strenght = this.calculateStrength(); // Calculate strength
    this.dexterity = this.calculateDexterity(); // Calculate dexterity
  }

  // Method to calculate the gladiator's HP
  calculateHP() {
    return (
      Math.floor(Math.random() * (18 - 13 + 1)) + // Random HP modifier value between 13 and 18
      13 * this.constitution // Multiplied by the users random rolled constitution
    );
  }

  // Method to calculate the gladiator's strength
  calculateStrength() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = 0.6; // Ectomorphs have a lower strength modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a neutral strength modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = 1.4; // Endomorphs have a higher strength modifier
    }

    // Calculate and return the strength
    return Math.ceil(
      Math.floor(Math.random() * (18 - 13 + 1)) + // Random value between 13 and 18
        13 + // Add minimum value to ensure range starts from 13
        this.weight / this.height + // Add weight-to-height ratio
        bodyTypeModifier // Add body type modifier
    );
  }

  // Method to calculate the gladiator's dexterity
  calculateDexterity() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = 1.4; // Ectomorphs have a higher dexterity modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a neutral dexterity modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = 0.6; // Endomorphs have a lower dexterity modifier
    }

    // Calculate and return the dexterity
    return Math.ceil(
      Math.floor(Math.random() * (18 - 13 + 1)) + // Random value between 13 and 18
        13 + // Add minimum value to ensure range starts from 13
        this.weight / this.height + // Add weight-to-height ratio
        bodyTypeModifier // Add body type modifier
    );
  }
}

var randomiserDice = document.querySelectorAll(".randomizerDie");

randomiserDice.forEach(addEventListenerRandomizer);

function addEventListenerRandomizer(element) {
  element.addEventListener("click", randomizeStat);
}

function randomizeStat(event) {
  let textBoxStat = "";
  if (event.target.id == "heroHeightDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "height";
  } else if (event.target.id == "heroWeightDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "weight";
  } else if (event.target.id == "heroSomatotypeDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "somatotype";
  } else if (event.target.id == "heroWeaponDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "weapon";
  } else if (event.target.id == "heroConstitutionDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "constitution";
  } else if (event.target.id == "heroLuckDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "luck";
  } else if (event.target.id == "heroSpeedDie") {
    textBoxStat = document.getElementById(event.target.id.slice(0, -3));
    textBoxStat.value = "speed";
  }
}
