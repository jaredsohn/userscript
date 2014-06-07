// ==UserScript==
// @name          OneClickStats
// @namespace     http://userscripts.org/scripts/show/62038
// @description   Adds an icon next each cards on the market in order to view the urdb stats of them in one click.
// @match         http://www.urban-rivals.com/market/*
// @match         http://urban-rivals.com/market/*
// @match         https://www.urban-rivals.com/market/*
// @match         https://urban-rivals.com/market/*
// @copyright     2009+, Boboss (http://userscripts.org/users/117399)
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @author        Boboss (http://www.urban-rivals.com/player/?id_player=7018889)
// @version       1.0.3
// ==/UserScript==

var messages = document.evaluate("//div[@class='marketRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (messages.snapshotLength == 0) {return}
for(var i=0; i < messages.snapshotLength ; i++) {
	var message = messages.snapshotItem(i);
	var innerMessage = message.innerHTML;
	innerMessage = innerMessage.replace(new RegExp('<a href="/characters/\\?id_perso=([0-9]*)" class="characterLink characterID_[0-9]* name">([a-zA-Z0-9 ]*)</a>', ''), '<a href="/characters/?id_perso=$1" class="characterLink characterID_$1 name">$2</a>&nbsp;<a href="http://urdb.kirlad.net/character.php?urid=$1" target="_blank"><img src="http://urdb.kirlad.net/img/favicon.ico" alt="urdb" title="Urban Rivals DataBase" /></a>');
	message.innerHTML=innerMessage;
}
