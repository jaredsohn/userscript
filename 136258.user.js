// ==UserScript==
// @name        Syntax Highlighting Anywhere
// @namespace   http://userscripts.org/users/469199
// @description Many websites do not offer syntax highlighting, which is a shame, as it ist quite easy to enable thanks to javascript libraries.
// @include     http://*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require		http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js
// ==/UserScript==

$(document).ready(function() {
	$("head").append('<link rel="stylesheet" type="text/css" href="http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css" />')
	$("pre").attr("class", "prettyprint");
	$("code").attr("class", "prettyprint");
	prettyPrint();
});
