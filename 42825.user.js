// ==UserScript==
// @name           GLB Signature2
// @namespace      Cronus6
// @description	   Add Signature to PM's.
// @include        http://goallineblitz.com/game/new_message.pl
// @include        http://goallineblitz.com/game/new_message.pl?to=*
// @exclude        http://goallineblitz.com/game/new_message.pl?to=*&reply=*
// @exclude        http://goallineblitz.com/game/new_message.pl?fwd=*
// ==/UserScript==


// Edit line below to change to your signature
// Use \n for new lines
var signature = "\n\n-Cronus6\nTest Signature line 2\nTest Signature line 3";

var answerText = document.getElementById("message");
answerText.value = signature;