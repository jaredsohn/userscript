// ==UserScript==
// @name           KoL Old-style combat
// @namespace      aelsa.louise@googlemail.com
// @description    Automatically shows the old combat form as well as the new action bar
// @include        *kingdomofloathing.com/fight.php
// ==/UserScript==

var won = document.evaluate('//script[contains(text(),"state[\'fightover\'] = true;")]',
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (won.snapshotLength == 0) {
	document.getElementById("fightform").className="showform";
	document.getElementById("formlink").style.display = "none";
}