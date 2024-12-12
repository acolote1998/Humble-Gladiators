// ---------------------------
// Variables
// ---------------------------
// Array to store random Names
var randomNames = [
  "Maximus",
  "Thrasher",
  "Valeria",
  "Gaius",
  "Brutus the Bold",
  "Ferox",
  "Decimus",
  "Vindex",
  "Imperator",
  "Cassius",
  "Silvanus",
  "Rex the Ruthless",
  "Vulcanus",
  "Dominus",
  "Severus",
  "Galba",
  "Bratenus",
  "Diminus",
  "Akinux",
  "Ezenar",
  "Josefus",
  "Pablon",
  "Rodricus",
  "Julios",
  "Misaro",
  "Miskar",
  "Angelica the Fierce",
  "Teresyara",
  "Yiyon",
  "Titan",
  "Magnus",
  "Merciless",
  "Claudius",
  "Furius",
  "Thorne",
  "Seraph",
  "Legion",
  "Nero",
  "Aurelia",
  "Taurus",
  "Lysander",
  "Dracon",
  "Ravager",
  "Scylla",
  "Orpheus",
  "Victor",
  "Ajax the Mighty",
  "Viridia",
  "Typhon",
  "Octavius",
  "Valkor",
  "Cassia",
  "Cerberus",
  "Marcus",
  "Tempest",
  "Helios",
  "Corvus",
  "Gladiatrix",
  "Vulcan",
  "Ursus",
  "Nyx",
  "Valeria the Vicious",
  "Crixus",
  "Leonidas",
  "Ignis",
  "Astra",
  "Spartacus",
  "Orion",
  "Brutus",
  "Juggernaut",
  "Minerva",
  "Phalanx",
  "Magnus the Unyielding",
  "Valkyrie",
  "Zeno",
  "Attila",
  "Ragnar",
  "Velox",
  "Theron",
  "Nemesis",
  "Perseus",
  "Falco",
  "Fenrir",
  "Cerelia",
  "Praetor",
  "Talon",
  "Bellator",
  "Vindictus",
  "Darius",
  "Krios",
  "Draven",
  "Aurelian",
  "Lupus",
  "Sable",
  "Magnus the Destroyer",
  "Ravonna",
  "Gorgon",
  "Bronn",
  "Valiant",
  "Tiberius",
];
var gameScenario = 1; //initializes a variable that indicates in which "level" or "scenario" the user is currently on

// Array to store gladiators
var gladiators = []; // List of created gladiators

// ---------------------------
// Functions
// ---------------------------

async function goingHome() {
  window.location.href = `home.html?id=${gladiators[0].id}&level=${gladiators[0].level}`; //goes to the home screen
}

async function goingPodium() {
  window.location.href = `podium.html?id=${gladiators[0].id}&level=${gladiators[0].level}`; //goes to the podium screen
}

function getHeroIDfromURL(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to generate a random number between min and max (inclusive)
function randomiseNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function that returns a random weapon
function generateARandomWeapon() {
  let randomIndex = randomiseNumber(1, 2);
  if (randomIndex == 1) {
    return "sword";
  } else if (randomIndex == 2) {
    return "bow";
  }
}

// Function to calculate a Gladiators Luck
function calculateRandomGladiatorsLuck() {
  let extraLuck = 1; // Initialize extraLuck to control the luck increment process
  let extraLuckModifier = 1; // Initialize extraLuckModifier to determine how much extra luck to add each iteration

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
  return Luck; // Return the final calculated Luck value
}

// Function to calculate a Gladiators Speed
function calculateGladiatorsSpeed(somatotypeGenerated) {
  let somatotypeSpeedModifier = 0;
  if (somatotypeGenerated == "endomorph") {
    //if the gladiator is endomorph, will be slower, -1 speed
    somatotypeSpeedModifier = -1;
  } else if (
    somatotypeGenerated == "mesomorph" //if the gladiator is mesomorph, will be "normal", no speed modification
  ) {
    somatotypeSpeedModifier = 0;
  } else if (
    somatotypeGenerated == "ectomorph" //if the gladiator is ectomorph, will be faster, +1 speed
  ) {
    somatotypeSpeedModifier = 1;
  }
  let Speed = 0;
  Speed = randomiseNumber(12, 18) + somatotypeSpeedModifier; //Generate a random Speed between 12 and 18 and adds the body type speed modifier to it

  return Speed;
}

//Adds delay in MS
function addingDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Gives the "Loading Effect"
async function loadingEffect(color, howlong) {
  document.querySelector("body").style.backgroundColor = color;
  document.querySelector("body").style.cursor = "wait";
  await addingDelay(howlong);
  document.querySelector("body").style.backgroundColor = "white";
  document.querySelector("body").style.cursor = "default";
}

// Function to fetch hero from DB and return a Promise
async function getHeroFromDB() {
  const response = await fetch("sql/homeLoadHero.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + idHero, // Pass the ID in the POST body
  });

  const data = await response.json();

  // Create a Gladiator object with the data
  let newGladiator = new Gladiator(
    data.name,
    data.height,
    data.weight,
    data.somatotype,
    data.weapon,
    data.constitution,
    data.luck,
    data.speed,
    data.username,
    data.level
  );

  // Add additional properties to the gladiator
  newGladiator.name = data.name;
  newGladiator.height = Number(data.height);
  newGladiator.weight = Number(data.weight);
  newGladiator.somatotype = data.somatotype;
  newGladiator.weapon = data.weapon;
  newGladiator.constitution = Number(data.constitution);
  newGladiator.luck = Number(data.luck);
  newGladiator.speed = Number(data.speed);
  newGladiator.username = data.username;
  newGladiator.level = Number(data.level);
  newGladiator.id = Number(data.id);
  newGladiator.localvictories = Number(data.localvictories);
  newGladiator.onlineVictories = Number(data.onlineVictories);
  newGladiator.totalVictories = Number(data.totalVictories);
  newGladiator.defeatedEnemies = data.defeatedEnemies;
  newGladiator.diedAgainst = data.diedAgainst;
  newGladiator.critic = data.critic;
  newGladiator.focused = data.focused;
  newGladiator.weaponSRC = data.weaponSRC;
  newGladiator.bodySRC = data.bodySRC;
  newGladiator.headSRC = data.headSRC;
  newGladiator.weaponURL = data.weaponURL;
  newGladiator.bodyURL = data.bodyURL;
  newGladiator.headURL = data.headURL;
  newGladiator.maxHP = Number(data.maxHP);
  newGladiator.hp = Number(data.hp);
  newGladiator.dexterity = Number(data.dexterity);
  newGladiator.strength = Number(data.strength);
  // Push the gladiator to the gladiators array

  gladiators.push(newGladiator);

  //console.log(data);
  //console.log(gladiators[0]);

  // Parse the defeatedEnemies and diedAgainst attributes if they exist
  try {
    if (gladiators[0].defeatedEnemies && gladiators[0].defeatedEnemies !== "") {
      gladiators[0].defeatedEnemies = JSON.parse(gladiators[0].defeatedEnemies);
    }
  } catch (e) {
    console.error("Failed to parse defeatedEnemies:", e);
  }

  try {
    if (gladiators[0].diedAgainst && gladiators[0].diedAgainst !== "") {
      gladiators[0].diedAgainst = JSON.parse(gladiators[0].diedAgainst);
    }
  } catch (e) {
    console.error("Failed to parse diedAgainst:", e);
  }
}

