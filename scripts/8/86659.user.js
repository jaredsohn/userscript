// ==UserScript==
// @name           IEatManga direct download links
// @namespace      http://userscripts.org/users/ToostInc
// @description    Links IEMDownload links directly to downloads
// @include        http://ieatsoul.com/*
// @include        
// @copyright      2010+, Toost Inc.
// @license        kopimi http://www.kopimi.com/kopimi/
// @version        0.2
// ==/UserScript==

var a = document.getElementsByTagName("A");

for (x=0;x<a.length;x++) {
	var link = a[x].href;
	var test = /action=downloads;sa=view.*/.test(link);
	if(test==true) {	
		link= link.replace(/view/g,"downfile");
		a[x].href=link
		a[x].target="_self"
		a[x].title="Download file"
		//GM_log(link);
	};
};

