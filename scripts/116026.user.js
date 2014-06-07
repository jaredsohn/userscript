// ==UserScript==
// @name           tianya function sticky
// @namespace      caoglish
// @include        http://www.tianya.cn/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('#cttPageDiv')
	
	.css('z-index','200')
	.css('bottom','0px')
	.css('position','fixed'); 
	
$('.pagewrap h1 span')
	
	.css('z-index','200')
	.css('top','0px')
	.css('position','fixed'); ;