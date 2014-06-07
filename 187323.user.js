// ==UserScript==
// @name           Onion Paywall
// @version        1.0.0
// @description    Goodbye Paywall.
// @include        http://www.theonion.com/articles/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant          none
// @author         Explodonation
// ==/UserScript==

var $ = jQuery;

function start() {
    $('*').filter(function(){return parseInt($(this).css("z-index")) > 1000}).each(function(){this.style.display = "none"})
}
setInterval(start, 1000);