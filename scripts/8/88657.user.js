// ==UserScript==
// @name	  Time.mk Modified Layout
// @description	  modifies the time.mk layout for wide screen monitors
// @include       http://www.time.mk/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 2.2
// @grant		  GM_addStyle
// ==/UserScript==

GM_addStyle("\
	#wrapper, #footer { width: 1240px } \
	#ads_pane { display: none !important } \
	#news_pane { width: 100% !important } \
	#news_pane .cluster { width: 620px !important ; float: left !important  }  \
	#news_pane .article_body { width: 450px  !important }  \
	p.rel_title { max-width: 390px !important } \
	#step1 {  max-width: none !important; transition: none; -moz-transition: none; -kthtml-transition: none } \
	#step1 a { width: 10% !important; } \
	#super_newest { width: 13% !important; } \
");

function rasporedi() {
	$("#news_pane .cluster:even").each(function (i){
		var h = $(this).height() > $(this).next().height() ? $(this).css('height') : $(this).next().css('height');
		$(this).css('min-height',h);
		$(this).next().css('min-height',h);
	});
}

$(document).ready(function () {
	$('#ads_pane').remove();
	rasporedi();	
});