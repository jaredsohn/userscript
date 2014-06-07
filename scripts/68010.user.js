// ==UserScript==
// @name           Redirect to www.last.fm
// @namespace      http://userscripts.org/users/130678
// @description    Redirects www.lastfm.tld (jp, fr, de...) to www.last.fm.
// @include        http://www.lastfm.tld/*
// @include        http://cn.last.fm/*
// ==/UserScript==
(function (){
	var redirectTo = location.href;
	redirectTo = redirectTo.replace(/www\.lastfm\.[a-z\.]*|cn\.last\.fm/, 'www.last.fm');
	if ( redirectTo != location.href ) location.href = redirectTo;
})();
//.user.js
