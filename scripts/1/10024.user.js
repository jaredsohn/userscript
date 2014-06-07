// ==UserScript==
// @name	no loos
// @namespace	http://userscripts.org/scripts/show/10024
// @description	deletes egloos links
// @include	http://*.egloos.com/*
// ==/UserScript==

// Based on no devADS: http://userscripts.org/scripts/show/8247

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function delall(query){
	var allelem = xpath(query);
	for (var i = 0; i < allelem.snapshotLength; i++ ) {
		var elem = allelem.snapshotItem(i);
			elem.parentNode.removeChild(elem);
	}
	//remove the next comment for debugging purposes
	//if(allelem.snapshotLength>1){GM_log("more than one: "+query);}
}

delall("//*[@class='usermenu']/a[@href='http://www.egloos.com'] | //*[@class='usermenu']/a[@href='http://www.egloos.com/'] | //*[@class='USERMENU']/a[@href='http://www.egloos.com'] | //*[@class='USERMENU']/a[@href='http://www.egloos.com/']");