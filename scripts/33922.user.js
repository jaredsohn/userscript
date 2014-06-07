// ==UserScript==
// @name           Item GET
// @namespace      http://userscripts.org/users/66698
// @description    Plays the coin sound effect from Super Mario Bros when an item drops in KoL
// @include        http://www3.kingdomofloathing.com/main.html
// ==/UserScript==

myregexp = new RegExp("You acquire an item:", "i");
if (myregexp.exec(document.body.innerHTML))
	document.getElementById('debug').innerHTML = "\n<embed src=\"http://www.liquidenjoyment.com/stuff/hobonickelget.swf\">\n";
