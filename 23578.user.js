// ==UserScript==
// @name QuickBuff Player
// @namespace http://www.myspace.com/tokataro
// @description Adds QuickBuff link to player profile page for Fallen Sword
// @include http://www.fallensword.com/index.php?cmd=profile&player_id=*
GM_log('running');

// Get link objects to look for one to replace
var allElements, enemy, playerid, length
	allElements = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Get player id # from URL
	playerid = document.URL.match(/\w*\d{5}\d*/)

// Find and replace link to add player as enemy
for (var i = 0; i < allElements.snapshotLength; i++) {
	enemy = allElements.snapshotItem(i);
	if (enemy.innerHTML == 'Add as Enemy') {
		GM_log('FOUND');
		enemy.innerHTML = ('Buff Player');
		enemy.href= ('javaScript:quickBuff(' + playerid + ');');
	}
}

if (enemy = null){ GM_log('fail') } else {GM_log('yay');}

// ==/UserScript==