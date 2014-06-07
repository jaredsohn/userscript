// ==UserScript==
// @name           Favouritizer
// @namespace      http://userscripts.org/users/75549
// @description    Replaces "favorite" with "favourite"
// @include        http://127.0.0.1:600*
// @include        *kingdomofloathing.com*
// @exclude        *forums.kingdomofloathing.com*
// @exclude        http://127.0.0.1:600*fight.php*
// @exclude        *kingdomofloathing.com*fight.php*
// @exclude        http://127.0.0.1:600*choice.php*
// @exclude        *kingdomofloathing.com*choice.php*
// ==/UserScript==

var tmp = document.body.innerHTML;
tmp = tmp.replace("favorite","favourite");
tmp = tmp.replace("Favorite","Favourite");
document.body.innerHTML = tmp;