// ==UserScript==
// @name		Overview change
// @version		0.01
// @description		change overview
// @include		http://playevo.com/overview*
// @author		podd
// ==/UserScript==
GM_log("start overviewchange");

// put everything under buddylist
var buddynodes = document.evaluate(
     "//div[@id='content']/div[@class='alt2']",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
	 
	 buddynode = buddynodes.snapshotItem(0);
	 
// find and move admin info
var nodes = document.evaluate(
     "//div[@id='content']/table[1]",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
	 
	 node = nodes.snapshotItem(0);

node.parentNode.removeChild(node);
buddynode.parentNode.insertBefore(node, buddynode.nextSibling);

var hellonodes = document.evaluate(
     "//div[@id='content']/div[@class='b t_little']",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
	 
	for (x=2;x>-1;x--) {
		 hellonode = hellonodes.snapshotItem(x);
		hellonode.parentNode.removeChild(hellonode);
		buddynode.parentNode.insertBefore(hellonode, buddynode.nextSibling);
	}




GM_log("end overviewchange");


