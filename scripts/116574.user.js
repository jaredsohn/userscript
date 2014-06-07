// ==UserScript==
// @name         	KTM-LC4
// @author	 	 	Stefan Kunze
// @description   	Theme anpassen
// @version       	0.0.1
// @include       	http://vb.ktm-lc4.net/*
// @include       	http://www.vb.ktm-lc4.net/*
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function(){

//Things to hide
$('.navbithome').parent().remove();
$('#pagetitle').remove();


	$('html').css({
		'background':'#333'
	});
	$('.above_body').css({
		'background':'#333'
	});
	
	$('.logo-image').css({
		'margin-top':'20px'
	});
	
	$('.toplinks ul.isuser li').css({
		'background':'#333'
	}).children('a').css({
		'color':'#fff',
		'font-weight':'normal'
	});
	
	$('.navtabs').css({
		'padding':'0'
	})
	
	$('.selected  .navtab').css({
		'border':'0px',
		'background':'#333',
		'color':'#fff'
	})
	
	$('.body_wrapper').css({
		'background':'#333',
		'padding':'10px'
	})
	
	$('.forumrow').css({
		'background':'#eee'
	})
	


});