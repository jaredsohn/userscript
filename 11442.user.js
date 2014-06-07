// ==UserScript==
// @name          LJ unusericon
// @namespace     http://makomk.livejournal.com
// @description   Makes lj user tags for deleted/suspended accounts more obvious
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.evaluate(
    "//span[@class='ljuser']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    if(thisSpan.style.fontWeight == 'bold') {
	thisSpan.style.textDecoration = "line-through";
	var username = thisSpan.getAttribute("lj:user");
	var link = document.createElement('a');
	link.href = "http://www.livejournal.com/users/" + username;
	thisSpan.insertBefore(link, thisSpan.firstChild);
	while(link.nextSibling != null) {
	    var node = link.nextSibling;
	    node.parentNode.removeChild(node);
	    link.insertBefore(node,null);
	}
	link = document.createElement('a');
	link.href = "http://www.livejournal.com/userinfo.bml?user=" + username;
	var unuser = document.createElement('img');
	unuser.src = "data:image/gif;base64,R0lGODlhEQARAMIAAAAAAHt7e4SEhJ+fn////wAAAAAAAAAAACH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgAHACwAAAAAEQARAAADM3i63K4AHPkauYRWgHGF3aU9YfZx4TeVo8OqqAd3LYnVSySi0xiXNFDoJ8pJIpOeUlVJAAA7";
	unuser.style.border = 0;
	unuser.style.verticalAlign = 'bottom';
	thisSpan.insertBefore(link, thisSpan.firstChild);
	link.insertBefore(unuser,null);
    }
}