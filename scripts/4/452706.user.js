// ==UserScript==
// @name GreatAndhra
// @description Customizes Greatandhra Site
// @include http://www.greatandhra.com/* 
// @include http://*.greatandhra.com/*
// @include     /^http://www\.greatandhra\.(com|net)//
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var counter = GM_getValue('counter', 0);
console.log('This script has been run ' + counter + ' times.');
GM_setValue('counter', ++counter);

var $;
// Add jQuery
(function () {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head') [0] || document.documentElement,
		GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
}) ();
// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}
// All your GM code must be inside this function

function letsJQuery() {
	console.log('letsJquery');
    //alert($);
    // check if the dollar (jquery) function works
    //alert($() .jquery);
    // check jQuery version
    var addrotatorDiv = $("div.great_andhra_main_add_rotator:nth-child(1)");
    console.log(addrotatorDiv);

    $(".great_andhra_logo_panel").remove();
    $(".great_andhra_main_footer").remove();
    $(".sortable-item_style_7").remove();
    $(".column").remove();
    $(".breade_crumb").remove();
    $(".byline").remove();
    $(".social_place_holder").remove();

    $(".two_column").attr('class','float-left');
    $(".great_andhra_main_body_container .page_news").css('width','100%');
    $(".great_andhra_main_body_container .page_news .content").css('width','100%');

    $(".gallery_right_column").remove();
    $(".great_andhra_search_panel").remove();
}
