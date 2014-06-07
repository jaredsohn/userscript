// ==UserScript==
// @name            Hide OcUK advert
// @description   Hides the advert at the top right of the forums 
// ==/UserScript==


var header_id = document.getElementById("header_right_cell");
header_id.style.display = "none";