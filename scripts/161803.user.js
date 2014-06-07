// ==UserScript==
// @name        Light habr visited link
// @namespace   Habrahabr
// @include     http://habrahabr.ru/*
// @version     1
// ==/UserScript==

function PostTitleMouseEnter(target){
		var link = target;
	
		target.mo_timeout = setTimeout(function() {
			var $link = $(link);
			localStorage.setItem($link.attr('href'), true);
			$link.parent().css('border-right', '');
			
			$link.unbind('mousemove', PostTitleMouseEnter);
		}, 500);
}

function PostTitleMouseLeave(target){
	clearTimeout(target.mo_timeout);
}

$('.post_title').mouseenter(function(){
		PostTitleMouseEnter(this);
	}).mouseleave(function(){
		PostTitleMouseLeave(this);
	});

 $('.post_title').each(function(i, element){
	 var $element = $(element);
	
	if(!localStorage.getItem($element.attr('href'))){
		 $element.parent().css('border-right', '5px solid #D3E2FF');
	}
});