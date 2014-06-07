// ==UserScript==
// @name           iGoogle HTTPS Search Fixer
// @namespace      http://jmillikin.selfip.org/greasemonkey/
// @description    Fix the searchbox on iGoogle in HTTPS mode
// @include        https://www.google.com/ig
// ==/UserScript==

(function ()
{
	var form = document.getElementById ('sfrm');
	form.action = form.action.replace ('https', 'http');
})();