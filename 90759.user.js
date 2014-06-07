// ==UserScript==
// @name           general
// @namespace      udev
// @include        http://mafiamatrix.com/*
// @require	   	   http://secretz.kapsi.fi/mmfiles/001jquery-1.4.3.min.js
// ==/UserScript==

$(document).ready(function() {
	var onlinelist = new Array();
	$('#whosonlinecell a:gt(1)').each(function(index) {
		onlinelist.push($(this).text());
	});
	alert(onlinelist.join());
});