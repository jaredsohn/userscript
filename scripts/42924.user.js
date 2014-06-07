// ==UserScript==
// @name           SSW Space Smail
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds a smail link to players in space.
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=pvp*
// ==/UserScript==

var player_links = document.evaluate('//a[contains(@href, "p=records&a=view_player")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < player_links.snapshotLength; i++) {
	var cell = document.evaluate('./ancestor::td[1]', player_links.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(cell.innerHTML.indexOf("Power:") > -1) {
		var smail_link = document.createElement('a');
		var player_textobj = document.evaluate('./text()', player_links.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		smail_link.href = "http://www.secretsocietywars.com/index.php?p=forums&a=pm_editor&to="+player_textobj.data;
		smail_link.innerHTML = "smail";
		smail_link.style.color = "white";
		if(document.evaluate('./following-sibling::a[1]', player_links.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			cell.appendChild(document.createTextNode(" | "));
		}
		cell.appendChild(smail_link);
	}
}

