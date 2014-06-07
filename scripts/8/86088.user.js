// ==UserScript==
// @name           Fix line numbers on github
// @description    Fixes the fact that line numbers fuck up on github
// @author         Sebastian Paaske Tørholm
// @namespace      http://mathemaniac.org
// @include        http://github.com/*
// @include        https://github.com/*
// @version        1.0.1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// ==/UserScript==
$(document).ready( function() {
	$("#files .file .data pre, #files .file .line-data, #files .file .line-number").css("font-size", "113%");
});
