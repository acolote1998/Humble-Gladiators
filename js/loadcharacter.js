var usernameHero = getHeroIDfromURL("username");

var gladiators = [];

loadSavedHerosToDocument();

async function loadSavedHerosToDocument() {
  //Plays music
  document.getElementById("loadingCharacters").play();
  document.getElementById("loadingCharacters").volume = 0;
  increaseSound("loadingCharacters");
  //
  await loadCharactersFromDB();

  loadAllSavedHeros();
}

async function loadCharactersFromDB() {
  const response = await fetch("sql/savedHero.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "username=" + usernameHero, // Pass the ID in the POST body
  });

  const data = await response.json();

  // Check for errors
  if (data.error) {
    console.error(data.error);
    return;
  }

  // Process each gladiator in the returned array
  data.forEach((gladiatorData) => {
    let newGladiator = new Gladiator(
      gladiatorData.name,
      gladiatorData.height,
      gladiatorData.weight,
      gladiatorData.somatotype,
      gladiatorData.weapon,
      gladiatorData.constitution,
      gladiatorData.luck,
      gladiatorData.speed,
      gladiatorData.username,
      gladiatorData.level
    );

    // Add additional properties to the gladiator
    newGladiator.id = Number(gladiatorData.id);
    newGladiator.localvictories = Number(gladiatorData.localvictories);
    newGladiator.onlineVictories = Number(gladiatorData.onlineVictories);
    newGladiator.totalVictories = Number(gladiatorData.totalVictories);
    newGladiator.defeatedEnemies = gladiatorData.defeatedEnemies;
    newGladiator.diedAgainst = gladiatorData.diedAgainst;
    newGladiator.critic = gladiatorData.critic;
    newGladiator.focused = gladiatorData.focused;
    newGladiator.weaponSRC = gladiatorData.weaponSRC;
    newGladiator.bodySRC = gladiatorData.bodySRC;
    newGladiator.headSRC = gladiatorData.headSRC;
    newGladiator.maxHP = Number(gladiatorData.maxHP);
    newGladiator.hp = Number(gladiatorData.hp);
    newGladiator.dexterity = Number(gladiatorData.dexterity);
    newGladiator.strength = Number(gladiatorData.strength);

    // Parse JSON attributes if applicable
    try {
      if (newGladiator.defeatedEnemies && newGladiator.defeatedEnemies !== "") {
        newGladiator.defeatedEnemies = JSON.parse(newGladiator.defeatedEnemies);
      }
    } catch (e) {
      console.error("Failed to parse defeatedEnemies:", e);
    }

    try {
      if (newGladiator.diedAgainst && newGladiator.diedAgainst !== "") {
        newGladiator.diedAgainst = JSON.parse(newGladiator.diedAgainst);
      }
    } catch (e) {
      console.error("Failed to parse diedAgainst:", e);
    }

    // Push the gladiator to the array
    gladiators.push(newGladiator);
  });
}

function loadAllSavedHeros() {
  for (let i = 0; i < gladiators.length; i++) {
    let deadOrNot = 0;
    if (gladiators[i].hp < 1) {
      deadOrNot = '<img src="img/icons/deadGladiator.png">';
    } else {
      deadOrNot = "";
    }

    document.getElementById("heroRightColumnDiv").insertAdjacentHTML(
      "afterbegin",
      `
        <div
          class="row"
          id="heroSaved` +
        i +
        `"
          style="background-size: cover; background-size: 100% 100%; width: 95%;"
        >
  
          <div
            class="creatingScreenStats"
            style="width: 100%; display: flex; height: 100%"
          >
            <!-- Columna izquierda -->
            <div
              class="col-4"
              style="
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
              "
              id="heroSavedDraw` +
        i +
        `"
            >
              <!-- Hero Face -->
              <div
                id="heroFace` +
        i +
        `"
                style="
        background-size: 100% 100%;
        width: 20px;
        height: 19px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
                "
              ></div>
              <!-- Hero Body -->
              <div
                id="heroBody` +
        i +
        `"
                style="        background-size: 100% 100%;

        display: flex;
        justify-content: center;
        align-items: flex-end;
                "
              ></div>
            </div>
            <!-- Columna derecha -->
            <div
              class="col-3"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <div class="row"><span class="tituloChico crimsonFont" id="heroName` +
        i +
        `"></span></div>
             
              <div class="row"><span class="subtitulo crimsonFont" id="heroLevel` +
        i +
        `"></span></div>
              <div class="row"><span class="subtitulo crimsonFont" id="heroHP` +
        i +
        `"></span></div>
            </div>
            <div class="col-1">` +
        deadOrNot +
        `</div>
            <div
              class="col-4"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
<button class="crimsonFont" onclick="window.location.href='home.html?id=${gladiators[i].id}'">Load Character</button>

</div>
          </div>
        </div>
        `
    );

    document.getElementById("heroName" + i).innerText =
      "Name: " + gladiators[i]?.name;

    document.getElementById("heroLevel" + i).innerText =
      "Level: " + gladiators[i]?.level;

    document.getElementById("heroHP" + i).innerText =
      "HP: " + gladiators[i]?.maxHP;

    document.getElementById("heroBody" + i).style.backgroundImage =
      "url(" + gladiators[i]?.bodySRC + ")";
    document.getElementById("heroBody" + i).style.height =
      (gladiators[i]?.height / 2) * 1.31 + "px";
    document.getElementById("heroBody" + i).style.width =
      (gladiators[i]?.weight / 2.3) * 1.31 + "px";
    //
    document.getElementById("heroFace" + i).style.backgroundImage =
      "url(" + gladiators[i]?.headSRC + ")";
    document.getElementById("heroFace" + i).style.width =
      (gladiators[i]?.weight / 4.3) * 1.31 + "px";
    document.getElementById("heroFace" + i).style.height =
      ((3.75 * gladiators[i]?.height) / 22, 5) * 3.8 * 1.31 + "px";
  }
}

function goingCharacterCreationScreen() {
  window.location.href = `index.html`;
}
