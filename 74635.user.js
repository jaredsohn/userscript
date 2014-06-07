// ==UserScript==
// @name           Show Similar Expander - Facebook
// @namespace      http://userscripts.org/scripts/show/74635
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// ==/UserScript==

// Original code by JoeSimmons


function showsimilar(){
// Auto click "show x similar posts" links
	var similarposts=document.evaluate(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=')] | .//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=')] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", document, null, 6, null);
	var i=0, l=similarposts.snapshotLength;
	if(l==0) return;
	do {
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
		similarposts.snapshotItem(i).dispatchEvent(evObj);
	} while(++i < l);
}

window.setInterval(showsimilar, 1000);