// ==UserScript==
// @name  Neopets : Mutant Graveyard of Doom Avatar
// @namespace  userscripts.org
// @description  Refreshes at Game Graveyard until you receive the Avatar.
// @include  http://www.neopets.com/halloween/gamegraveyard.phtml*
// @exclude		http://www.neopets.com/halloween/gamegraveyard2.phtml*
// ==/UserScript==

function random(min, max) {
	return Math.floor((max - min) * Math.random()) + min;
}

var min = 2000; // in milliseconds
var max = 3000; // 1 second = 1000 milliseconds

setTimeout("location.reload(true);", random(min, max));

(function() {
if (document.body.innerHTML.indexOf("Something Has Happened!") > -1) {
alert("Avatar Found!");
}
else if (document.body.innerHTML.indexOf("---") > -1) {
alert("Do not delete this..");
}
});