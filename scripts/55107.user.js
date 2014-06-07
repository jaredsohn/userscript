// ==UserScript==
// @name           GLB PM Signature
// @namespace      Cronus6, cabrasher
// @description    Add Signature to New PMs, replies, and forwards
// @include        http://goallineblitz.com/game/new_message.pl*
// ==/UserScript==

// Edit line below to change to your signature
// Use \n for new lines
var signature = "-Agent name\nStaff Position\nTeam Name";

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var answerText = document.getElementById("message");
	answerText.value = "\n\n" + signature + answerText.value;
}