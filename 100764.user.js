// ==UserScript==
// @name				DShitKeyToSend
// @author				Heinzel
// @namespace			http://userscripts.org/
// @include			http://ae*.tribalwars.ae/game.php?*screen=place
// @include			http://de*.die-staemme.de/game.php?*screen=place&mode=command
// @exclude			http://de*.die-staemme.de/game.php?*try=confirm*
// ==/UserScript==


// Hier kann festgelegt werden, welche Tasten welche Aktion ausloesen
var angreifen = "a";
var unterstuetzen = "u";


var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
for(var x = 0; x < alphabet.length; x++) {
	var index = x+65;
	if(alphabet[x] == angreifen) {
		var attack = index;
	} else if(alphabet[x] == unterstuetzen) {
		var support = index;
	}
}

document.addEventListener('keydown', function(event) {
	switch(event.which) {
		case attack:
			document.getElementsByName("attack")[0].click();
			break;
		case support:
			document.getElementsByName("support")[0].click();
			break;
	}
}, true);