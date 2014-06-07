// ==UserScript==
// @name           spanishWebsite
// @namespace      spanishWebsite
// @description    Spanish websites for JAWS
// @include        http://*/
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
	$("html").attr("xml:lang","es");
	$("html").attr("lang","es");
});

