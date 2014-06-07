// ==UserScript==
// @name           Releaselog | RLSLOG Content Filter
// @description    Filter out unwanted content from RLSLOG.net
// @include        http://*.rlslog.net/*
// @version        1.1
// ==/UserScript==

var entrytitles = ["Smackdown","Angry Birds","Jay Leno","MacOSX"];

var showRemoved = true; // set this to false to hide unwanted content completely

var nodes = document.evaluate("//div[@class='entry']/h3/a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<nodes.snapshotLength; i++) {
	var curTor = nodes.snapshotItem(i).textContent.toString();
	for (var j=0; j<entrytitles.length; j++) {
		var x = new RegExp("\\b"+entrytitles[j]+"\\b","gi");
		if (curTor.match(x)) {
			if (showRemoved) {
				nodes.snapshotItem(i).parentNode.parentNode.innerHTML = '<h3 class="entrytitle" style="color:#CC0000"><strong><em>Hidden:</em></strong>' +curTor+ '</h3>';
				break;				
			} else {
				nodes.snapshotItem(i).parentNode.parentNode.style.display = 'none';
				break;
			}
		}
	}
}