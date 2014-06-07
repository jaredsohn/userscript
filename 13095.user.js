// Float blue posts to top
// Version 0.1 BETA
// 2007-10-17
// Copyright (c) 2007, Some Guy
// ==UserScript==
// @name          Blue Post Float-to-Top
// @namespace     http://about:blank
// @description   Moves blue posts to the top of the page @ WorldOfWarcraft.com forums
// @include       http://forums.worldofwarcraft.com/thread.html*
// ==/UserScript==
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var filter_link = document.createElement('a');
filter_link.id = "filter_link"
filter_link.href = "#"
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; doWork(); }
    }
    GM_wait();
function doWork()
{
	$("span[@class='blue']").parents("div[@class='postdisplay']").parent().parent().insertBefore($("#postbackground").children("div[@class='right']").children()[5]);  // First post
}