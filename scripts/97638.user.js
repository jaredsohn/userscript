// ==UserScript==
// @name           Google Cache Link Protector
// @description  Change links in Google Cache, so that you won't leave Google Cache when you click links in the cached pages
// @author         sixing
// @run-at         document-start
// @include        http://webcache.googleusercontent.com/*
// @include        https://webcache.googleusercontent.com/*
// @version        1.0.0

// ==/UserScript==

function _gclp(){
	var a = document.getElementsByTagName('a');
	var d = document.getElementsByTagName('div');
	var t = setTimeout(_gclp,20);
	d[0].style.display = 'none';
	for(i=0;i<a.length;i++){
		if(-1 == a[i].href.indexOf('webcache.googleusercontent.com') && 'current page' != a[i].innerHTML){
			var s = (a[i].href = 'https://webcache.googleusercontent.com/search?q=cache:'+encodeURI(a[i].href)+'&cd=1&hl=zh-CN&ct=clnk&source=goog.le');
		}
	}
}

_gclp();
window.onload = clearTimeout(t);