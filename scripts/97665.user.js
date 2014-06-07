// ==UserScript==
// @name           On.Net
// @namespace      dejan.greasemonkey
// @description    On.net column
// @include        http://on.net.mk/*
// @exclude		   http://on.net.mk/*.xml
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

j = jQuery.noConflict();

j(document).ready(function () {
	
	j('.header .jambo').remove();	

	j('.ads-label').each (function() {
		j(this).parent().parent().remove();
	});

	j('td.ctTD-2').each(function() {
		j(this).insertAfter(j(this).next()); 
	});	
	
});
