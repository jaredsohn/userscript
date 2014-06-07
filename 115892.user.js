// ==UserScript==
// @name           Remove target attribute on links
// @namespace      http://userscripts.org/users/125059
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.hardocp.com/news*
// ==/UserScript==
(function() {
	$('a[target="_blank"]').removeAttr("target");
})();