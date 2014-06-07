// Force Login for Twitter OAuth
// 2011-10-9
// Twitter: @bck_17
// ==UserScript==
// @name          ForceLoginforTwitterOAuth
// @namespace      something
// @description   Complete twitter OAuth without using current account.
// @include       http://api.twitter.com/oauth*
// @include       https://api.twitter.com/oauth*
// @include       http://twitter.com/oauth*
// @include       https://twitter.com/oauth*
// @exclude       http://api.twitter.com/oauth*&force_login=true
// @exclude       https://api.twitter.com/oauth*&force_login=true
// @exclude       http://twitter.com/oauth*&force_login=true
// @exclude       https://twitter.com/oauth*&force_login=true

// ==/UserScript==

(function() {
	window.location.href = window.location.href + '&force_login=true';
})();