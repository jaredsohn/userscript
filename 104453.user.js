// ==UserScript==
// @name           MyDDO Lottery: Hide other servers
// @namespace      http://forums.ddo.com/showthread.php?t=322786
// @description    Hides characters that aren't on the Orien server.
// @include        http://my.ddo.com/*/foo.html?KeepThis=true&TLottoSignUp=player&id=*
// ==/UserScript==

// note: I'm hiding characters on any server but Orien, and one character on Orien. If you are on a different server, replace your server name below with "orien"
// to hide just some characters on a server, add entries for each character
// like this: contains(@href,"/orien/johndoe/") or 

var rows = document.evaluate(
'//tr/td/a[contains(@href,"/orien/practitioner/") or contains(@href,"/argonnessen/") or contains(@href,"/cannith/") or contains(@href,"/ghallanda/") or contains(@href,"/khyber/") or contains(@href,"/sarlona/") or contains(@href,"/thelanis/") or contains(@href,"/wayfinder/")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null)
for (i = 0; i < rows.snapshotLength; i++) {
foo = rows.snapshotItem(i).parentNode.parentNode
foo.parentNode.removeChild(foo)
}
