// ==UserScript==
// @name           Code tag fixer
// @namespace      http://suicidegirls.com/members/Conroy/
// @include        http://suicidegirls.com/groups/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){  
	$('div.message pre').each(function(){
		$(this).find('br').remove();
		$(this).css('overflow','auto');
	});
}());