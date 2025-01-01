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
var gameStarting = true;
var username = "";

// ---------------------------
// Functions
// ---------------------------

function goingLoadCharacters() {
  window.location.href = `loadcharacter.html?username=` + username;
}

async function createHeroGladiatorToDb() {
  let hero = gladiators[0];
  console.log("Hero Died Against:", hero.diedAgainst);
  console.log("Hero Defeated:", hero.defeatedEnemies);
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
    "http://127.0.0.1/21-HumbleGladiators/sql/createHero.php",
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

  console.log("encoded data: ", urlencodedData);
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

//Start Game Function
//After user pressed "New Game"
async function startGame() {
  //Wait 700 ms before starting the game
  await loadingEffect("darkgray", 700);

  document.getElementById("homeScreen").innerHTML = ""; // Erases the Home Screen
  document
    .getElementById("characterCreationScreen")
    .classList.remove("notDisplaying");

  document.getElementById("imageHeader").style = ""; // Hides the header saying "Gladiator's Forge"

  document.getElementById("imageHeader").classList.add("notDisplaying"); // Hides the header saying "Gladiator's Forge"
} // It Removes the "hiding" attribute to the character creation screen

//Login Function
async function loginFunction() {
  //Plays music
  document.getElementById("indexMusic").play();
  document.getElementById("indexMusic").volume = 0;
  increaseSound("indexMusic");

  await loadingEffect("darkgray", 300);
  username = document.getElementById("userNameInput").value; //Gets the username input from the input field

  // Trim the input to remove leading/trailing whitespace
  let trimmedUsername = username.trim();

  if (trimmedUsername !== "") {
    // Checks that the username is not blank or just spaces
    document.getElementById("login").className = ""; // Hides the inputs of the login
    document.getElementById("login").classList.add("notDisplaying"); // Hides the inputs of the login
    document
      .getElementById("homeScreenSelections")
      .classList.remove("notDisplaying"); // Brings back the home screen selections
    username.trim(); //Remove blank spaces
  } else {
    alert("Username cannot be blank");
  }
}

// If game starting, automatically hide all the Divs and only display the starting screen

(function rungameStarting() {
  if (gameStarting == true) {
    document
      .getElementById("characterCreationScreen")
      .classList.add("notDisplaying"); //Hides the Character Creation Screen automatically

    document
      .getElementById("homeScreenSelections")
      .classList.add("notDisplaying"); //Hides the "New Game" and so selections from the home screen automatically
  }
})();

//
function startPlaying() {
  //Gives a start to the game after the first gladiator got created

  // Removes the "startPlayingColumn"
  document.getElementById("startPlayingColumn").classList = "";
  document.getElementById("startPlayingColumn").classList.add = "notDisplaying";
  // Removes the "gladiatorResult" column
  document.getElementById("gladiatorResult").classList = "";
  document.getElementById("gladiatorResult").classList.add("notDisplaying");
  // Removes the character creation screen
  document.getElementById("characterCreationScreen").innerHTML = "";
  document.getElementById("characterCreationScreen").style = "";
  document.getElementById("characterCreationScreen").classList = "";
  // Shows the "Level Container" div
  document.getElementById("levelContainer").classList.remove("notDisplaying");
  // Shows the first level
  document.getElementById("firstLevel").classList.remove("notDisplaying");
}

// Function to draw the gladiator on the HTML page based on height and weight
function drawHero() {
  let hpHeroBar = document.getElementById("heroHPBarCreationScreen"); //gets the HP bar element from the document
  hpHeroBar.classList.remove("notDisplaying"); // makes the HP bar visible
  document.getElementById("heroStats").classList.remove("notDisplaying"); //Makes the hero stats visible
  hpHeroBar.value = gladiators[0].hp + " / " + gladiators[0].maxHP; // displays the current HP on the bar

  let bodyHTMLStyle = document.getElementById("heroBody").style;
  let headHTMLStyle = document.getElementById("heroFace").style;

  // Set dimensions for the body and head based on the gladiator's height and weight
  bodyHTMLStyle.height = gladiators[0].height * 2 + "px"; // Body height
  bodyHTMLStyle.width = gladiators[0].weight * 2 + "px"; // Body width
  headHTMLStyle.width = gladiators[0].weight + "px"; // Heads width is 50% of bodies width
  headHTMLStyle.height = ((15 * gladiators[0].height) / 90) * 3 + "px"; // Adjust head height based on body height

  // Set background image based on the gladiator's id
  bodyHTMLStyle.backgroundImage = gladiators[0].bodyURL;

  // Set a default background image for the head
  headHTMLStyle.backgroundImage = gladiators[0].headURL;
}

// Function to add event listener to each randomizer die
function addEventListenerRandomizer(element) {
  element.addEventListener("click", randomizeStat); // Attach click event to randomize stats
}

// Function to forge a new gladiator and add them to the list
async function forgeHeroGladiator() {
  let wantsToGenerate = ""; // Variable to check if the user wants to generate the gladiator

  if (amountRandomiserDiceLeft >= 1) {
    alert(
      "You still have at least one extra randomizer die to be used. It is wise to have an extra look to your generated attributes before forging your gladiator."
    );
  }

  wantsToGenerate = prompt(
    "Are you sure that you want to forge your gladiator with the generated attributes? Type 'No' to cancel the forging of the gladiator",
    "Yes"
  );

  if (wantsToGenerate === null || wantsToGenerate.toLowerCase() === "no") {
    // If the user clicks "Cancel" (wantsToGenerate is null) or types "No"
    return; // Exit the function, do not proceed with forging the gladiator
  }

  // If the user clicked "OK" and typed anything other than "No"
  // Retrieve values from input fields
  let gladiatorsName = document.getElementById("heroName").value;
  if (gladiatorsName == "Random") {
    gladiatorsName = randomNames[randomiseNumber(0, 99)]; // Pick a random name
  }
  let gladiatorsHeight = document.getElementById("heroHeight").value;
  let gladiatorsWeight = document.getElementById("heroWeight").value;
  let gladiatorsSomatotype = document.getElementById("heroSomatotype").value;
  let gladiatorsWeapon = document.getElementById("heroWeapon").value;
  let gladiatorsConstitution =
    document.getElementById("heroConstitution").value;
  let gladiatorsLuck = document.getElementById("heroLuck").value;
  let gladiatorsSpeed = document.getElementById("heroSpeed").value;

  if (
    gladiatorsName !== "" &&
    gladiatorsHeight !== "" &&
    gladiatorsWeight !== "" &&
    gladiatorsSomatotype !== "" &&
    gladiatorsWeapon !== "" &&
    gladiatorsConstitution !== "" &&
    gladiatorsLuck !== "" &&
    gladiatorsSpeed !== ""
  ) {
    // Create a new Gladiator object
    let gladiatorObject = new Gladiator(
      gladiatorsName,
      gladiatorsHeight,
      gladiatorsWeight,
      gladiatorsSomatotype,
      gladiatorsWeapon,
      gladiatorsConstitution,
      gladiatorsLuck,
      gladiatorsSpeed,
      username,
      gameScenario
    );

    // Add the new gladiator to the array
    gladiators.push(gladiatorObject);

    // Update the HTML with the new gladiator's attributes
    document.getElementById("heroStrenghtCreationScrenText").innerText = String(
      gladiatorObject.strength
    );
    document.getElementById("heroDexterityCreationScrenText").innerText =
      String(gladiatorObject.dexterity);
    document.getElementById("heroConstitutionCreationScrenText").innerText =
      String(gladiatorObject.constitution);
    document.getElementById("heroSpeedCreationScrenText").innerText = String(
      gladiatorObject.speed
    );
    document.getElementById("heroLuckCreationScrenText").innerText = String(
      gladiatorObject.luck
    );

    document.getElementById(
      "heroWeaponCreationScrenText"
    ).style.backgroundImage = String(gladiatorObject.weaponURL);

    // Draw the gladiator on the HTML page
    drawHero();

    document.getElementById("btnForgeGladiator").classList.add("notDisplaying"); // Hides the button that allows the user to generate the Hero

    await loadingEffect("white", 3000); // Waits 3s

    document.getElementById("gladiatorInputs").classList = ""; // Removes all classes from the Gladiator Input Hero Column
    document.getElementById("gladiatorInputs").classList.add("notDisplaying"); // Hides the column that allows the user to generate the Hero (generated inputs and so)

    await loadingEffect("white", 2000); // Waits 2s

    document
      .getElementById("extraDieContainerRow")
      .classList.add("notDisplaying"); // Removes the row that contains the extra dice

    document.getElementById("imageHeader").classList.remove("notDisplaying"); // Brings back the header displaying "Gladiator's Forge"
    document.getElementById("imageHeader").style =
      "display: flex; justify-content: center;align-items: center;border-bottom: solid 2px black;";

    await loadingEffect("white", 1500); // Waits 1s

    document
      .getElementById("startPlayingColumn")
      .classList.remove("notDisplaying"); // Shows the row that provides the button that allows the player to start the game

    //TEST FUNCTION
    gladiators[0].id = 92530654;

    // If we are creating a unique gladiator ID, then
    if (await heroDoesNotExistInDB()) {
      await createHeroGladiatorToDb(); // creates the gladiator in the DB
    }

    goingHome(); // Goes to the home screen
  } else {
    alert("Please generate all the attributes before forging the gladiator.");
  }
}

async function heroDoesNotExistInDB() {
  // Initially get the response for the current gladiator ID
  let response = await fetch("sql/homeLoadHero.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + gladiators[0].id, // Pass the ID in the POST body
  });

  let data = await response.json(); // Parse the response as JSON

  // Loop until we generate an ID that doesn't exist in the DB
  console.log("Checking if the Gladiator ID already exists in the DB");
  while (data.id == gladiators[0].id) {
    console.log("Gladiator already existed in DB, generating new ID");
    gladiators[0].id = gladiators[0].generateGladiatorID(); // Generate a new ID
    console.log(gladiators[0].id);

    // Now, check if the new generated ID exists in the DB
    response = await fetch("sql/homeLoadHero.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "id=" + gladiators[0].id, // Pass the new generated ID
    });

    data = await response.json(); // Check if the new ID exists in the DB
  }

  console.log("Unique gladiator successfully generated");
  // If the ID is unique (doesn't exist in the DB), return true
  return true;
}

// Function to validate and update the state of randomizing dice
function validatingRandomisingDice() {
  let result = false;
  // Check if there are any dice left to use
  if (amountRandomiserDiceLeft >= 1) {
    amountRandomiserDiceLeft -= 1; // Decrement the number of dice left

    result = true;
  } else {
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
    somatotypeSpeedModifier = -1;
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
