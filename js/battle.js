// ---------------------------
// Variables
// ---------------------------

var idHero = getHeroIDfromURL("id");

var WhosTurn = 0; //If 0, it is the Heroes turn, if 1, it is the enemys turn, 3 if it is the turn resolution
var turnNumber = 1;
var heroFocused = false;
var enemyFocused = false;
var herosAction = "";
var EnemysAction = "";
var battleState = ""; // Detects if one of the gladiators dies. Can be "ongoing" or "victory" or "defeat"

// ---------------------------
// Functions
// ---------------------------

settingBattlefield(); //retrieves the hero from the DB

async function settingBattlefield() {
  await getHeroFromDB(); //As soon as the site loads, retreive hero from DB and create an enemy

  createRandomGladiator(randomNames[randomiseNumber(0, 99)], "CPU"); // Creates a Random Gladiator that will be the enemy of the player. Gets a random name from the randomNames array (100 random names)
  whoStartsCombat(); //Designate Whoses turn it is

  updateGraphicsBattle(0, gameScenario, "hero"); //Puts up the Heros graphic in the current game scenario
  updateGraphicsBattle(gameScenario, gameScenario, "Enemy"); //Puts up the Enemie graphic in the current game scenario

  TwitchUsersActionsBtns(true); //turns off the action buttons
}

async function startBattle() {
  document.getElementById(gameScenario + "BtnStartBattle").outerHTML = ""; //Removes the "Find Oponent" button from the battle scene
  updateGraphicsBattle(0, gameScenario, "hero"); //Puts up the Heros graphic in the current game scenario
  updateGraphicsBattle(gameScenario, gameScenario, "Enemy"); //Puts up the Enemie graphic in the current game scenario

  await loadingEffect("transparent", 2500); // Waiting 2,5 seconds for the battle to start

  battleState = "ongoing";

  if (WhosTurn == 1) {
    // if it is the Enemys turn, then call it
    enemysTurn();

    TwitchUsersActionsBtns(true); //turns off the action buttons when the site loads
  } else {
    TwitchUsersActionsBtns(false); //turns on the action buttons when the site loads
  }
}

