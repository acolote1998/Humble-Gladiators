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
var gameScenario = 1; //initializes a variable that indicates in which "level" or "scenario" the user is currently on
var WhosTurn = 0; //If 0, it is the Heroes turn, if 1, it is the enemys turn, 3 if it is the turn resolution
var turnNumber = 1;
var heroFocused = false;
var enemyFocused = false;
var herosAction = "";
var EnemysAction = "";
var battleState = ""; // Detects if one of the gladiators dies. Can be "ongoing" or "victory" or "defeat"

// Array to store gladiators
var gladiators = []; // List of created gladiators

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

// ---------------------------
// Functions
// ---------------------------

//Function that logs in console general information about the battle
function battleStatus() {
  if (WhosTurn == 0) {
    console.log("Whoses turn:", "Hero");
  }
  if (WhosTurn == 1) {
    console.log("Whoses turn:", "Enemy");
  }
  if (WhosTurn == 3) {
    console.log("Whoses turn:", "Turn Resolution");
  }

  console.log("Enemys Action:", EnemysAction);
  console.log("Is enemy focused?", gladiators[gameScenario].focused);
  console.log("Heros Action:", herosAction);
  console.log("Is Hero focused?", gladiators[0].focused);
  console.log("Turn number", turnNumber);
}

async function settingBattlefield() {
  document.getElementById(gameScenario + "BtnStartBattle").outerHTML = ""; //Removes the "Find Oponent" button from the battle scene
  createRandomGladiator(randomNames[randomiseNumber(0, 99)]); // Creates a Random Gladiator that will be the enemy of the player. Gets a random name from the randomNames array (100 random names)
  whoStartsCombat(); //Designate Whoses turn it is
  updateGraphicsBattle(0, gameScenario, "hero"); //Puts up the Heros graphic in the current game scenario
  updateGraphicsBattle(gameScenario, gameScenario, "Enemy"); //Puts up the Enemie graphic in the current game scenario

  await loadingEffect("transparent", 3000); // Waiting 3 seconds for the battle to start

  battleState = "ongoing";

  if (WhosTurn == 1) {
    // if it is the Enemys turn, then call it
    enemysTurn();
  }
}

// Function that makes the turns update and eventually resolve into battle
function turnUpdate() {
  // If the enemy has taken action already but not the hero, then is is the usersTurn
  if (EnemysAction != "" && herosAction == "") {
    return usersTurn();
  }
  // If the Hero has taken action already but not the enemy, then it is the enemys turn
  if (herosAction != "" && EnemysAction == "") {
    return enemysTurn();
  }

  if (herosAction != "" && EnemysAction != "") {
    return turnResolution(); // Calls the function that resolves the turn
  }
}

