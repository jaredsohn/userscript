// ==UserScript==
// @name          Hello World
// @namespace     http://www.gg.pl/games/id/12968611443125187474
// @description   Kanał Irc
// @include       http://www.gg.pl/games/id/12968611443125187474
// ==/UserScript==

var adSidebar = document.getElementById('<div class="af-games-mmo-panel"><div class="af-games-game-main-tools"><a class="af-games-toolbarlink" href="/">&nbsp;</a><div class="af-games-game-close" id="ext-gen8"></div><div class="af-games-game-faver" id="ext-gen6"><div class="af-games-game-fav" id="ext-gen7">Usuń z Ulubionych</div></div></div></div>');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}