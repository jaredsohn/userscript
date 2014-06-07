// ==UserScript==
// @name           Skip Ads
// @namespace      Shellster
// @description    Skip ads and wait for password download
// @include        http://www.freevideosnmovies.co.cc/avideos/*
// @include        http://www.freevideosnmovies.co.cc/movies/*
// ==/UserScript==


if(document.body.innerHTML.indexOf('PASSWORD FOR'))
	document.getElementsByTagName('FORM')[0].submit();
