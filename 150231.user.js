// ==UserScript==
// @name           Catcher for Impress of Kingdom
// @namespace      mimiko.iok
// @include        http://wg.51wan.com/*
// @require        http://code.jquery.com/jquery-latest.js
// @grant          none
// @version        0.0.2
// ==/UserScript==
"use strict";
//vars
var target = $('div.conbox');
if(target.length){
	target.after('<textarea id="iok">' + $.trim(target.html()) + '</textarea>');
	$('#iok')
	.css({
		width: target.width(),
		height: target.height()
	})
	.focus().select();
	target.remove();
}