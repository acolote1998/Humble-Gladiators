var idHero = getHeroIDfromURL("id");
var lvHero = getHeroIDfromURL("level");

var gladiators = [];

loadHeroToDocument();

async function loadHeroToDocument() {
  await getHeroFromDB();

  document.getElementById("heroName").innerText = gladiators[0].name;
  document.getElementById("heroLevel").innerText =
    "Level: " + gladiators[0].level;

  document.getElementById("heroHPBarCreationScreen").value =
    gladiators[0].hp + " / " + gladiators[0].maxHP;

  let heroFace = document.getElementById("heroFace");

  // Set the background size
  heroFace.style.backgroundSize = "100% 100%";

  // Set the width and height
  heroFace.style.width = gladiators[0].weight + "px"; // Heads width is 50% of bodies width
  heroFace.style.height = ((15 * gladiators[0].height) / 90) * 3 + "px"; // Adjust head height based on body height

  // Set the background image
  heroFace.style.backgroundImage = "url(" + gladiators[0].headSRC + ")";

  let heroBody = document.getElementById("heroBody");
  heroBody.style.backgroundSize = "100% 100%";
  heroBody.style.height = gladiators[0].height * 2 + "px"; // Body height
  heroBody.style.width = gladiators[0].weight * 2 + "px"; // Body width
  heroBody.style.backgroundImage = "url(" + gladiators[0].bodySRC + ")";

  loadAllDefeatedEnemies();
}

function loadAllDefeatedEnemies() {
  for (let i = 0; i < gladiators[0]?.defeatedEnemies.length; i++) {
    document.getElementById("heroRightColumnDiv").insertAdjacentHTML(
      "afterbegin",
      `
        <div
          class="row"
          id="heroDefeatedEnemy` +
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
              class="col-6"
              style="
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
              "
              id="heroEnemyDraw` +
        i +
        `"
            >
              <!-- Hero Face -->
              <div
                id="heroFaceEnemy` +
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
                id="heroBodyEnemy` +
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
              class="col-6"
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <div class="row"><h2>Last Enemy:</h2></div>
              <div class="row"><span id="heroNameEnemy` +
        i +
        `"></span></div>
              <div class="row"><span id="heroLevelEnemy` +
        i +
        `"></span></div>
              <div class="row"><span id="heroHPEnemy` +
        i +
        `"></span></div>
            </div>
          </div>
        </div>`
    );

    document.getElementById("heroNameEnemy" + i).innerText =
      "Name: " + gladiators[0]?.defeatedEnemies?.[i]?.name;

    document.getElementById("heroLevelEnemy" + i).innerText =
      "Level: " + gladiators[0]?.defeatedEnemies?.[i]?.level;

    document.getElementById("heroHPEnemy" + i).innerText =
      "HP: " + gladiators[0]?.defeatedEnemies?.[i]?.maxHP;

    document.getElementById("heroBodyEnemy" + i).style.backgroundImage =
      "url(" + gladiators[0]?.defeatedEnemies?.[i]?.bodySRC + ")";
    document.getElementById("heroBodyEnemy" + i).style.height =
      (gladiators[0]?.defeatedEnemies?.[i]?.height / 2) * 1.31 + "px";
    document.getElementById("heroBodyEnemy" + i).style.width =
      (gladiators[0]?.defeatedEnemies?.[i]?.weight / 2.3) * 1.31 + "px";
    //
    document.getElementById("heroFaceEnemy" + i).style.backgroundImage =
      "url(" + gladiators[0]?.defeatedEnemies?.[i]?.headSRC + ")";
    document.getElementById("heroFaceEnemy" + i).style.width =
      (gladiators[0]?.defeatedEnemies?.[i]?.weight / 4.3) * 1.31 + "px";
    document.getElementById("heroFaceEnemy" + i).style.height =
      ((3.75 * gladiators[0]?.defeatedEnemies?.[i]?.height) / 22, 5) *
        3.8 *
        1.31 +
      "px";
  }
}

async function goingBattle() {
  window.location.href = `battle.html?id=${gladiators[0].id}&level=${gladiators[0].level}`; //goes to the battle screen
}
