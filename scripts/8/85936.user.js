// ==UserScript==
// @name           rainbow comments
// @include        http://*reddit.com/r/lgbt/*
// ==/UserScript==

window.addEventListener('load', function() {
	var css = new Array('#D91226', '#FFA000', '#FFFF00', '#008241', '#000093', '#710071');
	unsafeWindow.jQuery('.listing').each(function() {
		var i = unsafeWindow.jQuery(this).parents('.listing').length;
		var level = i % 6;
		unsafeWindow.jQuery(this).css('border-left', '1px solid ' + css[level]);
	});
},
false );