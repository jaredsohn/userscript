// Remove Allblog Toolbar
// version 0.1
// 2009-04-25
// Copyright (c) 2009, Seungwon Jeong
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Remove Allblog Toolbar
// @namespace      http://jeongsw.textcube.com/
// @description    Remove Allblog Toolbar
// @include        http://*.allblog.net/*
// ==/UserScript==

(function () {
	 var i;
	 var links;
	 var pattern = /^http:\/\/link.allblog.net\/\d+\//i;

	 if (location.href.match(pattern)) {
		 location.href =
			 location.href.replace(pattern, '');
	 } else {
		 links = document.links;

		 for (i = 0; i < links.length; ++i) {
			 links[i].href =
				 links[i].href.replace(pattern, '');
		 }
	 }
 })();
