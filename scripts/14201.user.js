// ==UserScript==
// @name           UserScripts.org FUCKING ANNOYING Scrap Scripts Remover
// @namespace      http://userscripts.org
// @description    Remove (hide) FUCKING ANNOYING Scrap script Listings From UserScripts.org
// @include        http://userscripts.org/*
// @include        http://*.userscripts.org/*
// ==/UserScript==
//v .2.2

var scriptslist = new Array ("10314", "12535", "12536", "12537", "12538", "12539", "12540", "12541", "14031", "13541");
var titleslist = new Array("OGame", "isnoop.net", "orkut", "scrap", "scraps", "pak idol", "ANQ", "morkut");

var nodes = document.evaluate("//div[@id='content']/table[@class='wide forums']/tbody/tr/td[@class='script-install']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var joinedList = scriptslist.join(" ");
for (var i = 0; i<nodes.snapshotLength; i++) {
	var num = nodes.snapshotItem(i).href.toString();
	num = num.split("source\/")[1].split(".user.js")[0];
	var test = new RegExp("\\b"+num+"\\b","gi");
	if (joinedList.match(test)) {
		nodes.snapshotItem(i).parentNode.parentNode.setAttribute("style" , "display: none !important; visibility: hidden !important;");
	}
}

nodes = "";
nodes = document.evaluate("//div[@id='content']/table[@class='wide forums']/tbody/tr/td[@class='script-meat']/a[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i<nodes.snapshotLength; i++) {
	var tit = nodes.snapshotItem(i).textContent.toString();
	for (var ii = 0; ii<titleslist.length; ii++) {
		test = new RegExp("\\b"+titleslist[ii]+"\\b","gi");
		if (tit.match(test)) {
			nodes.snapshotItem(i).parentNode.parentNode.setAttribute("style" , "display: none !important; visibility: hidden !important;");
			break;
		}
	}
}