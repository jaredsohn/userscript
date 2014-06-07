// ==UserScript==
// @name           appinn plugin searchbar in bottom
// @namespace      caoglish
// @include        http://www.appinn.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('#searchform,#topnav')
	.css('position','fixed')
	.css('z-index','200');
	
$('#searchform').css('bottom','0px');

$('#topnav')
	.css('top','0px')
	.css('background','#aaaaaa')
	.css('opacity','0.8')
	.css('height','30px');
	

$(document).dblclick(function(){
	$('#searchform, #topnav').toggle();	
});