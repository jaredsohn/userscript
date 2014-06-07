// ==UserScript==
// @name           4chan mark image readed
// @namespace      4chan-img-read
// @description    Images are trasparent if you have looked at them
// @include        http://*.4chan.org/*
// @version 	   0.9
// @author 		   Timendum
// ==/UserScript==

GM_addStyle(
	'a:visited img {opacity:0.6;}'
);