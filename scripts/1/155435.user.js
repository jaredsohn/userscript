// ==UserScript==
// @name        Steam improved screenshot navigation
// @namespace   None
// @description Adds a right navigation arrow to the steam player/slideshow thingy
// @include     http://store.steampowered.com/app/*
// @version     1
// ==/UserScript==

function main()
{
	var g_player = unsafeWindow.g_player;

	var arrowRight = document.createElement('img');
	arrowRight.src = 'http://cdn2.store.steampowered.com/public/images/promo/holiday2012/arrow_right.png'
	arrowRight.style.cssText = 'position: absolute; top: 151px; right: 20px';
	arrowRight.addEventListener('click', function() { g_player.Transition(); });

	document.getElementById('highlight_player_area').appendChild(arrowRight);
}


/*
 * Wait for the steam player/slideshow object to be initialized
 * Then start main()
 */
function waitForPlayer() {
	if (!unsafeWindow.g_player) {
		setTimeout(waitForPlayer, 100);
	}
	else {
		main();
	}
}

waitForPlayer();
