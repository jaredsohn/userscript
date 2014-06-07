// ==UserScript==
// @name           The West.ru
// @namespace      www.the-west.sk
// @namespace      www.the-west.ru
// @description    Buildings, Menu Shortcut Icons for the west, Fullscreen window
// @description    and TheWest++ (inventory coast) script. Translated in Russian.
// @description    and The West Bag Info
// @description    and Best Items by Storan. (select best items for work, Translated in Russian)
// @description    The West Reporter SK/CZ
// @description    West: Олег
// @include        http://ru*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==

/*


javascript:/**suspekt-patch*/(Market.prototype.prepareTraderControl=eval("("+Market.prototype.prepareTraderControl.toString().replace(/n *> *1 *&& *false/, "n>1")+")"))&&alert("Market patch applied!")