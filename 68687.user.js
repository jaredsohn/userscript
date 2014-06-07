// ==UserScript==
// @name           UsuD niepotrzebne ramki
// @namespace      http://webtom.com.pl
// @description    UsuD niepotrzebne ramki na stronie gazeta.pl
// @include        http://www.gazeta.pl/0,0.html
// ==/UserScript==

	var ramka = document.evaluate(
	"//li[@id='bn_sport']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
		
	ramka.snapshotItem(0).style.display='none';

	ramka = document.evaluate(
	"//li[@id='bn_zycieistyl']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
		
	ramka.snapshotItem(0).style.display='none';

	ramka = document.evaluate(
	"//div[@class]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	var item;
	for (var i = 0; i < ramka.snapshotLength; i++) {
    	item = ramka.snapshotItem(i);
    	GM_log(item.className);

    	if (/entry/i.test(item.className))
    	{
			item.style.display = "none";
		}
	}

	ramka = document.evaluate(
	"//div[@id='autopromo']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	ramka.snapshotItem(0).style.display='none';

