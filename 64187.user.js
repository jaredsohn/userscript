// ==UserScript==
// @name           Hotklix (The Times of India): Redirect page frame buster and remove interstitials
// @namespace      http://userscripts.org/users/121156
// @description    Remove the TOI junk surrounding the main article on hotklix.com and remove interstitial pages.
// @include        http://timesofindia.hotklix.com/link/*
// @include        http://timesofindia.indiatimes.com/*
// @include        http://*.hotklix.com/link/*
// @version        3
// ==/UserScript==

var iframe = document.getElementById('iframe_id');

if (iframe !== null)
  top.location = iframe.src;

var td = document.querySelector('td[style="padding-left:25px;font-family: Arial;font-size: 12px;"]');

if (typeof td == 'object' && td.textContent.match(/will load in a few seconds/))
  top.location = td.querySelector(':link').href;