// ==UserScript==
// @name           Block TNT users
// @namespace      treesandthings
// @include        http://treesandthings.com/story/*
// @include        http://*.treesandthings.com/story/*
// ==/UserScript==

var users_to_block = ['zyxwvutsr'];

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.treesandthings.com/js/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
   var selector = "";
   for (var i = 0; i < users_to_block.length; i++)
       users_to_block[i] = "h2:contains("+users_to_block[i]+")";
   var selector = users_to_block.join(",");
   $(selector).parents("table.xcmthead").each(function(){ $(this).hide().next().hide().next().hide(); });