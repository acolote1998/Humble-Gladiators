var idHero = getHeroIDfromURL("id");
var heroLvlBefore = Number(getHeroIDfromURL("level"));
var heroStrBefore = Number(getHeroIDfromURL("strength"));
var heroDexBefore = Number(getHeroIDfromURL("dexterity"));
var heroConBefore = Number(getHeroIDfromURL("constitution"));
var heroLuckBefore = Number(getHeroIDfromURL("luck"));
var heroSpeedBefore = Number(getHeroIDfromURL("speed"));
var heroStrBefore = Number(getHeroIDfromURL("strength"));
var heroHPbefore = Number(getHeroIDfromURL("maxHP"));

var gladiators = [];

levelUpScreen(); //gets hero from the DB and builds the JS of the level up screen

async function levelUpScreen() {
  await getHeroFromDB();

  document.getElementById("heroName").innerText = gladiators[0].name;
  document.getElementById("heroLevel").innerText =
    "Level: " +
    heroLvlBefore +
    "→ " +
    gladiators[0].level +
    " (+" +
    (gladiators[0].level - heroLvlBefore) +
    ")";

  document.getElementById("heroHPBarCreationScreen").value =
    heroHPbefore +
    " → " +
    gladiators[0].maxHP +
    " (+" +
    (gladiators[0].maxHP - heroHPbefore) +
    ")";

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

  // Strength stat
  document.getElementById("heroStrenghtCreationScrenText").innerText =
    heroStrBefore +
    " → " +
    gladiators[0].strength +
    " (+" +
    (gladiators[0].strength - heroStrBefore) +
    ")";

  // Dexterity stat
  document.getElementById("heroDexterityCreationScrenText").innerText =
    heroDexBefore +
    " → " +
    gladiators[0].dexterity +
    " (+" +
    (gladiators[0].dexterity - heroDexBefore) +
    ")";

  // Constitution stat
  document.getElementById("heroConstitutionCreationScrenText").innerText =
    heroConBefore +
    " → " +
    gladiators[0].constitution +
    " (+" +
    (gladiators[0].constitution - heroConBefore) +
    ")";

  // Luck stat
  document.getElementById("heroLuckCreationScrenText").innerText =
    heroLuckBefore +
    " → " +
    gladiators[0].luck +
    " (+" +
    (gladiators[0].luck - heroLuckBefore) +
    ")";

  // Speed stat
  document.getElementById("heroSpeedCreationScrenText").innerText =
    heroSpeedBefore +
    " → " +
    gladiators[0].speed +
    " (+" +
    (gladiators[0].speed - heroSpeedBefore) +
    ")";
}
