// ==UserScript==
// @name        D* rtl
// @namespace   https://joindiaspora.com/u/hamidthegreat
// @include     https://joindiaspora.com/stream
// @include     https://joindiaspora.com/u/*
// @include     https://joindiaspora.com/people/*
// @include     https://diasp.de/stream
// @include     https://diasp.de/u/*
// @include     https://diasp.de/people/*
// @version     1.1.2
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// <![CDATA[

$(document).ready(function() {

	$('head').append("\
<style type='text/css'>\
	.rtl {\
		display: block !important;\
		direction: rtl !important;\
		text-align: right !important;\
	}\
	.rtl:before\
	{\
		content: '\\202B' !important;\
	}\
	.rtl:after\
	{\
		content: '\\200F' !important;\
	}\
</style>\
	");

	setInterval(function() {
		$('div.collapsible p').each(function(index) {
			var str = $(this).text();
			if ("اآبپتثجچحخدذرزژسشصضطظعغفقکكگلمنوهیيئ‫".indexOf(str[0]) != -1) {
				$(this).addClass("rtl");
			}
		});
	}, 4000);

});

// ]]>