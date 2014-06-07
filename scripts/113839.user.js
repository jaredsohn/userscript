// ==UserScript==
// @name           appinn plugin go to comment
// @namespace      caoglish
// @include        http://www.appinn.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('body').append('<button id="gotocmt">留言板</button>');

$('#gotocmt')
	.css('background','black')
	.css('color','white')
	.css('opacity','0.5')
	.css('position','fixed')
	.css('bottom','0px')
	.css('left','0px')
	.click(function(){
			$('html, body').animate({ scrollTop: $('#cmt').position().top }, 'slow');	
	});
	
$(document).dblclick(function(){	
	$('#gotocmt').toggle();

	});