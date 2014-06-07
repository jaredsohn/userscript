// ==UserScript==
// @name        Nova Test
// @include     http://*.unovarpg.com/battle.php*
// @version     0.1
// ==/UserScript==
document.onload = function () {
}
var btn = document.querySelector('input[name="Attack"]');
if (btn) {
	btn.click();
}
var btn = document.querySelector('input[name="Continue"]');
if (btn) {
	btn.click();
}
if (document.body.innerHTML.indexOf('You won the battle!') >= 0) {
	setTimeout(function () {
		document.location = "http://*.unovarpg.com/battle.php?type=autotrainer&tid=8269114";
        
	}, 10000);
}