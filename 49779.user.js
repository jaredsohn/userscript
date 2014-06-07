// ==UserScript==
// @name           last.fm slideshow--
// @namespace      http://userscripts.org/users/61677
// @description    removes slideshow in radio player
// @include        http://*.last.fm/listen/*
// @include        https://*.last.fm/listen/*
// ==/UserScript==


function addStyle(css) {
   GM_addStyle(css.replace(/;/g,' !important;'));
 }

addStyle(
	'div#webRadioPlayer-visualisation {display:none;} '+
	'a#slideshowPhotoCredits {display:none;} '+
	'div#webRadioPlayer-content {padding-top:50px; padding-bottom:50px; background:#000;}'
	);