// ==UserScript==
// @name       Get Rid of Ads on SimCity Social
// @version    0.1
// @description  SimCity Social (Facebook game) has a bunch of annoying ads above and below the game, this script gets rid of those.
// 
// @include *simcity.game.playfish.com*
// @copyright  2012+, Ahmed
// Thanks to the people at http://userscripts.org/topics/118539?page=1 who helped me make this work!
// ==/UserScript==

setTimeout(function () {var elements = document.querySelectorAll('.pf-cross-promos-header, .pf-cross-promos-footer, .pf-console-footer');
for (var i = 0; i < elements.length; i++) {
	elements[i].style.display = 'none';
}},1000);
