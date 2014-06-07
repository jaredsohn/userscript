// ==UserScript==
// @name           External Click'n'Load
// @namespace      http://stmenzel.mine.nu
// @description    This script reroutes Click'n'Load requests to an instance of your preferred downloader NOT running on the local but on a different computer in the same network.
// @include       http://*
// @include       https://*
// ==/UserScript==

var local = '127.0.0.1:9666'; 		//should always be localhost 
var server = '192.168.178.10:9666';	//IP address of machine running download manager
var allscripts, thisscript;

//check for javascript
allscripts = document.evaluate(
    '//script',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allscripts.snapshotLength; i++) {
    thisscript = allscripts.snapshotItem(i);
	
    if (thisscript.src.match(local)) {
		//the following line is for debugging purposes only!
		//alert('found \n' + thisscript.src + ' to \n' + thisscript.src.replace(local, server));
		var newlink = document.createElement('p');
		newlink.innerHTML = '<a href="#" onclick="document.cnlform.submit()" return false>Links absenden!<\/a>';
		document.getElementsByTagName("H1")[0].parentNode.insertBefore(newlink, document.getElementsByTagName("H1")[0]);
	}
		
	if (thisscript.src.match(local)) {
		//the following line is for debugging purposes only!
		//alert('editing \n' + thisscript.src + ' to \n' + thisscript.src.replace(local, server));
		thisscript.src = thisscript.src.replace(local, server);
	}
}

//check for forms
allscripts = document.evaluate(
    '//form',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allscripts.snapshotLength; i++) {
    thisscript = allscripts.snapshotItem(i);
	if (thisscript.action.match(local)) {
		//the following line is for debugging purposes only!
		//alert('editing \n' + thisscript.action + ' to \n' + thisscript.action.replace(local, server));
		thisscript.action = thisscript.action.replace(local, server);
}
}

