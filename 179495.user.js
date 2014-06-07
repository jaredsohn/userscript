// ==UserScript==
// @name           livejournal.com.hide_repost_PATCH
// @description    hide lj repost
// @version        0.1.0
// @include        http://livejournal.com*
// @include        http://www.livejournal.com*
// @include        https://livejournal.com*
// @include        https://www.livejournal.com*
// @grant          none
// ==/UserScript==

var i;
var w;
var e;
var c;
xp='/html/body/div[5]/table';

e=document.evaluate(xp, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (i=0; i<e.snapshotLength; i++) {
	c='';
	for (j=0; j<e.snapshotItem(i).childNodes.length; j++) {
		if (e.snapshotItem(i).childNodes[j].outerHTML!=undefined) {
			c=c+' '+e.snapshotItem(i).childNodes[j].outerHTML;
		};
	};
	c=c.substr(c.indexOf('action=profile;u='));
	c=c.substr(17,10);
	c=c.substr(0,c.indexOf('"'));
};