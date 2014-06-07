// ==UserScript==
// @name           Remove +You in Google Menubar
// @namespace      jswprog
// @include http://google.*
// @include http://www.google.*
// @include https://google.*
// @include https://www.google.*
// @include http://*.google.*
// @include https://*.google.*
// ==/UserScript==

// Not removing buttons with JS because of performance issues when Google is using Ajax.
document.getElementsByTagName('head')[0].innerHTML +=
	'<style>#gb_119 { display:none; }</style>';