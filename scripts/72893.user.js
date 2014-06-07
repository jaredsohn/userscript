// ==UserScript==
// @name           Reddit Child Comment Effects
// @namespace      Reddit
// @description    Reddit Child Comment Effects
// @include        http://www.reddit.com/*/comments/*
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/*/search*
// @exclude		   http://www.reddit.com/user/*
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


function letsJQuery() {
	$('head').append($('<style type="text/css"> .childBorder { border-left: 1px dotted black; } </style>'));
	$('.child').addClass('childBorder');
}