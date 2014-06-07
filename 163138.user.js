// ==UserScript==
// @name        EVE Forums - Disable Link Warnings
// @namespace   http://userscripts.org/users/504636
// @include     https://forums.eveonline.com/*
// @grant       none
// @version     1.1.0
// ==/UserScript==

var regex = /\/default.aspx\?g=warning&?l=(.*)&domain.*/g;

$('a.warn').each( function() {
  var href_org = $(this).attr('href');
  var href_new = unescape( href_org.replace( regex, "$1" ) )
  $(this).attr( 'href', href_new );
  $(this).removeClass('warn');
  $(this).off();
});
