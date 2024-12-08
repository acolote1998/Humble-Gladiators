function getHeroIDfromURL(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
var idHero = getHeroIDfromURL("id");
var gladiators = [];

function sendData() {
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
