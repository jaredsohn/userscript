// ==UserScript==
// @name            Series Coco Autoclicker 
// @namespace       Series Coco Autoclicker v.1
// @include      *.seriescoco.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     1
// ==/UserScript==
$(window).load(function() {
	var clickear = $("tr.down").children().children().first();
    document.location = clickear.attr ( 'href' );
});

