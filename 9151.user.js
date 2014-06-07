// ==UserScript==
// @name           coralized-youtube
// @description    Uses Coral Content Distribution Network to accelerate video performance on YouTube
// @author         Patryk Szczyglowski <jid:psz@chrome.pl>
// @version        0.4
// @namespace      http://xmlns.patryk.net.pl/greasemonkey/coralized-youtube
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// ==/UserScript==

(function() {

	var movie_player = document.getElementById('movie_player');

	if (!movie_player) {
		return;
	}

	var dup_player = movie_player.cloneNode(true);

	dup_player.src = 'http://coralize.net/' + dup_player.src;

	movie_player.parentNode.replaceChild(dup_player, movie_player);

})();
