// ==UserScript==
// @name       TFS Color changer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Change color of tile for specific name
// @match      http://tfs03wm:8080/*
// @include      http://tfs03wm:8080/*
// @grant       none
// @copyright  2012+, kulicz
// ==/UserScript==
// === DEFINING CONSTANTS ===
var HEIGHT = "500px";
var TIMEOUT = 500;


// === FUNCTION ===
function changecolor() {
     var description = document.getElementById("82");
      if (!description) {
        setTimeout(changecolor, TIMEOUT);
      } else {
     var tiles = document.getElementsByClassName("board-tile propagate-keydown-event ui-draggable");
     var username = "name";
     
    
     for (var i = 0; i < tiles.length; i++) {
          var tile = tiles[i];
         
          var assignedTo = tile.getElementsByClassName("name ellipsis")[0].innerText;
         
          if (username == assignedTo) {
               tile.style.backgroundColor = "#33CC66";
               tile.style.borderLeftColor = "#C0C080";
          } else {
               tile.style.backgroundColor = "#DCE6F4";
               tile.style.borderLeftColor = "#95B3D7";
          }
         console.log(assignedTo);
     }
     
         
     }
     
     
}
changecolor();
