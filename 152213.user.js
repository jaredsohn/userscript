// ==UserScript==

// @name        Soulless auto battle

// @include     http://pokemonsoulless.org/battle.php

// @version     0.1

// ==/UserScript==

var btn = document.querySelector('input[value="Fight!"]');
if (btn) {
	btn.click();
}
var btn = document.querySelector('input[value="Attack!"]');
if (btn) {
	btn.click();
}
var btn = document.querySelector('input[value="Continue!"]');
if (btn) {
	btn.click();
}
if (document.body.innerHTML.indexOf('You Won!') >= 0) {
	setTimeout(function () {
		document.location = "http://pokemonsoulless.org/battle_user.php?id=89";
        
	}, 5000);
}