// ==UserScript==
// @name          Fix ug
// @description     Fix Annoying Bugs in ug
// @include       http://ug.technion.ac.il/rishum/search.php
// ==/UserScript==
// By Alon Altman

window.addEventListener(
'keypress',
function(e) {
        // process only the Enter key
      if ((e.which == 13))
      {
         alert("keypress enter");
         document.getElementById("search_button").click();
      }
}, true);

