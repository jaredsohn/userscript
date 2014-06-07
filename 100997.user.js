// ==UserScript==
// @name           Piterhunt New Tab Fix
// @namespace      http://piterhunt.ru/*
// @include        http://piterhunt.ru/*
// ==/UserScript==

links = document.evaluate("//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i);
	if (link.href.match("pp=")) {continue;}
	if (link.href.match("pp=25")) {continue;}
	
	

//	if  (link.target=="_blanck" || link.href.match("goto=newpost") ||  (link.href.match("showthread.php") && link.href.match("page=") ))
	if  (link.target=="_blanck")
	{
		link.target="";
	}
	
	if ( (document.location.href.match("search.php") || document.location.href.match("forumdisplay.php")) && link.href.match("showthread.php")) {
			link.target="_blank";
	}
  }

