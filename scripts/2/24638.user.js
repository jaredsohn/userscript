// ==UserScript==
// @name           Sudoku Facebook Hack
// @namespace      Sudoku Facebook Hack
// @author         Evan Dinsmore
// @version        1.4
// @description    Instantly solves any game in the Web Sudoku Facebook App
// @include        *.websudoku.com/facebook/*
// ==/UserScript==

// Retrieve final Sudoku number combination for current game
if (document.getElementById('ws_cheat')) {
   var cheatCode = document.getElementById('ws_cheat').value;

   // Place each number in the corresponding input box
   for (var x = 0; x <= 80; x++) {
      if ((document.forms[0].elements[x].type != "radio") && (document.forms[0].elements[x].type != "submit")) {         document.forms[0].elements[x].value = cheatCode.charAt(x);
      }   }

   // Hit the submit button automatically
   if (document.getElementsByName('ws_submit')[0]) {      window.setTimeout(function() { document.getElementsByName('ws_submit')[0].click();return; }, 45000);   }
}