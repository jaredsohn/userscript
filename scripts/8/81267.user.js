// Google SSL
// Modified from SSL Certificates Pro
//
// ==UserScript==
// @name        Google SSL
// @namespace   http://raychow.info/
// @version     2.0.0
// @description	强制 Google 使用安全连接。
//
// @include     https://www.google.com/
// @include     https://www.google.com/webhp?*
// @include     https://www.google.com/search?*

// @include     https://encrypted.google.com/
// @include     https://encrypted.google.com/webhp?*
// @include     https://encrypted.google.com/search?*

// @include     https://webcache.googleusercontent.com/search?*
//
// @include     http://www.google.com.hk/search?*
// @include     http://www.google.com/
// @include     http://www.google.com/webhp?*
// @include     http://www.google.com/search?*
//
// @include     http://www.google.com/accounts*
// @include     http://www.google.com/bookmarks*
// @include     http://www.google.com/calendar*
// @include     http://www.google.com/contacts*
// @include     http://www.google.com/dictionary*
// @include     http://www.google.com/finance*
// @include     http://www.google.com/history*
// @include     http://www.google.com/notebook*
// @include     http://www.google.com/preferences*
// @include     http://www.google.com/profiles*
// @include     http://www.google.com/reader*
// @include     http://www.google.com/webmasters/tools*
// @include     http://www.google.com/voice*
// @include     http://checkout.google.com*
// @include     http://gmail.google.com*
// @include     http://groups.google.com*
// @include     http://mail.google.com*
// @include     http://sites.google.com*
// @include     http://*.googleusercontent.com*
// @include     http://*.live.com/*
// @include     http://*.ovi.com/*
// @include     http://*.yahoo.com/*
// @include     http://facebook.com/*
// @include     http://twitter.com/*
// @include     http://*.wikimedia.org/*
// ==/UserScript==

// 如果需要指定搜索语言，请修改 defaultLanguage 变量。
// If you need to specify the language of Google Search, please modify the defaultLanguage variable.
// 示例 / Example :
// var defaultLanguage = 'zh-CN';
var defaultLanguage = 'zh-HK';

