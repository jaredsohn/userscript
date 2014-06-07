// ==UserScript==
// @name           Zpag.ES Instant Skipper
// @namespace      Zpag.ES Instant Skipper
// @description    Script made by r3x0
// @include        *zpag.es/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.0.0
// ==/UserScript==

// Ready

$(document).ready(function (){

	$.each($("script"), function(i) {
	
		if($(this).text().indexOf('var links = $("<a></a>").addClass("btn_full").click(function(e) {') > -1){
		
			var first = $(this).text().split('window.location = "');
			var url = first[1].split('";');
			
			window.location = url[0];
				
		}
	});
});