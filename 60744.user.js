// ==UserScript==
// @name           Reklamer Nej Tak til Politiken.dk
// @namespace      http://userscripts.org/users/87736
// @include        http://politiken.dk/*
// @include        http://politiken.tv/*
// @include        http://ibyen.dk/*
// @include        http://wulffmorgenthaler.dk/*
// @include        http://cover.dk/*
// ==/UserScript==


function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  $("#topMenu,#top-monster,.ad-bline,.ad-f-monster,.ad-noline,.annonce_textads,.oad-ad,.annonce-txt").hide();
}