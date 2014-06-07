// ==UserScript==
// @name           TVDEZ Ad Remover
// @namespace      http://tvdez.net
// @description    Removes all ads from TVDEZ
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        http://tvdez.com*
// ==/UserScript==
$(document).ready(function() {
	$("div#content-right").remove();
	$(".ad-sense").remove();
});