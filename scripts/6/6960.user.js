// ==UserScript==
// @name          StreamClub.ru Forum NoMenu
// @namespace     StreamClub.ru Forum NoMenu
// @include       http://www.streamclub.ru/forum/*
// @description	  Removes forum menu to the left
// ==/UserScript==

// shamelessly ripped from the Slashdot Collapser: this hides Monkey Scut.
// I'm tired of mentally crap-filtering all of ScuttleMonkey's stories
// so this does it for me. Now I can read Slashdot in peace once again.

(function() {

document.getElementById('p2td1').style.display = "none";

})();
