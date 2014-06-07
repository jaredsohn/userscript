// ==UserScript==
// @name           WGetDeb
// @namespace      http://userscripts.org/users/14536
// @description    Modifies GetDeb.net to show Wget code for downloading the deb files for each program
// @include        http://www.getdeb.net/*
// @include        http://getdeb.net/*
// ==/UserScript==

var apps = document.evaluate("//td[contains(string(),'Download:')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
if (apps.snapshotLength>0) {
	for (var i=0; i<apps.snapshotLength; i++) {
		code = 'wget';
		links = document.evaluate(".//a[contains(@href,'/download/')]",apps.snapshotItem(i),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var j=0; j<links.snapshotLength; j++) { code = code + ' ' + links.snapshotItem(j).href; }
		wgetTD = document.createElement('td');
		wgetTD.innerHTML = '<textarea onmouseover="this.select();" style="width:100%; height:32px;">' + code + '</textarea>';
		wgetTD.colSpan = '3';
		wgetTR = document.createElement('tr');
		wgetTR.appendChild(wgetTD);
		node = links.snapshotItem(0).parentNode.parentNode.parentNode;
		node.parentNode.insertBefore(wgetTR,node.nextSibling);
	}
}
