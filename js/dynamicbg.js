var bgTypeToFightIn = randomiseNumber(0, 0); //Choose the type of battlemap (at the moment only 1 available (it is the number zero))
var bgSpecificToFightIn = randomiseNumber(0, 2); //Choose which map of that type of battlemap (3 available)

//Updates The Graphics and Element's structure of the chosen battleground type
if (bgTypeToFightIn == 0) {
  //Sets up the structure

  //////////////
  // Layer 0
  //////////////
  {
    //Row 0
    document.getElementById("0bgWall0").style.height = "50%";
    // Cols
    for (let i = 1; i < 13; i++) {
      if (i < 10) {
        document.getElementById("col0" + i).style.width = "8.33%";
      } else {
        document.getElementById("col" + i).style.width = "8.33%";
      }
    }
    //////////////
    //Row 1
    document.getElementById("0bgWall1").outerHTML = "";
    //////////////
    //Row 2
    document.getElementById("0bgWall2").outerHTML = "";
    //////////////
    //Row 3
    document.getElementById("0bgFloor3").style.height = "50%";
    // Cols
    for (let i = 37; i < 49; i++) {
      document.getElementById("col" + i).style.width = "8.33%";
    }
    //////////////
    //Row 4
    document.getElementById("0bgFloor4").outerHTML = "";
    //////////////
    //Row 5
    document.getElementById("0bgFloor5").outerHTML = "";
  }
  //////////////
  // Layer 1
  //////////////
  {
    //Row 0
    document.getElementById("1bg0").style.height = "50%";
    // Cols
    for (let i = 0; i < 12; i++) {
      document.getElementById("1col" + i).style.width = "8.33%";
      if (i == 4) {
        document.getElementById("1col" + i).style.width = "33.33%";
        document.getElementById("1col" + i).classList.remove("col-1");
        document.getElementById("1col" + i).classList.add("col-4");
      }
      if (i == 5) {
        document.getElementById("1col" + i).style.width = "33.33%";
        document.getElementById("1col" + i).classList.remove("col-1");
        document.getElementById("1col" + i).classList.add("col-4");
      }
      if (i > 5) {
        document.getElementById("1col" + i).outerHTML = "";
      }
    }
    //Row 1
    document.getElementById("1bg1").outerHTML = "";
    //Row 2
    document.getElementById("1bg2").outerHTML = "";
    //Row 3
    document.getElementById("1bg3").style.height = "16.6%";
    // Cols
    for (let i = 1; i < 7; i++) {
      document.getElementById("statue" + i).style.width = "8.33%";
    }
    for (let i = 1; i < 7; i++) {
      document.getElementById("statuegap" + i).style.width = "8.33%";
    }
    //Row 4
    document.getElementById("1bg4").style.height = "16.6%";
    // Cols
    document.getElementById("1bg4-1").classList.remove("col-1");
    document.getElementById("1bg4-1").classList.add("col-12");
    document.getElementById("1bg4-1").style.width = "100%";
    for (let i = 2; i < 13; i++) {
      document.getElementById("1bg4-" + i).outerHTML = "";
    }
    //Row 5
    document.getElementById("1bg5").style.height = "16.6%";
    // Cols
    for (let i = 7; i < 13; i++) {
      document.getElementById("statue" + i).style.width = "8.33%";
    }
    for (let i = 7; i < 13; i++) {
      document.getElementById("statuegap" + i).style.width = "8.33%";
    }
  }
  //////////////
  // Layer 2
  //////////////
  {
    //Row 0
    document.getElementById("2bg0").style.height = "50%";
    // Cols
    document.getElementById("2bg0-0").style.width = "8.33%";
    for (let i = 0; i < 4; i++) {
      document.getElementById("2bgWallDetail" + i).style.width = "8.33%";
    }
    document.getElementById("2bg0-2").style.width = "8.33%";
    document.getElementById("2bg0-4").classList.remove("col-1");
    document.getElementById("2bg0-4").classList.add("col-5");
    document.getElementById("2bg0-4").style.width = "41.65%";

    for (let i = 5; i < 9; i++) {
      document.getElementById("2bg0-" + i).outerHTML = "";
    }
    document.getElementById("2bg0-10").style.width = "8.33%";
    //Row 1
    document.getElementById("2bg1").outerHTML = "";
    //Row 2
    document.getElementById("2bg2").outerHTML = "";
    //Row 3
    document.getElementById("2bg3").style.height = "16.66%";
    // Cols
    document.getElementById("2bg3-0").classList.remove("col-1");
    document.getElementById("2bg3-0").classList.add("col-12");
    document.getElementById("2bg3-0").style.width = "100%";

    for (let i = 1; i < 12; i++) {
      document.getElementById("2bg3-" + i).outerHTML = "";
    }
    //Row 4
    document.getElementById("2bg4").style.height = "16.66%";
    // Cols
    document.getElementById("2bg4-0").classList.remove("col-1");
    document.getElementById("2bg4-0").classList.add("col-12");
    document.getElementById("2bg4-0").style.width = "100%";

    for (let i = 1; i < 12; i++) {
      document.getElementById("2bg4-" + i).outerHTML = "";
    }
    //Row 5
    document.getElementById("2bg5").style.height = "16.66%";
    // Cols
    document.getElementById("2bg5-0").style.width = "8.33%";
    for (let i = 0; i < 2; i++) {
      document.getElementById("2bgFloorDetail" + i).style.width = "8.33%";
    }
    document.getElementById("2bg5-2").style.width = "58.31%";
    document.getElementById("2bg5-2").classList.remove("col-1");
    document.getElementById("2bg5-2").classList.add("col-7");
    for (let i = 3; i < 9; i++) {
      document.getElementById("2bg5-" + i).outerHTML = "";
    }
    document.getElementById("2bg5-10").style.width = "8.33%";
    document.getElementById("2bg5-11").style.width = "8.33%";
  }
  //////////////
  // Updating graphics
  //////////////
  {
    //Updates the wall graphics
    document.getElementById("0bgWall0").style.backgroundImage =
      "url(img/backgrounds/battleScenarioType/0/" +
      bgSpecificToFightIn +
      "/walls/0.png)";

    //Updates the floor graphics
    document.getElementById("0bgFloor3").style.backgroundImage =
      "url(img/backgrounds/battleScenarioType/0/" +
      bgSpecificToFightIn +
      "/floors/0.png)";

    // Updates the door graphics
    document.getElementById("1col4").style.backgroundImage =
      "url(img/backgrounds/battleScenarioType/0/" +
      bgSpecificToFightIn +
      "/bigDoors/0.png)";

    // Updates the door graphics
    document.getElementById("1col4").style.backgroundImage =
      "url(img/backgrounds/battleScenarioType/0/" +
      bgSpecificToFightIn +
      "/bigDoors/0.png)";

    // Updates the statues graphics  50% of chance of showing the statue
    for (let i = 1; i < 13; i++) {
      if (randomiseNumber(0, 1) == 1) {
        document.getElementById("statue" + i).style.backgroundImage =
          "url(img/backgrounds/battleScenarioType/0/" +
          bgSpecificToFightIn +
          "/decorations/gargoyle.png)";
      } else {
        document.getElementById("statue" + i).style.backgroundImage = "url()";
      }
    }

    // Updates the wall details. 75% of chance of showing the detail
    for (let i = 0; i < 4; i++) {
      if (randomiseNumber(0, 3) != 0) {
        document.getElementById("2bgWallDetail" + i).style.backgroundImage =
          "url(img/backgrounds/battleScenarioType/0/" +
          bgSpecificToFightIn +
          "/walls/details/" +
          i +
          ".png)";
      } else {
        document.getElementById("2bgWallDetail" + i).style.backgroundImage =
          "url()";
      }
    }

    // Updates the floor details 75% of chance of showing the detail
    for (let i = 0; i < 2; i++) {
      if (randomiseNumber(0, 3) != 0) {
        document.getElementById("2bgFloorDetail" + i).style.backgroundImage =
          "url(img/backgrounds/battleScenarioType/0/" +
          bgSpecificToFightIn +
          "/floors/details/" +
          i +
          ".png)";
      } else {
        document.getElementById("2bgFloorDetail" + i).style.backgroundImage =
          "url()";
      }
    }
  }
}