// Function that returns a gladiator with random values
function createRandomGladiator(name, username) {
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
    username,
    gameScenario
  );
  gladiators.push(newGladiator);
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
  let battlelog = document.getElementById(gameScenario + "battleLog");

  TwitchUsersActionsBtns(true); //Deactivates the heroes buttons
  if (battleState == "ongoing") {
    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Turn Resolution";
    WhosTurn = 3;

    console.log("Time to resolve the actions");
    battlelog.value = "Time to resolve the actions" + "\n" + battlelog.value;

    //Sets the action icon to blank for a moment
    document.getElementById(gameScenario + "heroActionIcon").src = "";
    document.getElementById(gameScenario + "EnemyActionIcon").src = "";

    await randomWaitForTurn(); //Adds a little wait
    await randomWaitForTurn(); //Adds a little wait

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

    battlelog.value =
      "The hero will " +
      herosAction +
      ", the enemy will " +
      EnemysAction +
      "\n" +
      battlelog.value;

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
        battlelog.value = "The hero attacks" + "\n" + battlelog.value;

        battlelog.value =
          "The intended damage is " + damage + "\n" + battlelog.value;
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
              battlelog.value =
                "Enemy was defending and focused, but the hero hit a critical blow. Enemy takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
              gladiators[0].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending enemy
              console.log(
                "Enemy was defending and focused, and resisted the attack. No damage taken."
              );
              battlelog.value =
                "Enemy was defending and focused, and resisted the attack. No damage taken." +
                "\n" +
                battlelog.value;
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
              battlelog.value =
                "Enemy was defending, but the hero hit a critical blow. Enemy takes full damage: " +
                damage +
                "\n" +
                battlelog.value;
              gladiators[0].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused enemy
              gladiators[gameScenario].hp -= damage / 2;
              console.log(
                "Enemy was defending but not focused. Enemy takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "Enemy was defending but not focused. Enemy takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            }
          }
        } else {
          // Enemy is not defending
          if (isCritical) {
            console.log(
              "Hero is hitting a critical blow. Enemy takes full damage:",
              damage
            );
            battlelog.value =
              "Hero is hitting a critical blow. Enemy takes full damage: " +
              damage +
              "\n" +
              battlelog.value;

            gladiators[0].focused = false; // Removes the attackers focused state
          } else {
            console.log("Enemy takes full damage:", damage);
            battlelog.value =
              "Enemy takes full damage: " + damage + "\n" + battlelog.value;
          }
          gladiators[gameScenario].hp -= damage;
        }
        gladiators[0].critic = false; // Reset the critical state after the hit
      }

      // Play animation of enemy attacking

      // If enemy attacks back
      if (EnemysAction == "attack") {
        console.log("Enemy attacks");
        battlelog.value = "The enemy attacks" + "\n" + battlelog.value;

        let damage = gladiators[gameScenario].dealDamage();
        let isCritical = gladiators[gameScenario].critic;
        console.log("Intended damage", damage);

        battlelog.value =
          "The intended damage is: " + damage + "\n" + battlelog.value;

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

              battlelog.value =
                "The hero is defending and focused, but the enemy hit a critical blow. The hero takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;

              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on focused and defending hero
              console.log(
                "Hero is defending and focused, and resisted the attack. No damage taken."
              );

              battlelog.value =
                "The hero is defending and focused, and resisted the attack. No damage taken" +
                "\n" +
                battlelog.value;
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
              battlelog.value =
                "The hero is defending, but the enemy hit a critical blow. The hero takes full damage: " +
                damage +
                "\n" +
                battlelog.value;
              gladiators[gameScenario].focused = false; // Removes the attackers focused state
            } else {
              // Normal hit on defending but not focused hero
              gladiators[0].hp -= damage / 2;
              console.log(
                "Hero is defending but not focused. Hero takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "The hero is defending but not focused. The hero takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            }
          }
        } else {
          // Hero is not defending
          if (isCritical) {
            console.log(
              "Enemy is hitting a critical blow. Hero takes full damage:",
              damage
            );
            battlelog.value =
              "The enemy is hitting a critical blow. The hero takes full damage: " +
              damage +
              "\n" +
              battlelog.value;
            gladiators[gameScenario].focused = false; // Removes the attackers focused state
          } else {
            console.log("Hero takes full damage:", damage);
            battlelog.value =
              "The hero takes full damage: " + damage + "\n" + battlelog.value;
          }
          gladiators[0].hp -= damage;
        }
        gladiators[gameScenario].critic = false; // Reset the critical state after the hit
      }
    }

    if (actsNow == 1) {
      if (EnemysAction == "attack") {
        console.log("Enemy attacks");
        battlelog.value = "Enemy attacks\n" + battlelog.value;

        let damage = gladiators[gameScenario].dealDamage();
        let isCritical = gladiators[gameScenario].critic;
        console.log("Intended damage", damage);
        battlelog.value = "Intended damage: " + damage + "\n" + battlelog.value;

        if (herosAction == "defend") {
          if (gladiators[0].focused) {
            if (isCritical) {
              console.log(
                "Hero is defending and focused, but the enemy hit a critical blow. Hero takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "Hero is defending and focused, but the enemy hit a critical blow. Hero takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            } else {
              console.log(
                "Hero is defending and focused, and resisted the attack. No damage taken."
              );
              battlelog.value =
                "Hero is defending and focused, and resisted the attack. No damage taken." +
                "\n" +
                battlelog.value;
            }
          } else {
            if (isCritical) {
              console.log(
                "Hero is defending, but the enemy hit a critical blow. Hero takes full damage:",
                damage
              );
              battlelog.value =
                "Hero is defending, but the enemy hit a critical blow. Hero takes full damage: " +
                damage +
                "\n" +
                battlelog.value;
            } else {
              console.log(
                "Hero is defending but not focused. Hero takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "Hero is defending but not focused. Hero takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            }
          }
        } else {
          if (isCritical) {
            console.log(
              "Enemy is hitting a critical blow. Hero takes full damage:",
              damage
            );
            battlelog.value =
              "Enemy is hitting a critical blow. Hero takes full damage: " +
              damage +
              "\n" +
              battlelog.value;
          } else {
            console.log("Hero takes full damage:", damage);
            battlelog.value =
              "Hero takes full damage: " + damage + "\n" + battlelog.value;
          }
        }
      }

      if (herosAction == "attack") {
        console.log("Hero attacks");
        battlelog.value = "Hero attacks\n" + battlelog.value;

        let damage = gladiators[0].dealDamage();
        let isCritical = gladiators[0].critic;
        console.log("The intended damage is ", damage);
        battlelog.value =
          "The intended damage is " + damage + "\n" + battlelog.value;

        if (EnemysAction == "defend") {
          if (gladiators[gameScenario].focused) {
            if (isCritical) {
              console.log(
                "Enemy was defending and focused, but the hero hit a critical blow. Enemy takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "Enemy was defending and focused, but the hero hit a critical blow. Enemy takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            } else {
              console.log(
                "Enemy was defending and focused, and resisted the attack. No damage taken."
              );
              battlelog.value =
                "Enemy was defending and focused, and resisted the attack. No damage taken." +
                "\n" +
                battlelog.value;
            }
          } else {
            if (isCritical) {
              console.log(
                "Enemy was defending, but the hero hit a critical blow. Enemy takes full damage:",
                damage
              );
              battlelog.value =
                "Enemy was defending, but the hero hit a critical blow. Enemy takes full damage: " +
                damage +
                "\n" +
                battlelog.value;
            } else {
              console.log(
                "Enemy was defending but not focused. Enemy takes reduced damage:",
                damage / 2
              );
              battlelog.value =
                "Enemy was defending but not focused. Enemy takes reduced damage: " +
                damage / 2 +
                "\n" +
                battlelog.value;
            }
          }
        } else {
          if (isCritical) {
            console.log(
              "Hero is hitting a critical blow. Enemy takes full damage:",
              damage
            );
            battlelog.value =
              "Hero is hitting a critical blow. Enemy takes full damage: " +
              damage +
              "\n" +
              battlelog.value;
          } else {
            console.log("Enemy takes full damage:", damage);
            battlelog.value =
              "Enemy takes full damage: " + damage + "\n" + battlelog.value;
          }
        }
      }
    }

    if (herosAction != "attack" && EnemysAction != "attack") {
      console.log("paso por aca");
      if (herosAction == "defend") {
        console.log("The hero will heal from his defending position");
        battlelog.value =
          "The hero will heal from his defending position\n" + battlelog.value;

        let heal = gladiators[0].healDefending();
        //  let focusModifier = 1;

        if (gladiators[0].focused == true) {
          console.log("The hero will use his focus to heal more");
          battlelog.value =
            "The hero will use his focus to heal more\n" + battlelog.value;

          //     focusModifier = 2;
          gladiators[0].focused = false;
        }
        console.log("The hero will heal", heal);
        battlelog.value =
          "The hero will heal: " + heal + "\n" + battlelog.value;

        if (gladiators[0].hp >= gladiators[0].maxHP) {
          console.log("The hero has now Max HP!");
          battlelog.value = "The hero has now Max HP!\n" + battlelog.value;
        }
        console.log("The hero HP is now ", gladiators[0].hp);
        battlelog.value =
          "The hero HP is now " + gladiators[0].hp + "\n" + battlelog.value;
      }

      if (EnemysAction == "defend") {
        console.log("The enemy will heal from his defending position");
        battlelog.value =
          "The enemy will heal from his defending position\n" + battlelog.value;

        let heal = gladiators[gameScenario].healDefending();
        //   let focusModifier = 1;

        if (gladiators[gameScenario].focused == true) {
          console.log("The enemy will use his focus to heal more");
          battlelog.value =
            "The enemy will use his focus to heal more\n" + battlelog.value;

          //  focusModifier = 2;
          gladiators[gameScenario].focused = false;
        }
        console.log("The enemy will heal", heal);
        battlelog.value =
          "The enemy will heal: " + heal + "\n" + battlelog.value;

        if (gladiators[gameScenario].hp >= gladiators[gameScenario].maxHP) {
          console.log("The enemy has now Max HP!");
          battlelog.value = "The enemy has now Max HP!\n" + battlelog.value;
        }
        console.log("The enemy HP is now ", gladiators[gameScenario].hp);
        battlelog.value =
          "The enemy HP is now " +
          gladiators[gameScenario].hp +
          "\n" +
          battlelog.value;
      }
    }

    EnemysAction = ""; //Resets the Enemys Action
    herosAction = ""; // Resets the Heros Action
    turnNumber++; // Adds one more turn
    updateGraphicsBattle(0, gameScenario, "hero"); //Updates graphics and hp bars of the hero
    updateGraphicsBattle(gameScenario, gameScenario, "Enemy"); // Update graphics and hp bars of the enemy

    await randomWaitForTurn(); //Adds a little wait

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
      battleState = "victory";
    } else {
      battleState = "defeat";
    }
  } else {
    if (gladiators[0].hp <= 0) {
      battleState = "defeat";
    } else if (gladiators[gameScenario].hp <= 0) {
      battleState = "victory";
    }
  }
  if (gladiators[0].hp >= 1 && gladiators[gameScenario].hp >= 1) {
    battleState = "ongoing";
  }

  if (battleState == "victory" || battleState == "defeat") {
    battleResultsContent();
  }
}

