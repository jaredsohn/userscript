// ==UserScript==
// @name           SubsBtn
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @description	   Adds Subscriptions back.
// @include        http://ww*.erepublik.com/*/*
// @include        http://ww*.erepublik.com/*

// ==/UserScript==

// note: works on all vers but only links to english mailbox vers
var junk = document.getElementById('maildisplay');

junk.innerHTML = junk.innerHTML + '<div class="item"> <a href="http://www.erepublik.com/en/messages/subscribes/1"><img alt="Subs" src="http://img205.imageshack.us/img205/8231/rssiconglassgreen64q.jpg" height="18" width="18"/></a> <a href="http://www.erepublik.com/en/messages/subscribes/1">&rarr;</a></div>';
