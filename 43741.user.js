// ==UserScript==
// @name           Set Game Solver
// @namespace      ttp://userscripts.org/users/69068
// @description    Finds all the valid sets.
// @include        http://thebreretons.com/setgame/*
// @include        http://www.thebreretons.com/setgame/*
// ==/UserScript==

(function() {

// "Solve/New Game" button.
var button = document.createElement("input");
button.setAttribute("type", "submit");
button.setAttribute("value", "Solve");
button.className = "solve";
button.addEventListener("click", function(e) { onButtonClick(); }, false);
var banner = document.getElementById("adsense2");
banner.parentNode.insertBefore(button, banner);

var cards = new Array(12);
var sets = new Array();
var n = 0;
var solved = false;

function onButtonClick() {
  if (solved) {
    window.location.reload();
  } else {
    findAllSets();
    solved = true;
    button.setAttribute("value", "New Game");
  }
}

function isSet(x, y, z) {
  for (var i=0; i<4; i++) {
    if (!isFeatureOk(x,y,z,i)) return false;
  }
  return true;
}

function isFeatureOk(x, y, z, i) {
  var xi = cards[x][i];
  var yi = cards[y][i];
  var zi = cards[z][i];
  if(xi==yi) {
    return xi==zi;
  } else {
    return xi!=zi && yi!=zi;
  }
}

function findAllSets() {

  // Read the cards.
  var cardCells = document.evaluate('//td[@class="card_cell"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < cardCells.snapshotLength; i++) {
    var code = cardCells.snapshotItem(i).firstChild.src;
    code = code.substring(code.length-8, code.length-4);
    cards[i] = code;
  }

  // Find sets.
  for(var i=0; i<12; i++) {
    for(var j=i+1; j<12; j++) {
      for (var k=j+1; k<12; k++) {
        if (isSet(i,j,k)) {
          sets[n] = [i,j,k];
          n++;
        }     
      }
    }
  }

  // Display solution.
  if (n!=6) alert(n + " sets!");
  n = (n<6) ? n : 6;
  document.getElementById("solution_count").textContent = n;
  for(var i=0; i<n; i++) {
    for(var j=0; j<3; j++) {
      var img = document.getElementById("scard" + (i+1) + (j+1));
      img.height = 40;
      img.src = "images/" + cards[sets[i][j]] + ".png";
    }  
  }
}
  
})()
