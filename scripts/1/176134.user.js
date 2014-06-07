// ==UserScript==
// @name        weibo bg
// @namespace   weibo
// @include     http://weibo.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1
// ==/UserScript==
$(function(){
	$('body,.W_miniblog').css('background','none');
	$('body').css({
		'background-image': 'url("http://photo.yupoo.com/vivalg_v/CKNCxqJr/2IiS5.png")',
		'background-repeat': 'repeat-y'
	});
	$('.W_main').css({
		'background-image': 'none',
		'background-color': 'white',
		'border': '1px solid #DADADA'
	});
	$('.WB_global_nav').css('visibility', 'hidden');
	$('.gn_person').css({
		'visibility': 'visible',
		'background-color': '#F8F8F8',
		'border': '1px solid #DADADA',
		'border-bottom-right-radius': '20px',
		'border-bottom-left-radius': '20px'
	});
	$('.gn_search').css('visibility', 'visible').css('border-radius', '12px');
	
	$('.nameBox').css('visibility', 'hidden');
	$('#pl_content_publisherTop').css('display', 'none');
})();
