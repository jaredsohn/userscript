// ==UserScript==
// @name			Twitter External Links Microformats
// @author			Erik Vold
// @namespace		twitterExternalLinksMicroformats
// @include			http*://*
// @exclude			http*://*.twitter.com*
// @exclude			http*://twitter.com*
// @version			0.1
// @datecreated		2009-11-28
// @lastupdated		2009-11-28
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will add microformat markup to appropriate twitter.com links which are not on the twitter.com domain.
// ==/UserScript==

(function(){
	var test,e,a=document.getElementsByTagName('a');
	for(var i=0;i<a.length;i++){
		e=a[i];
		if(e.className.match(/(twitter-user|twitter-status)/i)) continue;
		if(!e.href.match(/http:\/\/twitter\.com\//i)) continue;
		test = e.href.match(/^http:\/\/twitter\.com\/[_\w\d]{1,15}$/i);
		if(test) e.className = e.className + ((e.className) ? " " : "") + "twitter-user";
		test = e.href.match(/^http:\/\/twitter\.com\/[_\w\d]{1,15}\/status\/\d+$/i);
		if(test) e.className = e.className + ((e.className) ? " " : "") + "twitter-status";
	}
})();