// Function to update hero to the DB
async function updateHeroToDB() {
  let hero = gladiators[0];

  let data = {
    id: hero.id,
    username: hero.username,
    name: hero.name,
    level: hero.level,
    somatotype: hero.somatotype,
    height: hero.height,
    weight: hero.weight,
    constitution: hero.constitution,
    dexterity: hero.dexterity,
    strength: hero.strength,
    speed: hero.speed,
    luck: hero.luck,
    maxHP: hero.maxHP,
    hp: hero.hp,
    localvictories: hero.localvictories,
    onlineVictories: hero.onlineVictories,
    totalVictories: hero.totalVictories,
    defeatedEnemies: JSON.stringify(hero.defeatedEnemies),
    diedAgainst: JSON.stringify(hero.diedAgainst),
    critic: hero.critic,
    focused: hero.focused,
    weapon: hero.weapon,
    weaponSRC: hero.weaponSRC,
    bodySRC: hero.bodySRC,
    headSRC: hero.headSRC,
    weaponURL: hero.weaponURL,
    bodyURL: hero.bodyURL,
    headURL: hero.headURL,
  };

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://127.0.0.1/21-HumbleGladiators/sql/updateHero.php",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Prepare URL-encoded data
  let urlencodedData =
    "id=" +
    encodeURIComponent(data.id) +
    "&username=" +
    encodeURIComponent(data.username) +
    "&name=" +
    encodeURIComponent(data.name) +
    "&level=" +
    encodeURIComponent(data.level) +
    "&somatotype=" +
    encodeURIComponent(data.somatotype) +
    "&height=" +
    encodeURIComponent(data.height) +
    "&weight=" +
    encodeURIComponent(data.weight) +
    "&constitution=" +
    encodeURIComponent(data.constitution) +
    "&dexterity=" +
    encodeURIComponent(data.dexterity) +
    "&strength=" +
    encodeURIComponent(data.strength) +
    "&speed=" +
    encodeURIComponent(data.speed) +
    "&luck=" +
    encodeURIComponent(data.luck) +
    "&maxHP=" +
    encodeURIComponent(data.maxHP) +
    "&hp=" +
    encodeURIComponent(data.hp) +
    "&localvictories=" +
    encodeURIComponent(data.localvictories) +
    "&onlineVictories=" +
    encodeURIComponent(data.onlineVictories) +
    "&totalVictories=" +
    encodeURIComponent(data.totalVictories) +
    "&defeatedEnemies=" +
    encodeURIComponent(data.defeatedEnemies) +
    "&diedAgainst=" +
    encodeURIComponent(data.diedAgainst) +
    "&critic=" +
    encodeURIComponent(data.critic) +
    "&focused=" +
    encodeURIComponent(data.focused) +
    "&weapon=" +
    encodeURIComponent(data.weapon) +
    "&weaponSRC=" +
    encodeURIComponent(data.weaponSRC) +
    "&bodySRC=" +
    encodeURIComponent(data.bodySRC) +
    "&headSRC=" +
    encodeURIComponent(data.headSRC) +
    "&weaponURL=" +
    encodeURIComponent(data.weaponURL) +
    "&bodyURL=" +
    encodeURIComponent(data.bodyURL) +
    "&headURL=" +
    encodeURIComponent(data.headURL);

  // Handle server response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("Server Response:", xhr.responseText);
      console.log("Success: " + xhr.responseText); //update game here
    }
  };

  // Send the request with data
  xhr.send(urlencodedData);
}
