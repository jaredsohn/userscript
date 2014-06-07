// ==UserScript==
// @name           Gaia - Report/Subscription @ Top
// @namespace      http://projects.indeedle.com/gaia/reportlinks
// @description    Adds the Report Thread/Subscribe/Unsubscribe buttons to the top of the thread.
// @include        http://www.gaiaonline.com/forum/*/t.*
// @require        http://projects.indeedle.com/inc/jquery.js
// ==/UserScript==

/* This script is officially obsolete due to Gaia implementing this 
(function() {
	$('.detail-navlinks:first').append('<span id="sg_topreports">' + $('.thread_options').html() + '</span>');
	
	lgs_addGlobalStyle('#sg_topreports a { white-space: nowrap; margin-left: 5px; float: left; }');
	
}());

function lgs_addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

*/