// ==UserScript==
// @name           GLB Signature
// @namespace      Cronus6
// @description	   Add Signature to PM's.
// @include        http://goallineblitz.com/game/new_message.pl*
// ==/UserScript==


// Edit line below to change to your signature
// Use \n for new lines
var signature = "\n\n-Cronus6\nTest Signature line 2\nTest Signature line 3";

var answerText = document.getElementById("message");
answerText.value = signature;