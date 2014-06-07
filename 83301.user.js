// ==UserScript==
// @name		Eternal Duel AutoFisher
// @description		Automatically Fishes on Eternal Duel
// @include		*eternalduel.com/fish.php?action=fish&dest=*
// ==/UserScript==

//Random number from 0-10
var rowSelect = Math.floor(Math.random()*11)
//Just incase heh
if (rowSelect>10) { rowSelect=10}
//Random number from 10-20 - I think
var colSelect = Math.floor((Math.random()*11)+10)
//Make sure it doesn't drop below 11
if (colSelect<=11) { colSelect=11}
//Or higher than 19
if (colSelect>19) {colSelect=19}

//The not-so-magical magic
document.forms[0].elements[rowSelect].checked=true
document.forms[0].elements[colSelect].checked=true
document.forms[0].submit();
