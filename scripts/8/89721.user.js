// ==UserScript==
// @name		Html grooveshark hidebar
// @namespace		htmlgroove
// @description		hides sidebar in html version of grooveshark
// @version		0.5.0
// @copyright		2010+, theLOLflashlight
// @include	        http://html.grooveshark.com/*
// ==/UserScript==

$(document).ready(function(){
var mainWidth = $(window).width();
	grooveWidth = mainWidth+188;
	var groovy = grooveWidth + 'px';
	$("body").css([width: groovy});
});
$(window).resize(function(){
	var mainWidth = $(window).width();
	grooveWidth = mainWidth+188;
	var groovy = grooveWidth + 'px';
	$("body").css([width: groovy});
});