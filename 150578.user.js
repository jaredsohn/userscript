// ==UserScript==
// @name			test
// @author			Astinox
// @version			1.0
// @namespace		http://fabito.net/scripts/
// @description		test
// @include			http://u-hacks.net/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$('.tablestyleme tr').css('height','50px');
	$('.tablestyleme td').css({
		'padding':'0px',
		'height':'50px',
		'border-right':'1px solid #2C2C2C'
	});
	
	$('.tablestyleme').css({
		'margin':'0px',
		'width':'100%',
		'border-left':'1px solid #2C2C2C'
	});
	
	$('.forumbit_nopost .forumbit_nopost .forumrow, .forumbit_post .forumrow').css({
		'background':'#121212',
		'border':'none',
		'border-bottom':'1px solid #2B2B2B'
	});
	
	$('.innertablestyle').css('border','0px');
	$('.lastpostcol').css({
		'margin-left':'5px',
		'margin-right':'5px'
	});
	
	$('.myheight img').css('margin-left','3px');
});