function battleResultsContent() {
  //creating OBJS
  let HeroData = {
    id: gladiators[0].id,
    username: gladiators[0].username,
    name: gladiators[0].name,
    level: gladiators[0].level,
    somatotype: gladiators[0].somatotype,
    height: gladiators[0].height,
    weight: gladiators[0].weight,
    constitution: gladiators[0].constitution,
    dexterity: gladiators[0].dexterity,
    strength: gladiators[0].strength,
    speed: gladiators[0].speed,
    luck: gladiators[0].luck,
    maxHP: gladiators[0].maxHP,
    hp: gladiators[0].hp,
    localvictories: gladiators[0].localvictories,
    onlineVictories: gladiators[0].onlineVictories,
    totalVictories: gladiators[0].totalVictories,
    //avoiding circular reference defeatedEnemies: gladiators[0].defeatedEnemies,
    //avoiding circular reference diedAgainst: gladiators[0].diedAgainst,
    critic: gladiators[0].critic,
    focused: gladiators[0].focused,
    weapon: gladiators[0].weapon,
    weaponSRC: gladiators[0].weaponSRC,
    bodySRC: gladiators[0].bodySRC,
    headSRC: gladiators[0].headSRC,
    weaponURL: gladiators[0].weaponURL,
    bodyURL: gladiators[0].bodyURL,
    headURL: gladiators[0].headURL,
  };
  let EnemyData = {
    id: gladiators[gameScenario].id,
    username: gladiators[gameScenario].username,
    name: gladiators[gameScenario].name,
    level: gladiators[gameScenario].level,
    somatotype: gladiators[gameScenario].somatotype,
    height: gladiators[gameScenario].height,
    weight: gladiators[gameScenario].weight,
    constitution: gladiators[gameScenario].constitution,
    dexterity: gladiators[gameScenario].dexterity,
    strength: gladiators[gameScenario].strength,
    speed: gladiators[gameScenario].speed,
    luck: gladiators[gameScenario].luck,
    maxHP: gladiators[gameScenario].maxHP,
    hp: gladiators[gameScenario].hp,
    localvictories: gladiators[gameScenario].localvictories,
    onlineVictories: gladiators[gameScenario].onlineVictories,
    totalVictories: gladiators[gameScenario].totalVictories,
    //avoiding circular reference defeatedEnemies: gladiators[gameScenario].defeatedEnemies,
    //avoiding circular reference diedAgainst: gladiators[gameScenario].diedAgainst,
    critic: gladiators[gameScenario].critic,
    focused: gladiators[gameScenario].focused,
    weapon: gladiators[gameScenario].weapon,
    weaponSRC: gladiators[gameScenario].weaponSRC,
    bodySRC: gladiators[gameScenario].bodySRC,
    headSRC: gladiators[gameScenario].headSRC,
    weaponURL: gladiators[gameScenario].weaponURL,
    bodyURL: gladiators[gameScenario].bodyURL,
    headURL: gladiators[gameScenario].headURL,
  };

  //creating OBJS
  let battlelog = document.getElementById(gameScenario + "battleLog");
  if (battleState == "victory") {
    console.log(
      "You have successfully defeated " +
        gladiators[gameScenario].name +
        " and you will always remember it."
    );
    battlelog.value =
      "You have successfully defeated " +
      gladiators[gameScenario].name +
      " and you will always remember it." +
      "\n" +
      battlelog.value;

    gladiators[gameScenario].diedAgainst.push(HeroData); // It updates the enemys object with being killed by our hero
    gladiators[0].defeatedEnemies.push(EnemyData); //It adds the defeated Gladiator to our defeated enemies list
    gladiators[0].localvictories++; //It adds one victory to our list
    gladiators[0].totalVictories = //The total amount of victories is offline + online victories
      gladiators[0].localvictories + gladiators[0].onlineVictories;
    console.log(
      "Your gladiator has won " + gladiators[0].totalVictories + " battles"
    );
    battlelog.value =
      "Your gladiator has won " +
      gladiators[0].totalVictories +
      " battles" +
      "\n" +
      battlelog.value;

    gameScenario++; //It moves the player to the next scenario
    gladiators[0].level = gameScenario;
    gladiators[0].levelingUpStats();
  }
  if (battleState == "defeat") {
    gladiators[0].diedAgainst.push(EnemyData); //If we lose, it adds to our gladiator who killed us
    gladiators[gameScenario].defeatedEnemies.push(HeroData); //It adds our hero to the enemies defeated gladiators list
    gladiators[gameScenario].localvictories++; //It adds a victory for the enemy
    gladiators[gameScenario].totalVictories = //The total victories for the enemy are its local victories since enemies cannot play online
      gladiators[gameScenario].localvictories;

    console.log("You have been defeated by " + gladiators[gameScenario].name);
    battlelog.value =
      "You have been defeated by " +
      gladiators[gameScenario].name +
      "\n" +
      battlelog.value;
  }
}

