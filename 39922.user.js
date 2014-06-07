// ==UserScript==
// @name           livejournal
// @namespace      smk
// @description	alters links to open livejournal interests in the correct pages
// @include        http://*.livejournal.com/profile*
// ==/UserScript==
var links=document.evaluate('//a[@href[contains(.,"http://www.livejournal.com/directory.bml?"]]',document,null,6,null);
for(var i=links.snapshotLength-1;i>=0;i--)
	links.snapshotItem(i).href='/interests.bml?int='+links.snapshotItem(i).href.match(/\/directory\.bml\?int_like\=(.*?)\&/)[1];