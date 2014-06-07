// ==UserScript==
// @name           SubsBtn_Original
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @description	   Adds Original graphic(thanks to Dupi) for Subscriptions back.
// @author	   Endy & Dupi
// @include        http://ww*.erepublik.com/*/*
// @include        http://ww*.erepublik.com/*

// ==/UserScript==

// note: works on all vers but only links to english mailbox vers
var junk = document.getElementById('maildisplay');

junk.innerHTML = junk.innerHTML + '<div class="item" title="go to subscriptions"><a class="subs" href="/en/messages/subscribes/1"> </a><a class="smalldotted" href="/en/messages/subscribes/1">&raquo;</a></div>';