function TwitchUsersActionsBtns(boolean) {
  //If false, the buttones are active, if true the buttons are deactivated
  document.getElementById(String(gameScenario) + "AttackButton").disabled =
    boolean;
  document.getElementById(String(gameScenario) + "DefendButton").disabled =
    boolean;
  document.getElementById(String(gameScenario) + "FocusButton").disabled =
    boolean;
}

// Function that makes the user able to play their turn
function usersTurn() {
  let battlelog = document.getElementById(gameScenario + "battleLog");
  console.log("It is the Heros Turn");
  battlelog.value = "It is the hero's turn\n" + battlelog.value;

  TwitchUsersActionsBtns(false);

  document.getElementById(gameScenario + "textWhossTurn").innerText =
    "Your turn";
}

async function herosActionClick(target) {
  let battlelog = document.getElementById(gameScenario + "battleLog");

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
  battlelog.value = "The hero will " + herosAction + "\n" + battlelog.value;

  TwitchUsersActionsBtns(true); //Deactivates the heroe buttons

  await randomWaitForTurn(); //Adds a little wait

  WhosTurn = 1; // Gives the turn to the enemy
  turnUpdate(); // Calls the turnUpdate function which will at some point settle the turn and go to the next one
}

async function enemysTurn() {
  let battlelog = document.getElementById(gameScenario + "battleLog");

  console.log("It is the Enemy's Turn");
  battlelog.value = "It is the enemy's turn\n" + battlelog.value;

  await randomWaitForTurn(); // Adds a little wait

  // Show the "thinking" icon for the enemy
  document.getElementById(gameScenario + "EnemyActionIcon").src =
    "img/icons/iconThinking.png";

  // Disable hero's action buttons since it's the enemy's turn
  TwitchUsersActionsBtns(true);

  // Indicate it's the enemy's turn
  document.getElementById(gameScenario + "textWhossTurn").innerText =
    "Enemy's turn";

  await randomWaitForTurn(); // Adds a little wait
  await randomWaitForTurn(); // Adds a little wait
  await randomWaitForTurn(); // Adds a little wait

  // Determine the enemy's action
  if (
    gladiators[0].hp <= gladiators[0].maxHP / 2 &&
    gladiators[gameScenario].hp >= gladiators[gameScenario].maxHP / 2
  ) {
    console.log("The enemy identifies your weakness and will attack!");
    battlelog.value =
      "The enemy identifies your weakness and will attack!\n" + battlelog.value;
    EnemysAction = "attack";
  } else if (gladiators[gameScenario].focused) {
    let action = randomiseNumber(0, 1); // Randomly choose between attack or defend
    EnemysAction = action === 0 ? "defend" : "attack";
    battlelog.value =
      "The enemy chooses to " + EnemysAction + "\n" + battlelog.value;
  } else {
    let action = randomiseNumber(0, 3); // Randomly choose between attack (2/4 chance), defend (1/4), or focus (1/4)
    if (action === 0) {
      EnemysAction = "defend";
    } else if (action === 1 || action === 2) {
      EnemysAction = "attack";
    } else if (action === 3) {
      EnemysAction = "focus";
      gladiators[gameScenario].focused = true;
    }
    battlelog.value =
      "The enemy chooses to " + EnemysAction + "\n" + battlelog.value;
  }

  console.log("Enemy's action", EnemysAction);
  battlelog.value = "Enemy's action: " + EnemysAction + "\n" + battlelog.value;

  document.getElementById(gameScenario + "EnemyActionIcon").src =
    "img/icons/iconActionTaken.png";

  await randomWaitForTurn(); // Adds a little wait
  await randomWaitForTurn(); // Adds a little wait

  // After the enemy's action, update the turn and check if the hero is still alive
  turnUpdate();

  // Check if the hero is still alive
  if (gladiators[0].hp > 0) {
    WhosTurn = 0; // Make it the hero's turn if they are still alive
  } else {
    console.log("The hero has been defeated!");
    battlelog.value = "The hero has been defeated!\n" + battlelog.value;
    // Handle end of game, e.g., show a defeat screen or reset the game state
  }
}

