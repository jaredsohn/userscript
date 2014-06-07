// ==UserScript==
// @name           c-plusplus.de: Signaturen ausblenden
// @namespace      c-plusplus.de
// @description    Blendet Signaturen im c-plusplus-Forum aus
// @include        http://*c-plusplus.de/forum/viewtopic*.html
// ==/UserScript==

function removeSigs()
{
	sigs = document.evaluate(
		"/html/body/table[2]/tbody/tr/td/table[2]/tbody/tr/td/table[3]/tbody/tr/td[2]/table[2]/tbody/tr[2]/td",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	   
	for(var i = 0; i < sigs.snapshotLength; ++i)
	{
		span = sigs.snapshotItem(i);
		span.style.display = "none";
	}
}

removeSigs();
