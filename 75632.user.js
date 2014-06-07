// ==UserScript==
// @name          Penguin Poo Javascript Cheat
// @namespace     http://play.clubpenguin.com/
// @description   some basic clubpenguin cheats
// @include       http://play.clubpenguin.com/#cheat
// @include       http://play.clubpenguin.com/iframe_index.php?aff=0&lang=en&p=1
// ==/UserScript==

// ------Begin Variables------
var elmSettings = window.document.getElementById('htmlNav');
elmSettings.innerHTML = '<FORM name="cheat"> <INPUT type="button" onClick="Iceskate()" value="Activate Iceskating mode" name="button1"> <INPUT type="button" onClick="Tempmember(True)" value="Activate Temporary Member" name="button2"> <INPUT type="button" onClick="Tempmember(False)" value="Disable Temporary Member" name="button3"> </FORM>'


// ------Begin Functions------

// Function: Base Function
Passvar(flashvar,value){     window.document.club_penguin.SetVariable(flashvar, value); }
// Function: Temporary Member
Tempmember(value){      Passvar( '_level0.holder_mc.SHELL.my_player.is_member', value); }
Iceskate(){      Passvar( '_level0.instance.shell.ENGINE.my_room_movieclips.room_' , 'easeInOutQuad'); }