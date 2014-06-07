// ==UserScript==
// @name        hide foreign
// @namespace   http
// @include     http://www.batoto.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant none
// @version     1
// ==/UserScript==
(function(){
	$('tr[class*=lang_]').not('.lang_English').remove();    
})();