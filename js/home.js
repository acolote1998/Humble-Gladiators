function getHeroIDfromURL(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
var idHero = getHeroIDfromURL("id");
var gladiators = [];

function getHeroFromDB() {
  // Send this value to the PHP script using fetch
  fetch("sql/homeLoadHero.php", {
    method: "POST", // Or GET, depending on your need
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + idHero, // Pass the ID in the POST body
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      //console.log(data); // Log the full response for debugging
      gladiators.push(data);

      try {
        // Parse the defeatedEnemies attribute if it exists and is not empty
        if (
          gladiators[0].defeatedEnemies &&
          gladiators[0].defeatedEnemies !== ""
        ) {
          gladiators[0].defeatedEnemies = JSON.parse(
            gladiators[0].defeatedEnemies
          );
          //console.log("Parsed defeatedEnemies:", gladiators[0].defeatedEnemies);
        }
      } catch (e) {
        console.error("Failed to parse defeatedEnemies:", e);
      }

      try {
        // Parse the diedAgainst attribute if it exists and is not empty
        if (gladiators[0].diedAgainst && gladiators[0].diedAgainst !== "") {
          gladiators[0].diedAgainst = JSON.parse(gladiators[0].diedAgainst);
          //console.log("Parsed diedAgainst:", gladiators[0].diedAgainst);
        }
      } catch (e) {
        console.error("Failed to parse diedAgainst:", e);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function loadHeroToDocument() {
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
