// ==UserScript==
// @name           Engadget cleaner
// @namespace      http://userscripts.org/users/118324
// @include        http://www.engadget.com/*
// ==/UserScript==

//Uses Joan Piedra's jQuery loading method http://joanpiedra.com/jquery/greasemonkey/
//Loads jQuery from google, I figure they can afford the bandwidth easier than jQuery.com


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  $('.topLeader').remove();
  $('#GH_').remove();
  $('.engadget_hdr').css('margin-top','25px');
  $('#outerslice').remove();
  $('#cobrand_hdr').remove();
  $('.main_nav').remove();
  $('.col2').remove();
  $('.inpostad').remove();
  $('.sponsorArea').remove();
  $('#topstories').remove();
  $('.my-little-hero').remove();
  $('.linkarea').remove();
  $('.footer').remove();
  $('.tipus_tab').remove();
  $('.blogroll').css('padding-bottom','50px');
  $('.home .content_holder .col1').css('width','980px');
}
