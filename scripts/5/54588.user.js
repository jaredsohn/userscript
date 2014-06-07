// ==UserScript==
// @name           Reddit inline images
// @namespace      http://userscripts.org/users/mattmc
// @description    Reddit inline images
// @include        http://reddit.com/r/*
// @include        http://*.reddit.com/r/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('.commentarea a[href$=".jpg"], .commentarea a[href$=".gif"], .commentarea a[href$=".png"]').each(function() {
	var $link = $(this);
	var $img = $('<img />');
	
	$link
		.css({
			backgroundColor: '#000000',
			color: '#FFFFFF',
			display: 'inline-block',
			opacity: '0.75',
			padding: '5px',
			position: 'relative',
			top: '25px'
		})
		.before('<br />')
		.after($img);

	$img
		.attr('src', $link.attr('href'))
		.attr('title', $link.text())
		.after('<br />')
		.before('<br />')
		.show();
});