async function turnResolution() {
  if (battleState == "ongoing") {
    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Turn Resolution";
    WhosTurn = 3;
    console.log("Time to resolve the actions");

    //Sets the action icon to blank for a moment
    document.getElementById(gameScenario + "heroActionIcon").src = "";
    document.getElementById(gameScenario + "EnemyActionIcon").src = "";

    await loadingEffect("transparent", 1600); //Adds a little wait

    //Sets the correct icon based on the action the enemy took
    if (herosAction == "attack") {
      document.getElementById(gameScenario + "heroActionIcon").src =
        "img/icons/iconAttack.png";
    } else if (herosAction == "defend") {
      document.getElementById(gameScenario + "heroActionIcon").src =
        "img/icons/iconDefend.png";
    } else if (herosAction == "focus") {
      document.getElementById(gameScenario + "heroActionIcon").src =
        "img/icons/iconFocus.png";
    }

    //Sets the correct icon based on the action the enemy took
    if (EnemysAction == "attack") {
      document.getElementById(gameScenario + "EnemyActionIcon").src =
        "img/icons/iconAttack.png";
    } else if (EnemysAction == "defend") {
      document.getElementById(gameScenario + "EnemyActionIcon").src =
        "img/icons/iconDefend.png";
    } else if (EnemysAction == "focus") {
      document.getElementById(gameScenario + "EnemyActionIcon").src =
        "img/icons/iconFocus.png";
    }

    await loadingEffect("transparent", 3000); //Takes time to resolve the turn
    // Function that resolves the turn
    var actsFirst = 0; // Default to hero acting first
    var actsNow = 0;

    if (gladiators[0].speed > gladiators[gameScenario].speed) {
      actsFirst = 0; // Hero acts first
    } else if (gladiators[0].speed < gladiators[gameScenario].speed) {
      actsFirst = 1; // Enemy acts first
    } else if (gladiators[0].speed === gladiators[gameScenario].speed) {
      // If speeds are the same, check maxHP
      if (gladiators[0].maxHP < gladiators[gameScenario].maxHP) {
        actsFirst = 0; // Hero acts first
      } else {
        actsFirst = 1; // Enemy acts first
      }
    }
    actsNow = actsFirst; // The character which resolves first, is the person with the highest speed and lowest hp

    if (actsNow == 0) {
      //If the hero starts attacking
      // Play animation of Hero attacking
      if (herosAction == "attack") {
        console.log("Hero attacks");
        let damage = gladiators[0].dealDamage();
        let isCritical = gladiators[0].critic;
        console.log("The intended damage is ", damage);

        if (EnemysAction == "defend") {
          if (gladiators[gameScenario].focused) {
            // Enemy is focused and defending
            if (isCritical) {
              // Critical hit on focused and defending enemy
              gladiators[gameScenario].hp -= damage / 2;
              console.log(
                "Enemy was defending and focused, but the hero hit a critical blow. Enemy takes reduced damage:",
                damage / 2
              );
              gladiators[0].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending enemy
              console.log(
                "Enemy was defending and focused, and resisted the attack. No damage taken."
              );
            }
            gladiators[gameScenario].focused = false; // Lose focus after resisting
          } else {
            // Enemy is not focused but defending
            if (isCritical) {
              // Critical hit on defending but not focused enemy
              gladiators[gameScenario].hp -= damage;
              console.log(
                "Enemy was defending, but the hero hit a critical blow. Enemy takes full damage:",
                damage
              );
              gladiators[0].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused enemy
              gladiators[gameScenario].hp -= damage / 2;
              console.log(
                "Enemy was defending but not focused. Enemy takes reduced damage:",
                damage / 2
              );
            }
          }
        } else {
          // Enemy is not defending
          if (isCritical) {
            console.log(
              "Hero is hitting a critical blow. Enemy takes full damage:",
              damage
            );
            gladiators[0].focused = false; // Removes the attackers focused state
          } else {
            console.log("Enemy takes full damage:", damage);
          }
          gladiators[gameScenario].hp -= damage;
        }
        gladiators[0].critic = false; // Reset the critical state after the hit
      }

      // Play animation of enemy attacking

      // If enemy attacks back
      if (EnemysAction == "attack") {
        console.log("Enemy attacks");
        let damage = gladiators[gameScenario].dealDamage();
        let isCritical = gladiators[gameScenario].critic;
        console.log("Intended damage", damage);

        if (herosAction == "defend") {
          if (gladiators[0].focused) {
            // Hero is focused and defending
            if (isCritical) {
              // Critical hit on focused and defending hero
              gladiators[0].hp -= damage / 2;
              console.log(
                "Hero is defending and focused, but the enemy hit a critical blow. Hero takes reduced damage:",
                damage / 2
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending hero
              console.log(
                "Hero is defending and focused, and resisted the attack. No damage taken."
              );
            }
            gladiators[0].focused = false; // Hero loses focus after resisting the attack
          } else {
            // Hero is defending but not focused
            if (isCritical) {
              // Critical hit on defending but not focused hero
              gladiators[0].hp -= damage;
              console.log(
                "Hero is defending, but the enemy hit a critical blow. Hero takes full damage:",
                damage
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused hero
              gladiators[0].hp -= damage / 2;
              console.log(
                "Hero is defending but not focused. Hero takes reduced damage:",
                damage / 2
              );
            }
          }
        } else {
          // Hero is not defending
          if (isCritical) {
            console.log(
              "Enemy is hitting a critical blow. Hero takes full damage:",
              damage
            );
            gladiators[gameScenario].focused = false; // Removes the attackers focused state
          } else {
            console.log("Hero takes full damage:", damage);
          }
          gladiators[0].hp -= damage;
        }
        gladiators[gameScenario].critic = false; // Reset the critical state after the hit
      }
    }

    if (actsNow == 1) {
      //If the Enemy starts attacking

      if (EnemysAction == "attack") {
        console.log("Enemy attacks");
        let damage = gladiators[gameScenario].dealDamage();
        let isCritical = gladiators[gameScenario].critic;
        console.log("Intended damage", damage);

        if (herosAction == "defend") {
          if (gladiators[0].focused) {
            // Hero is focused and defending
            if (isCritical) {
              // Critical hit on focused and defending hero
              gladiators[0].hp -= damage / 2;
              console.log(
                "Hero is defending and focused, but the enemy hit a critical blow. Hero takes reduced damage:",
                damage / 2
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending hero
              console.log(
                "Hero is defending and focused, and resisted the attack. No damage taken."
              );
            }
            gladiators[0].focused = false; // Hero loses focus after resisting the attack
          } else {
            // Hero is defending but not focused
            if (isCritical) {
              // Critical hit on defending but not focused hero
              gladiators[0].hp -= damage;
              console.log(
                "Hero is defending, but the enemy hit a critical blow. Hero takes full damage:",
                damage
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused hero
              gladiators[0].hp -= damage / 2;
              console.log(
                "Hero is defending but not focused. Hero takes reduced damage:",
                damage / 2
              );
            }
          }
        } else {
          // Hero is not defending
          if (isCritical) {
            console.log(
              "Enemy is hitting a critical blow. Hero takes full damage:",
              damage
            );
            gladiators[gameScenario].focused = false; // Removes the attackers focused state
          } else {
            console.log("Hero takes full damage:", damage);
          }
          gladiators[0].hp -= damage;
        }
        gladiators[gameScenario].critic = false; // Reset the critical state after the hit
      }

      // Play animation of hero attacking

      // If hero attacks back

      if (herosAction == "attack") {
        console.log("Hero attacks");
        let damage = gladiators[0].dealDamage();
        let isCritical = gladiators[0].critic;
        console.log("The intended damage is ", damage);

        if (EnemysAction == "defend") {
          if (gladiators[gameScenario].focused) {
            // Enemy is focused and defending
            if (isCritical) {
              // Critical hit on focused and defending enemy
              gladiators[gameScenario].hp -= damage / 2;
              console.log(
                "Enemy was defending and focused, but the hero hit a critical blow. Enemy takes reduced damage:",
                damage / 2
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending enemy
              console.log(
                "Enemy was defending and focused, and resisted the attack. No damage taken."
              );
            }
            gladiators[gameScenario].focused = false; // Lose focus after resisting
          } else {
            // Enemy is not focused but defending
            if (isCritical) {
              // Critical hit on defending but not focused enemy
              gladiators[gameScenario].hp -= damage;
              console.log(
                "Enemy was defending, but the hero hit a critical blow. Enemy takes full damage:",
                damage
              );
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused enemy
              gladiators[gameScenario].hp -= damage / 2;
              console.log(
                "Enemy was defending but not focused. Enemy takes reduced damage:",
                damage / 2
              );
            }
          }
        } else {
          // Enemy is not defending
          if (isCritical) {
            console.log(
              "Hero is hitting a critical blow. Enemy takes full damage:",
              damage
            );
            gladiators[gameScenario].focused = false; // Removes the attackers focused state
          } else {
            console.log("Enemy takes full damage:", damage);
          }
          gladiators[gameScenario].hp -= damage;
        }
        gladiators[0].critic = false; // Reset the critical state after the hit
      }
    }

    if (herosAction != "attack" && EnemysAction != "attack") {
      //If none of them are attacking

      //Hero Defending
      if (herosAction == "defend") {
        console.log("The hero will heal from his defending position");
        //if the hero is defending
        let heal = gladiators[0].healDefending();
        let focusModifier = 1;

        if (gladiators[0].focused == true) {
          console.log("The hero will use his focus to heal more");
          //if the hero is focused, it removes the focus and adds the heal modifier
          focusModifier = 2;
          gladiators[0].focused = false;
        }
        console.log("The hero will heal", heal * focusModifier);
        gladiators[0].hp = gladiators[0].hp + heal * focusModifier;

        if (gladiators[0].hp > gladiators[0].maxHP) {
          // if the hero has max HP, after the heal, then it caps it to the max
          gladiators[0].hp = gladiators[0].maxHP;
          console.log("The hero has now Max HP!");
        }
        console.log("The hero HP is now ", gladiators[0].hp);
      }
      // Hero Focusing
      if (gladiators[0].focused == "focus") {
        console.log("The hero is now focused");
        gladiators[0].focused = true;
      }

      //Enemy Defending
      if (EnemysAction == "defend") {
        console.log("The enemy will heal from his defending position");
        //if the enemy is defending
        let heal = gladiators[gameScenario].healDefending();
        let focusModifier = 1;

        if (gladiators[gameScenario].focused == true) {
          console.log("The enemy will use his focus to heal more");
          //if the enemy is focused, it removes the focus and adds the heal modifier
          focusModifier = 2;
          gladiators[gameScenario].focused = false;
        }
        console.log("The enemy will heal", heal * focusModifier);
        gladiators[gameScenario].hp =
          gladiators[gameScenario].hp + heal * focusModifier;

        if (gladiators[gameScenario].hp > gladiators[gameScenario].maxHP) {
          // if the enemy has max HP, after the heal, then it caps it to the max
          gladiators[gameScenario].hp = gladiators[gameScenario].maxHP;
          console.log("The enemy has now Max HP!");
        }
        console.log("The enemy HP is now ", gladiators[gameScenario].hp);
      }
      // Enemy Focusing
      if (EnemysAction == "focus") {
        console.log("The enemy is now focused");
        gladiators[gameScenario].focused = true;
      }
    }

    EnemysAction = ""; //Resets the Enemys Action
    herosAction = ""; // Resets the Heros Action
    turnNumber++; // Adds one more turn
    updateGraphicsBattle(0, gameScenario, "hero"); //Updates graphics and hp bars of the hero
    updateGraphicsBattle(gameScenario, gameScenario, "Enemy"); // Update graphics and hp bars of the enemy

    await loadingEffect("transparent", 1300); //Adds a little wait
    checkBattleState();
    if (battleState == "ongoing") {
      if (actsFirst == 0) {
        //If the Hero has higher speed, then it is the hero's turn again
        usersTurn();
      } else if (actsFirst == 1) {
        // If the enemy has higher speed, then it is the enemy's turn again
        enemysTurn();
      }
    }
  }
}

function checkBattleState() {
  if (gladiators[0].hp <= 0 && gladiators[gameScenario].hp <= 0) {
    if (gladiators[0].speed >= gladiators[gameScenario].speed) {
      console.log("Victory for the hero");
      battleState = "victory";
    } else {
      console.log("Victory for the enemy");
      battleState = "defeat";
    }
  } else {
    if (gladiators[0].hp <= 0) {
      console.log("Victory for the enemy");
      battleState = "defeat";
    } else if (gladiators[gameScenario].hp <= 0) {
      console.log("Victory for the hero");
      battleState = "victory";
    }
  }
  if (gladiators[0].hp >= 1 && gladiators[gameScenario].hp >= 1) {
    battleState = "ongoing";
  }
}

// Function that makes the user able to play their turn
function usersTurn() {
  console.log("It is the Heros Turn");

  document.getElementById(
    String(gameScenario) + "AttackButton"
  ).disabled = false;
  document.getElementById(
    String(gameScenario) + "DefendButton"
  ).disabled = false;
  document.getElementById(
    String(gameScenario) + "FocusButton"
  ).disabled = false;

  document.getElementById(gameScenario + "textWhossTurn").innerText =
    "Your turn";
}

async function herosActionClick(target) {
  //Depending on the action that the user took when clicking the action button, then the action of the heros variable gets updated
  if (target.innerText.toLowerCase() == "attack") {
    herosAction = "attack";
    document.getElementById(gameScenario + "heroActionIcon").src =
      "img/icons/iconAttack.png"; //Sets the users action icon
  }
  if (target.innerText.toLowerCase() == "defend") {
    herosAction = "defend";
    document.getElementById(gameScenario + "heroActionIcon").src =
      "img/icons/iconDefend.png"; //Sets the users action icon
  }
  if (target.innerText.toLowerCase() == "focus") {
    herosAction = "focus";
    gladiators[0].focused = true;
    document.getElementById(gameScenario + "heroActionIcon").src =
      "img/icons/iconFocus.png"; //Sets the users action icon
  }
  console.log("Hero action", herosAction);

  await loadingEffect("transparent", 1600); //Adds a little wait

  WhosTurn = 1; // Gives the turn to the enemy
  turnUpdate(); // Calls the turnUpdate function which will at some point settle the turn and go to the next one
}

async function enemysTurn() {
  console.log("It is the Enemy's Turn");

  await loadingEffect("transparent", 1000);

  // Show the "thinking" icon for the enemy
  document.getElementById(gameScenario + "EnemyActionIcon").src =
    "img/icons/iconThinking.png";

  // Disable hero's action buttons since it's the enemy's turn
  document.getElementById(
    String(gameScenario) + "AttackButton"
  ).disabled = true;
  document.getElementById(
    String(gameScenario) + "DefendButton"
  ).disabled = true;
  document.getElementById(String(gameScenario) + "FocusButton").disabled = true;

  // Indicate it's the enemy's turn
  document.getElementById(gameScenario + "textWhossTurn").innerText =
    "Enemy's turn";

  await loadingEffect("transparent", 3000);

  // Determine the enemy's action
  if (
    gladiators[0].hp <= gladiators[0].maxHP / 2 &&
    gladiators[gameScenario].hp >= gladiators[gameScenario].maxHP / 2
  ) {
    console.log("The enemy identifies your weakness and will attack!");
    EnemysAction = "attack";
  } else if (gladiators[gameScenario].focused) {
    let action = randomiseNumber(0, 1); // Randomly choose between attack or defend
    EnemysAction = action === 0 ? "defend" : "attack";
  } else {
    let action = randomiseNumber(0, 2); // Randomly choose between attack, defend, or focus
    if (action === 0) {
      EnemysAction = "defend";
    } else if (action === 1) {
      EnemysAction = "attack";
    } else if (action === 2) {
      EnemysAction = "focus";
      gladiators[gameScenario].focused = true;
    }
  }

  console.log("Enemy's action", EnemysAction);
  document.getElementById(gameScenario + "EnemyActionIcon").src =
    "img/icons/iconActionTaken.png";

  await loadingEffect("transparent", 2000);

  // After the enemy's action, update the turn and check if the hero is still alive
  turnUpdate();

  // Check if the hero is still alive
  if (gladiators[0].hp > 0) {
    WhosTurn = 0; // Make it the hero's turn if they are still alive
  } else {
    console.log("The hero has been defeated!");
    // Handle end of game, e.g., show a defeat screen or reset the game state
  }
}

// Function that calculates who starts the combate
function whoStartsCombat() {
  // If they have the same Speed and HP, then whoever starts is random
  if (
    gladiators[0].speed == gladiators[gameScenario].speed &&
    gladiators[0].hp == gladiators[gameScenario].hp
  ) {
    WhosTurn = randomiseNumber(0, 1);
  } else {
    // Check if the hero's speed is greater than the enemy's speed
    if (gladiators[0].speed > gladiators[gameScenario].speed) {
      WhosTurn = 0; // Hero's turn
    }
    // Check if the hero and enemy have the same speed but different HP
    else if (gladiators[0].speed == gladiators[gameScenario].speed) {
      // If hero's health is greater, it's the enemy's turn
      if (gladiators[0].hp > gladiators[gameScenario].hp) {
        WhosTurn = 1;
      } else {
        WhosTurn = 0; // Otherwise, hero's turn
      }
    }
    // If the hero's speed is less, it's the enemy's turn
    else {
      WhosTurn = 1;
    }
  }

  if (WhosTurn == 0) {
    //If the hero starts combat, his turn actions are enabled, otherwise disabled
    document.getElementById(
      String(gameScenario) + "AttackButton"
    ).disabled = false;
    document.getElementById(
      String(gameScenario) + "DefendButton"
    ).disabled = false;
    document.getElementById(
      String(gameScenario) + "FocusButton"
    ).disabled = false;

    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Your turn";
  } else if (WhosTurn == 1) {
    document.getElementById(
      String(gameScenario) + "AttackButton"
    ).disabled = true;
    document.getElementById(
      String(gameScenario) + "DefendButton"
    ).disabled = true;
    document.getElementById(
      String(gameScenario) + "FocusButton"
    ).disabled = true;

    document.getElementById(gameScenario + "EnemyActionIcon").src =
      "img/icons/iconThinking.png"; //Sets the action icon

    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Enemy's turn";
  }
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
  await loadingEffect("darkgray", 300);
  username = document.getElementById("userNameInput").value; //Gets the username input from the input field

  if (username != "") {
    //Checks that the username and gladiator ID are not blank
    document.getElementById("login").className = ""; // Hides the inputs of the login
    document.getElementById("login").classList.add("notDisplaying"); // Hides the inputs of the login
    document
      .getElementById("homeScreenSelections")
      .classList.remove("notDisplaying"); // Brings back the
  } else {
    alert("Username or Gladiator ID are blank!");
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

// Function that returns a gladiator with random values
function createRandomGladiator(name) {
  let somatotype = "";
  let Rndnumber = randomiseNumber(1, 3);
  // Generate random Somatotype if not already generated or if dice are available

  // Map number to somatotype
  if (Rndnumber == 1) {
    somatotype = "ectomorph";
  } else if (Rndnumber == 2) {
    somatotype = "mesomorph";
  } else if (Rndnumber == 3) {
    somatotype = "endomorph";
  }

  let newGladiator = new Gladiator(
    name,
    randomiseNumber(100, 210),
    randomiseNumber(50, 140),
    somatotype,
    generateARandomWeapon(),
    randomiseNumber(12, 18),
    calculateRandomGladiatorsLuck(),
    calculateGladiatorsSpeed(somatotype),
    username
  );
  gladiators.push(newGladiator);
}

//Update Graphic Content in the Battle Scene
function updateGraphicsBattle(gladiatorIndex, currentlevel, heroorEnemy) {
  //It moves the action icons to blank
  document.getElementById(gameScenario + heroorEnemy + "ActionIcon").src = "";

  if (gladiators[gladiatorIndex].focused == false) {
    document.getElementById(currentlevel + heroorEnemy + "Focus").innerText =
      "";
  } else {
    document.getElementById(currentlevel + heroorEnemy + "Focus").innerText =
      "Focused";
  }

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "Level"
  ).innerText = "LVL " + String(gladiators[gladiatorIndex].level); //Updates the Level in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "Name"
  ).innerHTML = gladiators[gladiatorIndex].name; //Updates the Name in HTML for the provided gladiator
  document.getElementById(
    String(currentlevel) + "HPBar" + String(heroorEnemy)
  ).value =
    gladiators[gladiatorIndex].hp + " / " + gladiators[gladiatorIndex].maxHP; //Updates the HP in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "WeaponBattleStatIMG"
  ).src = gladiators[gladiatorIndex].weaponSRC; //Updates the Weapon in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "HeightBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].height; //Updates the Height in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "WeightBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].weight; //Updates the Height in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "SpeedBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].speed; //Updates the Speed in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "StrenghtBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].strength; //Updates the Strenght in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "DexterityBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].dexterity; //Updates the Dexterity in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgBody"
  ).src = gladiators[gladiatorIndex].bodySRC; //Updates the Body in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgBody"
  ).style.height = String(gladiators[gladiatorIndex].height) + "px"; //Updates the Body height with the gladiators height in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgBody"
  ).style.width =
    String((gladiators[gladiatorIndex].weight / 140) * 124) + "px"; //Updates the Body width with the gladiators height in HTML for the provided gladiator. Max width is 124 px, so it scales it down to that

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgHead"
  ).style.width =
    (String(gladiators[gladiatorIndex].weight / 140) * 124) / 2 + "px"; //Updates the Head width with 50% of the gladiators height in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgHead"
  ).style.height = "40px"; //Updates the Head height to 40px in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ImgHead"
  ).src = gladiators[gladiatorIndex].headSRC; //Updates the Body in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "ConstitutionBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].constitution; //Updates the Constitution in HTML for the provided gladiator

  document.getElementById(
    String(currentlevel) + String(heroorEnemy) + "LuckBattleStat"
  ).innerHTML = gladiators[gladiatorIndex].luck; //Updates the Luck in HTML for the provided gladiator
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
  //

  let wantsToGenerate = ""; //Variable that will check if the user is sure and wants to generate the gladiator with the given stats
  if (amountRandomiserDiceLeft >= 1) {
    alert(
      "You still have at least one extra randomizer die to be used. It is wise to have an extra look to your generated attributes before forging your gladiator."
    );
  }
  wantsToGenerate = prompt(
    "Are you sure that you want to forge your gladiator with the generated attributes? Type 'No' to cancel the forging of the gladiator",
    "Yes"
  );
  if (wantsToGenerate.toLowerCase() != "no") {
    // If the user typed "no", the gladiator will not generate, otherwise it will

    // Retrieve values from input fields
    let gladiatorsName = document.getElementById("heroName").value;
    if (gladiatorsName == "Random") {
      gladiatorsName = randomNames[randomiseNumber(0, 99)]; //If the user left the Name input as "Random", it will pick a random name from the array
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
      let gladiatorObject = new Gladiator(
        gladiatorsName,
        gladiatorsHeight,
        gladiatorsWeight,
        gladiatorsSomatotype,
        gladiatorsWeapon,
        gladiatorsConstitution,
        gladiatorsLuck,
        gladiatorsSpeed,
        username
      );

      // Add the new gladiator to the array
      gladiators.push(gladiatorObject);

      // Update the HTML with the new gladiator's attributes
      document.getElementById("heroStrenghtCreationScrenText").innerText =
        String(gladiatorObject.strength);
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

      document
        .getElementById("btnForgeGladiator")
        .classList.add("notDisplaying"); // Hides the button that allows the user generate the Hero

      await loadingEffect("white", 3000); // Waits 3s

      document.getElementById("gladiatorInputs").classList = ""; // Removes all classes from the Gladiator Input Hero Column
      document.getElementById("gladiatorInputs").classList.add("notDisplaying"); // Hides the column that allows the user generate the Hero (generated inputs and so)

      await loadingEffect("white", 2000); // Waits 2s

      document
        .getElementById("extraDieContainerRow")
        .classList.add("notDisplaying"); // Removes the row that contains the extra dice

      document.getElementById("imageHeader").classList.remove("notDisplaying"); //Brings back the header displaying "Gladiator's Forge"
      document.getElementById("imageHeader").style =
        "display: flex; justify-content: center;align-items: center;border-bottom: solid 2px black;";

      await loadingEffect("white", 1500); // Waits 1s

      document
        .getElementById("startPlayingColumn")
        .classList.remove("notDisplaying"); // Shows the row that provides the button that allows the player start the game
    } else {
      alert("Please generate all the attributes before forging the gladiator.");
    }
  }
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
    username
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

    // Calculate and assign attributes based on methods
    this.id = this.generateGladiatorID(); // Unique Gladiator ID
    this.level = 1; // All Gladiators aree created by default at level 1
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
  }

  //Healing due to defending function
  healDefending() {
    let heal = this.constitution * gameScenario;
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
      /*

      //Otherwise, if the number is bigger than our crit chance, then we hit "normal" damage
      finalDmg = modifier + weaponDmg;
      this.critic = false;


*/

      ///////////ALWAYS CRIT TEST      //If the crit chance indicator (from 0 to 100) is equal or smaller than the crit chance, the final damage is times 1,5
      finalDmg = modifier + weaponDmg;
      finalDmg = finalDmg * 1.5;
      //And we indicate to our battlefield, that our character just hit a crit
      this.critic = true;
      /////////////
    }

    return finalDmg;
  }

  //Calculate Gladiator id
  generateGladiatorID() {
    //Generates a pretty much "unique" gladiator ID. If the 5th and 6th digit are >19, then it re-rolls again (only 20 heads avaiable, and 5+6 digits represent the head graphic)
    let gladiatorID = randomiseNumber(1000000, 9999999);
    while (Number(gladiatorID.toString().slice(4, 6)) >= 20) {
      //If the Head ID generated is 20 or more, then it generates new ones in a loop until one matches the wanted criteria
      gladiatorID = randomiseNumber(1000000, 9999999);
      if (Number(gladiatorID.toString().slice(4, 6)) <= 19) {
        //If the Head ID generated is between 00 and 19, then it keeps it and breaks the loop

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
