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

  document.getElementById("heroHeightText").innerText =
    "HGT: " + gladiators[0].height + " cm";
  document.getElementById("heroWeightText").innerText =
    "WGT: " + gladiators[0].height + " kg";
  document.getElementById("heroSomatotypeText").innerText =
    gladiators[0].somatotype;

  document.getElementById("heroWeaponCreationScrenText").style.backgroundImage =
    "url(" + gladiators[0].weaponSRC + ")";
  document.getElementById("heroStrenghtCreationScrenText").innerText =
    gladiators[0].strength;
  document.getElementById("heroDexterityCreationScrenText").innerText =
    gladiators[0].dexterity;
  document.getElementById("heroConstitutionCreationScrenText").innerText =
    gladiators[0].constitution;
  document.getElementById("heroLuckCreationScrenText").innerText =
    gladiators[0].luck;
  document.getElementById("heroSpeedCreationScrenText").innerText =
    gladiators[0].speed;

  if (gladiators[0].localvictories == 0) {
    document.getElementById("heroLastBattle").style.display = "none";
    document.getElementById("heroVictories").style.display = "none";
  } else {
    document.getElementById("heroLastBattle").style.display = "";
    document.getElementById("heroVictories").style.display = "";

    document.getElementById("heroTotalVictoriesText").innerText =
      "Victories: " + gladiators[0].totalVictories;
    document.getElementById("heroLocalVictoriesText").innerText =
      "Local: " + gladiators[0].localvictories;
    document.getElementById("heroOnlineVictoriesText").innerText =
      "Online: " + gladiators[0].onlineVictories;

    document.getElementById("heroLastBattleName").innerText =
      "Name: " + gladiators[0]?.defeatedEnemies?.at(-1)?.name;

    document.getElementById("heroLastBattleLevel").innerText =
      "Level: " + gladiators[0]?.defeatedEnemies?.at(-1)?.level;

    document.getElementById("heroLastHP").innerText =
      "HP: " + gladiators[0]?.defeatedEnemies?.at(-1)?.maxHP;

    document.getElementById("heroBodyLastEnemyDefeated").style.backgroundImage =
      "url(" + gladiators[0]?.defeatedEnemies?.at(-1)?.bodySRC + ")";
    document.getElementById("heroBodyLastEnemyDefeated").style.height =
      gladiators[0]?.defeatedEnemies?.at(-1)?.height / 2 + "px";
    document.getElementById("heroBodyLastEnemyDefeated").style.width =
      gladiators[0]?.defeatedEnemies?.at(-1)?.weight / 2.3 + "px";
    //
    document.getElementById("heroFaceLastEnemyDefeated").style.backgroundImage =
      "url(" + gladiators[0]?.defeatedEnemies?.at(-1)?.headSRC + ")";
    document.getElementById("heroFaceLastEnemyDefeated").style.width =
      gladiators[0]?.defeatedEnemies?.at(-1)?.weight / 4.3 + "px";
    document.getElementById("heroFaceLastEnemyDefeated").style.height =
      ((3.75 * gladiators[0]?.defeatedEnemies?.at(-1)?.height) / 22, 5) * 3.8 +
      "px";
  }

  if (gladiators[0].hp < 1) {
    document.getElementById("heroHPBarCreationScreen").style.backgroundColor =
      "coral";
  }
}

async function goingBattle() {
  window.location.href = `battle.html?id=${gladiators[0].id}&level=${gladiators[0].level}&strength=${gladiators[0].strength}&dexterity=${gladiators[0].dexterity}&constitution=${gladiators[0].constitution}&luck=${gladiators[0].luck}&speed=${gladiators[0].speed}&maxHP=${gladiators[0].maxHP}`;
}
