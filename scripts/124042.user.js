// ==UserScript==
// @match *Photo/Details*
// @name Resizer
// ==/UserScript==
var drops = document.getElementsByClassName("photo-drop");
for(var i = 0; i < drops.length; i++) {
  if(drops[i].children[0].class == "restriction") {
    var elem = drops[i].children[1].children[0];
    elem.src = elem.src.replace("amazonaws.com/m/t/", "amazonaws.com/m/p/");
  }
}