// ==UserScript==
// @name             Flickr Easy Group Quitter
// @version          1.0
// @created          Fri Dec 12 18:00:12 CST 2008
// @last_modified    Fri Dec 12 18:17:04 CST 2008
// @author           Ali Karbassi
// @namespace        http://www.karbassi.com
// @description      Adds a quit link so you can quit a group faster. This skips a page. Mainly for my own personal use.
// @include          http://flickr.com/groups/*
// @include          http://*flickr.com/groups/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  
  $('#mem_groups_ul > li').each(function(){
     $(this).append('<small style="margin-left:1em;"><a href="http://www.flickr.com/groups_leave.gne?id=' + this.id.split("_").pop() + '">Quit</a></small>');
  })
  
}