// ==UserScript==
// @name           Whirlpool Forums All Pages
// @namespace      http://userscripts.org/users/74605
// @description    On forums index page add link to view all pages of thread.
// @include        http://forums.whirlpool.net.au/forum/*
// ==/UserScript==

var re = new RegExp('/forum-replies\\.cfm\\?t=(\\d+)&p=(\\d+)#r(\\d+)');
//unsafeWindow.alert(re.test('http://forums.whirlpool.net.au/forum-replies.cfm?t=1282250&p=16#r310'));
for (var i = 0; i < document.links.length; i++) {
	var link = document.links[i];
	var prefix = 'http://forums.whirlpool.net.au/forum-replies.cfm?t=';
	if (link.href.substr(0, prefix.length) == prefix && link.href.indexOf('&') < 0) {
		link.href += '&p=-2';
	} else {
		link.href = link.href.replace(re, '/forum-replies.cfm?t=$1&p=-2#r$3');
	}
}
