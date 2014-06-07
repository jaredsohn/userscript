// ==UserScript==
// @name           Original eRepublik Subscribe Button
// @namespace      http://www.erepublik.com/en/newspaper/rage-flame-220908/1
// @description	   Add original subscriptions button to eRepublik back...
// @author	   FierceLion
// @include        http://ww*.erepublik.com/*/*
// @include        http://ww*.erepublik.com/*

// ==/UserScript==

// note: Works on all versions but only links to English mailbox versions
var junk = document.getElementById('maildisplay');

junk.innerHTML = junk.innerHTML + '<div class="item" title="Subscriptions"><a class="subs" href="/en/messages/subscribes/1"> </a><a class="smalldotted" href="/en/messages/subscribes/1">1</a></div>';