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
    speed,
    username,
    level
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
    this.username = String(username); // Username of who is using the gladiator
    this.focused = false; //Initialize the gladiators focus as false
    this.critic = false; //Initialize the crit as false. When hitting a crit, it will be turned to TRUE and then back to false by the battleground
    this.level = Number(level); //The gladiator starts being level 1 usually by default, unless created differently
    this.localvictories = 0; //The gladiator starts with zero victories by default
    this.onlineVictories = 0; //The gladiator starts with zero online victories by default
    this.totalVictories = 0; //The gladiator starts with zero total victories by default
    this.defeatedEnemies = []; //The gladiator has not defeated any other gladiator when it is created yet, later on we push gladiators into this  property
    this.diedAgainst = []; //When we lose combat, we can see who is the gladiator who killed us
    // Calculate and assign attributes based on methods
    this.id = this.generateGladiatorID(); // Unique Gladiator ID
    this.bodyURL = this.drawGladiatorBodyURL(); //Calls the method that assigns the matching body depending on the last digit of the Gladiator ID
    this.headURL = this.drawGladiatorHeadURL(); //Calls the method that assigns the matching head depending on the digit 5 + 6 of the Gladiator ID
    this.weaponURL = this.drawWeaponURL(); // Calls the method that returns the url of the weapons image
    this.bodySRC = this.drawGladiatorBodySRC(); //Calls the method that assigns the matching body depending on the last digit of the Gladiator ID
    this.headSRC = this.drawGladiatorHeadSRC(); //Calls the method that assigns the matching head depending on the digit 5 + 6 of the Gladiator ID
    this.weaponSRC = this.drawWeaponSRC(); // Calls the method that returns the url of the weapons image
    this.hp = this.calculateHP(); // Health Points
    this.maxHP = this.calculateMaxHP(); // Max HP, initially same as the HP
    this.strength = this.calculateStrength(); // Strength
    this.dexterity = this.calculateDexterity(); // Dexterity
    this.setUpCorrectLevel(); //When a new Gladiator is created, it runs the levelingUp method as many times as the level of the gladiator
  }

  showStats() {
    console.log("MAX HP: ", this.maxHP);
    console.log("HP: ", this.hp);
    console.log("Weapon: ", this.weapon);
    console.log("Height: ", this.height);
    console.log("Weight: ", this.weight);
    console.log("Speed: ", this.speed);
    console.log("Strenght: ", this.strength);
    console.log("Dexterity: ", this.dexterity);
    console.log("Constitution: ", this.constitution);
    console.log("Luck: ", this.luck);
  }

  setUpCorrectLevel() {
    if (this.username == "CPU") {
      //Sets up the correct stats of the gladiator when it is created
      for (let i = 1; i < this.level; i++) {
        this.levelingUpStats();
        console.log("Level " + (i + 1));
      }
    }
  }

  //Function that updates the stats upon the gladiators leveling up
  levelingUpStats() {
    let battlelog = document.getElementById("1" + "battleLog");
    battlelog.value =
      "New level achieved, increased stats based on the new gladiator's level \n" +
      battlelog.value;
    console.log("Leveling up Executed");
    console.log("Increased stats based on gladiators level");
    let hpModifier = randomiseNumber(110, 115); //The HP grows from a 10 to 15 % every time we level up
    let spdModifier = randomiseNumber(2, 6); //The Speed grows from 2 to 6 points every time we level up
    let strModifier = randomiseNumber(2, 6); //The strength grows from 2 to 6 points every time we level up
    let dexModifier = randomiseNumber(2, 6); //The dexterity grows from 2 to 6 points every time we level up
    let constModifier = randomiseNumber(2, 6); //The constitution grows from 2 to 6 points every time we level up
    let luckModifier = randomiseNumber(0, 7); //The luck gros from 0 (no growth) to 7 points every time we level up
    this.maxHP = Math.ceil((hpModifier * this.maxHP) / 100); //It grows the HP based on the HP modifier
    this.hp = this.maxHP; //Full HP when leveling up
    //Adds the modifiers to the attributes
    this.speed = this.speed + spdModifier;
    this.strength = this.strength + strModifier;
    this.dexterity = this.dexterity + dexModifier;
    this.constitution = this.constitution + constModifier;
    this.luck = this.luck + luckModifier;
  }

  //Healing due to defending function scaling with constitution and the gladiators level
  healDefending() {
    console.log("llamo a la funcion de heal");

    let focusmodifier = 1;
    if (this.focused) {
      focusmodifier = 2;
    } else if (this.focused == false) {
      focusmodifier = 1;
    }
    let heal = this.constitution * this.level * focusmodifier;

    this.hp = this.hp + heal;
    if (this.hp > this.maxHP) {
      this.hp = this.maxHP;
    }
    return heal;
  }

  //Damage Dealing Function
  dealDamage() {
    let modifier = 0; //variable that modifies the final damage depending on the equiped weapon
    let weaponDmg = 0; // depending on the weapon, is the calculated damage. as of right now, the dmg for both swords and bow is 10,15 ideally
    //in the future when having more weapons, different weapons could have different damage
    let critChance = this.luck; //The critical chance % by default is the characters luck. If the character is focused, then it i the luck*2
    let critChanceIndicator = 0; //Variable that will randomly be 0 to 100, if your crit chance is within that number, then we hit a critical hit

    let finalDmg = 0; // variable that will be returned by this method, returning the final dmg to be dealt
    if (this.weapon.toLowerCase() == "sword") {
      modifier = this.strength; //Sword scales with strength
      weaponDmg = randomiseNumber(10, 15);
    }
    if (this.weapon.toLowerCase() == "bow") {
      //Bow scales with dexterity
      modifier = this.dexterity;
      weaponDmg = randomiseNumber(10, 15);
    }

    //Check if it will be a critical hit
    if (this.focused == true) {
      critChance = critChance * 2; //Gives double crit change when the gladiator is focused
    }

    critChanceIndicator = randomiseNumber(0, 100);

    if (critChanceIndicator <= critChance) {
      //If the crit chance indicator (from 0 to 100) is equal or smaller than the crit chance, the final damage is times 1,5
      finalDmg = modifier + weaponDmg;
      finalDmg = finalDmg * 1.5;
      //And we indicate to our battlefield, that our character just hit a crit
      this.critic = true;
    } else {
      //Otherwise, if the number is bigger than our crit chance, then we hit "normal" damage
      finalDmg = modifier + weaponDmg;
      this.critic = false;
    }

    return finalDmg;
  }

  //Calculate Gladiator id
  generateGladiatorID() {
    //Generates a pretty much "unique" gladiator ID. If the 5th and 6th digit are >19, then it re-rolls again (only 20 heads avaiable, and 5+6 digits represent the head graphic)
    let gladiatorID = randomiseNumber(10000000, 99999999);

    while (Number(gladiatorID.toString().slice(4, 6)) >= 30) {
      //If the Head ID generated is 30 or more, then it generates new ones in a loop until one matches the wanted criteria
      gladiatorID = randomiseNumber(10000000, 99999999);

      if (Number(gladiatorID.toString().slice(4, 6)) <= 29) {
        //If the Head ID generated is between 00 and 29, then it keeps it and breaks the loop

        break;
      }
    }
    return Number(gladiatorID);
  }

  //Draw Weapon URL
  drawWeaponURL() {
    let wpn = String(this.weapon.toLowerCase());
    let weaponURL = ""; //Variable that will weapon the body graphic
    return (weaponURL = "url('img/weapons/" + wpn + ".png')");
  }

  // Draw Body URL
  drawGladiatorBodyURL() {
    let idToString = this.id.toString(); //Obtains the Gladiators ID and passes it to a string
    let idBody = idToString.slice(6, 7); //Last Digit of the Gladiator ID represents its body type (from 0 to 9, 10 options)
    let finalBody = ""; //Variable that will return the body graphic

    if (this.somatotype.toLowerCase() == "ectomorph") {
      return (finalBody = "url('img/bodies/ectomorph/" + idBody + ".png')");
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      return (finalBody = "url('img/bodies/mesomorph/" + idBody + ".png')");
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      return (finalBody = "url('img/bodies/endomorph/" + idBody + ".png')");
    }
  }
  //Draw Head URL
  drawGladiatorHeadURL() {
    let idToString = this.id.toString(); //Obtains the Gladiators ID and passes it to a string
    let idHead = idToString.slice(4, 6); //Digit 5 and 6 of the Gladiator ID represents its head type (from 0 to 19, 20 options)
    let finalHead = ""; //Variable that will return the head graphic
    return (finalHead = "url('img/heads/" + idHead + ".png')");
  }

  //Draw Weapon SRC
  drawWeaponSRC() {
    let wpn = String(this.weapon.toLowerCase());
    let weaponSRC = ""; //Variable that will weapon the body graphic
    return (weaponSRC = "img/weapons/" + wpn + ".png");
  }

  // Draw Body SRC
  drawGladiatorBodySRC() {
    let idToString = this.id.toString(); //Obtains the Gladiators ID and passes it to a string
    let idBody = idToString.slice(6, 7); //Last Digit of the Gladiator ID represents its body type (from 0 to 9, 10 options)
    let finalBody = ""; //Variable that will return the body graphic

    if (this.somatotype.toLowerCase() == "ectomorph") {
      return (finalBody = "img/bodies/ectomorph/" + idBody + ".png");
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      return (finalBody = "img/bodies/mesomorph/" + idBody + ".png");
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      return (finalBody = "img/bodies/endomorph/" + idBody + ".png");
    }
  }
  //Draw Head SRC
  drawGladiatorHeadSRC() {
    let idToString = this.id.toString(); //Obtains the Gladiators ID and passes it to a string
    let idHead = idToString.slice(4, 6); //Digit 5 and 6 of the Gladiator ID represents its head type (from 0 to 19, 20 options)
    let finalHead = ""; //Variable that will return the head graphic
    return (finalHead = "img/heads/" + idHead + ".png");
  }

  // Method to make the gladiato's lose HP due to potential damage
  sufferDmg(number) {
    this.hp = this.hp - number;
  }

  // Method to calculate the gladiator's HP
  calculateHP() {
    let hp = 0;
    hp = (randomiseNumber(6, 11) * this.constitution) / 1.5; // HP is based on constitution
    hp = Math.floor(hp);
    return hp;
  }

  // Method to calculate the gladiator's maximum HP
  calculateMaxHP() {
    // Set maxHP to be the same as hp for now
    return this.hp; // Return the value, don’t set it directly
  }

  // Method to calculate the gladiator's strength
  calculateStrength() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = -1; // Ectomorphs have a lower strength modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a standard strength modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = 3; // Endomorphs have a higher strength modifier
    }

    // Calculate strength
    return Math.ceil(
      randomiseNumber(13, 18) +
        (this.weight / this.height) * randomiseNumber(2, 5) +
        bodyTypeModifier
    );
  }

  // Method to calculate the gladiator's dexterity
  calculateDexterity() {
    let bodyTypeModifier = 0; // Initialize body type modifier

    // Determine the body type modifier based on somatotype
    if (this.somatotype.toLowerCase() == "ectomorph") {
      bodyTypeModifier = 3; // Ectomorphs have a higher dexterity modifier
    } else if (this.somatotype.toLowerCase() == "mesomorph") {
      bodyTypeModifier = 1; // Mesomorphs have a standard dexterity modifier
    } else if (this.somatotype.toLowerCase() == "endomorph") {
      bodyTypeModifier = -1; // Endomorphs have a lower dexterity modifier
    }

    // Calculate dexterity
    return Math.ceil(
      randomiseNumber(13, 18) +
        (this.weight / this.height) * randomiseNumber(2, 5) +
        bodyTypeModifier
    );
  }
}
