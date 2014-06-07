// ==UserScript==
// @name           tianya post review
// @namespace      caoglish
// @include        http://www.tianya.cn/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('body').append('<div id="article"></div>');

$('#article')
		.css('width',$(document).width()-($(document).width()/10*5))
		.css('position','absolute')
		.css('top','10px')
		.css('left',$(document).width()/10*5)
		.css('z-index','200')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','8px')
		.css('background', '#eeeeee')
		.hide();
		
$('table td a').hover(function(){
		var link=$(this).attr('href');
		$('#article').show('slow').html('loading.....')
				.css('top',$(this).position().top)
				.css('left',$(this).position().right)
				.css('width',$(document).width()-$(this).position().right)
				;
		
		$('#article').load(link+" #pContentDiv .post:first");
	},function(){
		$('#article').hide();
	});
	
