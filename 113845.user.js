// ==UserScript==
// @name           appinn plugin ajax show article
// @namespace      caoglish
// @include        http://www.appinn.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('body').append('<div id="mask"></div>');
$('body').append('<div id="article"></div>');

$('#mask')
		.css('width',$(document).width())
		.css('height',$(document).height())
		.css('background','black')
		.css('opacity','0.5')
		.css('position','absolute')
		.css('top','0px')
		.css('left','0px')
		.css('z-index','200')
		.hide();
		
	$('#article')
		.css('width',$(document).width()-($(document).width()/10*4))
		.css('position','absolute')
		.css('top','10px')
		.css('left',$(document).width()/10*2)
		.css('z-index','200')
		.css('box-shadow','0px 0px 10px black')
		.css('border-radius','8px')
		.css('background', '#ffffff')
		.hide();
		
	$('#mask').click(function(){
		$('#mask').hide();
		$('#article').hide();
	});	
		

	$('div[id^="post"]').click(function(){
		var link=$(this).find('h2 a').attr('href');
		
		$('#mask').show();
		$('#article').load(link+" #content",function(){
					$('#article').show('slow');
			});
	});
	

	