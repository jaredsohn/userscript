// ==UserScript==
// @name   ✺tags for twitter
// @version    0.1 
// @namespace  http://twitter.com/tdwright/
// @description Search for ✺ (bosh) tags and make them into links
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include    http://twitter.com*
// @include    http://www.twitter.com*
// @include    https://twitter.com*
// @include    https://www.twitter.com*
// @exclude    http://twitter.com/account/*
// @exclude    https://twitter.com/account/*
// @exclude    http://twitter.com/logout*
// @exclude    https://twitter.com/logout*
// @exclude    https://twitter.com/invitations
// ==/UserScript==

(function($) {
	var thePage = $("body");
	thePage.html(thePage.html().replace(/(^|\s+)\✺([\w|-|\.]+)/g, '$1<a class="expanded" title="Search for ✺$2" href="/search?q=✺$2">✺$2</a>'));
})(jQuery)