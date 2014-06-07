// ==UserScript==
// @name           Google Direct
// @namespace      org.yxwang.googledirect
// @description    直接打开google.com.hk的搜索结果链接
// @include        http://www.google.com.hk/*
// @include        https://www.google.com.hk/*
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @include	   http://cn.bing.com/*
// ==/UserScript==

// 版本历史：
// 0.4 https也加进来。
// 0.3 把bing也加入作用范围，添加新的被强网站。
// 0.2 高亮显示被墙网站。
// 0.1 替换被墙连接。

console.log("Run Google Direct!");

var replaceUrl = function(event){
	console.log(event);
	var allEntries = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i<allEntries.snapshotLength; i++) {
		var link = allEntries.snapshotItem(i);
		//console.log("LINK: " + link);
		var url = link.href;
		if(url.indexOf('www.google.com.hk/url?')>0 || url.indexOf('url?') > 0) {
			console.log("Got it!" + url);
			var start = url.indexOf("url=") + 4;
			var end = url.indexOf("&", start);
			var realUrl = unescape(url.substring(start, end));
			console.log("Real URL: " + realUrl);
			link.href = realUrl;
		}
	}
	console.log("redirect google search result done!");
}

var BLOCKED = [
	'facebook.com',
	'twitter.com',
	'blogger.com',
	'youtube.com',
	'appspot.com',
	'blogspot.com',
	'wordpress.com',
	'dropbox.com',
	'vimeo.com',
	'tumblr.com',
	'plus.google.com',
	'imdb.com',
	'picasaweb.google.com',
	'myspace.com',
	'foursquare.com',
	'friendfeed.com',
];

var highlightBlocked = function(event) {
	console.log(event);
	var allEntries = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i<allEntries.snapshotLength; i++) {
		var link = allEntries.snapshotItem(i);
		//console.log("LINK: " + link);
		var url = link.href;
		for(j = 0; j< BLOCKED.length; j++) {
			if(url.indexOf(BLOCKED[j])>=0 ) {
				console.log("Found blocked!");
				link.style.background='#DD4444';
				//link.parentNode.removeChild(link);
			}
		}
		
	}
	console.log("Highlight blocked link done!");
}

document.addEventListener('load', highlightBlocked, true);

document.addEventListener('click', replaceUrl, true);

console.log("Run Google Direct done!");