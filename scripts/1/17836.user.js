// ==UserScript==
// @name          Multiply Music Search
// @namespace     http://nithrandur.multiply.com/
// @description   Restores the music option in the multiply search drop-down.
// @include       http://multiply.com/search*
// @include       http://www.multiply.com/search*
// @exclude       
// ==/UserScript==

var dropDown = document.getElementById("type");
dropDown.innerHTML += "<option value=\"inurl:music inurl:item\">Music</option>";
