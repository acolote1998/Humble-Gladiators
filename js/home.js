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
      console.log(data); // Handle the response data here
      gladiators.push(data);
    })
    .catch((error) => console.error("Error:", error));
}
