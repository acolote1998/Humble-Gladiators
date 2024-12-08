var idHero = getHeroIDfromURL("id");

var gladiators = [];

loadHeroToDocument();

async function loadHeroToDocument() {
  await getHeroFromDB();

  document.getElementById("heroName").innerText = gladiators[0].name;

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
}

async function goingBattle() {
  window.location.href = `battle.html?id=${gladiators[0].id}`; //goes to the battle screen
}
