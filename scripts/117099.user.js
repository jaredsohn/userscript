// ==UserScript==
// @name                        zhihu_instapaper
// @namespace              		zhihu_instapaper
// @version                     1.1
// @author                      Mescoda on http://mescoda.com/
// @description              	Help instapapering zhihu pages
// @include                     http://www.zhihu.com/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant        				GM_xmlhttpRequest
// ==/UserScript==

$(document).ready(function() {
	// $('zm-item-title').addClass('instapaper_title');
	// $('#zh-question-answer-wrap').addClass('instapaper_body');
	$('div[role="navigation"]').css('position','static');
	$('body').css('padding-top','0')
});