async function randomWaitForTurn() {
  let randomwait = randomiseNumber(750, 1400);
  //  console.log(randomwait);
  await loadingEffect("transparent", randomwait);
}

// Function that calculates who starts the combat
function whoStartsCombat() {
  let battlelog = document.getElementById(gameScenario + "battleLog");
  battlelog.value = "Start of combat";
  battlelog.value =
    gladiators[0].name +
    " against " +
    gladiators[gameScenario].name +
    "\n" +
    battlelog.value;

  // First, check if speeds are the same
  if (gladiators[0].speed == gladiators[gameScenario].speed) {
    // If speeds are the same, check the HP
    if (gladiators[0].hp == gladiators[gameScenario].hp) {
      // If both speed and HP are the same, choose randomly
      WhosTurn = randomiseNumber(0, 1);
    } else {
      // If HP is different, the one with more HP starts
      if (gladiators[0].hp > gladiators[gameScenario].hp) {
        WhosTurn = 0; // Hero starts
      } else {
        WhosTurn = 1; // Enemy starts
      }
    }
  } else {
    // If speed is different, the one with the greater speed starts
    if (gladiators[0].speed > gladiators[gameScenario].speed) {
      WhosTurn = 0; // Hero starts
    } else {
      WhosTurn = 1; // Enemy starts
    }
  }

  // Set the turn and update the battle log
  if (WhosTurn == 0) {
    // If the hero starts combat, his turn actions are enabled, otherwise disabled
    TwitchUsersActionsBtns(false);

    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Your turn";
    battlelog.value = "Hero's turn \n" + battlelog.value;
  } else if (WhosTurn == 1) {
    TwitchUsersActionsBtns(true);

    document.getElementById(gameScenario + "EnemyActionIcon").src =
      "img/icons/iconThinking.png"; // Sets the action icon

    document.getElementById(gameScenario + "textWhossTurn").innerText =
      "Enemy's turn";
    battlelog.value = "Enemy's turn \n" + battlelog.value;
  }
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
