// ==UserScript==
// @name           Aprocalypse's Bad Moon Hangker
// @namespace      http://kolmods.com/aprocalypse/
// @description    Version 0.1 - Adds Hangk link on sidebar, all the time
// @include        http://*kingdomofloathing.com/showplayer.php*
// @include        http://127.0.0.1:60*/showplayer.php*
// ==/UserScript==

var tmp = document.body.innerHTML;
tmp = tmp.replace(/Effects:/,'<a href="storage.php" target=mainpane>Hangks:</a><p/> Effects:');
document.body.innerHTML = tmp;
