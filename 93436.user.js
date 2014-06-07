// ==UserScript==
// @name           villages in one page T4
// @namespace      http://userscripts.org/
// @description    villages in one page
// @version        0.1
// @include        http://beta.travian.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(function() {
	$('#linkList').css('margin-top','50px');
	$('div#villageList')
		.find('li')
			.show()
			.end()
		.find('div.head')
			.css({'background-image' : 'none', 'background-color' : 'white'})
			.end()
		.find('div.list')
			.css({'background-image' : 'none', 'background-color' : 'white', 'max-height' : 'none', 'height' : 'auto'})
			.find('.pager')
				.remove();
});