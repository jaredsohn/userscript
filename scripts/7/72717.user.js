// ==UserScript==
// @name           Last.fm: Leftbar on top
// @namespace      http://solife.cc
// @description    turn the leftbar on the top of the page
// @version	    1.0
// @include	    http*://*last.fm/*
// @include	    http*://*lastfm.de/*
// @include	    http*://*lastfm.es/*
// @include	    http*://*lastfm.fr/*
// @include	    http*://*lastfm.it/*
// @include	    http*://*lastfm.pl/*
// @include	    http*://*lastfm.se/*
// @include	    http*://*lastfm.ru/*
// @include	    http*://*lastfm.jp/*
// @include	    http*://*lastfm.com.tr/*
// @include	    http*://*lastfm.com.br/*
// ==/UserScript==

if( document.getElementById('secondaryNavigation') ) {

	var css = document.createElement('link');
	css.href = 'http://solife.cc/lastfm/leftbarontop.css';
	css.rel="stylesheet";
	css.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(css);

	var secondaryNavigation = document.getElementById('secondaryNavigation');
	document.getElementById("page").getElementsByTagName('div')[0].insertBefore(secondaryNavigation, document.getElementById("content"));
	
}