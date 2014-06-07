// ==UserScript==
// @name           Fixes Fark Sports link
// @include        http://*.fark.com/
// @include        http://fark.com/*
// ==/UserScript==

(function ()
{


document.getElementById("bodyTabSports").href="http://fark.com/sports";

})();