function selectNodes(query) {
	return document.evaluate (
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

var locationProtocol = window.location.protocol;
if (locationProtocol == 'http:') {
	if (window.location.href == 'http://www.google.com/' || window.location.href.indexOf('http://www.google.com/webhp?') == 0) {
		var sslLinkNode = document.createElement('a');
		sslLinkNode.href = 'https://www.google.com/';
		sslLinkNode.className = 'gb1';
		sslLinkNode.textContent = 'SSL';
		var gbar = selectNodes("//div[@id='gbar']/nobr").snapshotItem(0);
		gbar.appendChild(document.createTextNode(' '));
		gbar.appendChild(sslLinkNode);
	} else if (window.location.host == 'www.google.com.hk') {
		var iframe = document.createElement('iframe');
		iframe.id = 'ncr';
		iframe.src = 'https://www.google.com/ncr';
		iframe.setAttribute('style', 'display: none');
		document.body.appendChild(iframe);
		iframe.addEventListener('load', function(){
			var searchHref = 'https://encrypted.google.com/search' + window.location.search;
			if (defaultLanguage.length > 0)
				if (searchHref.indexOf('hl=') < 0)
					searchHref += '&hl=' + defaultLanguage;
			window.location.href = searchHref + '#sl';
		}, false);
	} else if (!window.location.href.indexOf('http://www.google.com/search?')) {
		window.location.href = 'https://encrypted.google.com/search' + window.location.search;
	} else {
		window.location.href = window.location.href.replace(/http:/, 'https:');
	}		
} else if (locationProtocol == 'https:') {
	var nodes, thisNode;
	if (window.location.href == 'https://www.google.com/' || window.location.href.indexOf('https://www.google.com/webhp?') == 0 || window.location.href == 'https://encrypted.google.com/' || window.location.href.indexOf('https://encrypted.google.com/webhp?') == 0) {
		nodes = selectNodes("//div[@id='gbar']");
		thisNode = nodes.snapshotItem(0);
		thisNode.style.display = 'inline';
	} else if (window.location.host == 'webcache.googleusercontent.com') {
		nodes = selectNodes("//a[starts-with(@href, 'http://webcache.googleusercontent.com')]");
		for (var i=0; i < nodes.snapshotLength; i++) {
			thisNode = nodes.snapshotItem(i);
			thisNode.href = thisNode.href.replace(/http:/, 'https:');
		} 
	} else if (window.location.href.indexOf('https://encrypted.google.com/search?') == 0 || window.location.href.indexOf('https://encrypted.google.com/search?') == 0) {
		if (!selectNodes("//div[@id='gbar']").snapshotItem(0))
		{
			var gog = selectNodes("//div[@id='gog']").snapshotItem(0);
	    gog.innerHTML = '<div id="gbar"><nobr>' + 
	    	'<a href="https://encrypted.google.com/search?tab=ww" onclick="gbar.qs(this)" class="gb1">Web</a> ' + 
	    	'<a href="http://www.google.com/images??tab=wi" onclick="gbar.qs(this)" class="gb1">Images</a> ' + 
	    	'<a href="https://encrypted.google.com/search?tbs=vid:1&amp;tab=wv" onclick="gbar.qs(this)" class="gb1">Videos</a> ' + 
	    	'<a href="http://maps.google.com/maps?tab=wl" onclick="gbar.qs(this)" class="gb1">Maps</a> ' + 
	    	'<a href="https://encrypted.google.com/search?tbs=nws:1&amp;tab=wn" onclick="gbar.qs(this)" class="gb1">News</a> ' + 
	    	'<a href="http://www.google.com/products?tab=wf" onclick="gbar.qs(this)" class="gb1">Shopping</a> ' + 
	    	'<a href="https://mail.google.com/mail/?tab=wm" class="gb1">Gmail</a> ' + 
	    	'<a href="http://www.google.com/intl/en/options/" onclick="this.blur();gbar.tg(event);return !1" aria-haspopup="true" class="gb3"><u>more</u> <small>▼</small></a>' + 
	    	'<div class="gbm" id="gbi">' + 
	    	'<a href="http://www.google.com/search?tbs=bks:1&amp;tab=wp" onclick="gbar.qs(this)" class="gb2">Books</a> ' + 
	    	'<a href="https://www.google.com/finance?tab=we" onclick="gbar.qs(this)" class="gb2">Finance</a> ' + 
	    	'<a href="http://translate.google.com/translate_t?tab=wT" onclick="gbar.qs(this)" class="gb2">Translate</a> ' + 
	    	'<a href="http://scholar.google.com/scholar?tab=ws" onclick="gbar.qs(this)" class="gb2">Scholar</a> ' + 
	    	'<a href="https://encrypted.google.com/search?tbs=blg:1&amp;tab=wb" onclick="gbar.qs(this)" class="gb2">Blogs</a> ' + 
	    	'<div class="gb2"><div class="gbd"></div></div>' + 
	    	'<a href="http://www.youtube.com/results?tab=w1" onclick="gbar.qs(this)" class="gb2">YouTube</a> ' + 
	    	'<a href="https://www.google.com/calendar/render?tab=wc" class="gb2">Calendar</a> ' + 
	    	'<a href="http://picasaweb.google.com/lh/view?tab=wq" onclick="gbar.qs(this)" class="gb2">Photos</a> ' + 
	    	'<a href="https://docs.google.com/?tab=wo" class="gb2">Documents</a> ' + 
	    	'<a href="https://www.google.com/reader/view/?tab=wy" class="gb2">Reader</a> ' + 
	    	'<a href="https://sites.google.com/?tab=w3" class="gb2">Sites</a> ' + 
	    	'<a href="https://groups.google.com/groups?tab=wg" onclick="gbar.qs(this)" class="gb2">Groups</a> ' + 
	    	'<div class="gb2"><div class="gbd"></div></div>' + 
	    	'<a href="http://www.google.com/intl/en/options/" class="gb2">even more »</a> ' + 
	    	'</div></nobr></div>' + gog.innerHTML;
		}					
		nodes = selectNodes("//span[@class='gl']/a[starts-with(@href, 'http://webcache.googleusercontent.com')]");
		for (var i=0; i < nodes.snapshotLength; i++) {
			thisNode = nodes.snapshotItem(i);
			thisNode.href = thisNode.href.replace(/http:/, 'https:');
			thisNode.removeAttribute('onmousedown');
		}
		if (window.location.href.indexOf('#sl') >= 0) {
			var cStat, cEnd, prefCookie;
			if (document.cookie.length > 0) {
				cStart = document.cookie.indexOf('PREF=');
				if (cStart >= 0) { 
					cStart += 5;
					cEnd = document.cookie.indexOf(';', cStart);
					if (cEnd < 0) cEnd = document.cookie.length;
					prefCookie = document.cookie.substring(cStart, cEnd);
					var useLanguage = '', locationHref = document.location.href;
					cStart = locationHref.indexOf('hl=');
					if (cStart >= 0) {
						cStart += 3;
						cEnd = locationHref.indexOf('&', cStart);
						if (cEnd < 0) cEnd = locationHref.length - 3;
						useLanguage = locationHref.substring(cStart, cEnd);
						}
					if (useLanguage.length == 0) useLanguage = defaultLanguage;
					if (useLanguage.length > 0) {
						cStart = prefCookie.indexOf('LD=');
						if (cStart < 0) {
							prefCookie += ':LD=' + useLanguage;
						} else {
							cStart += 3;
							cEnd = prefCookie.indexOf(':', cStart);
							if (cEnd < 0) cEnd = prefCookie.length;
							prefCookie = prefCookie.substring(0, cStart) + useLanguage + prefCookie.substring(cEnd, prefCookie.length);
							var exdate = new Date();
							exdate.setDate(exdate.getDate() + 365);
							document.cookie = 'PREF=' + prefCookie + ';expires=' + exdate.toGMTString() + ';domain=.google.com';
						}
					}
				} 
			}
			
		}
	}
}