// ==UserScript==
// @name           Retweet this to win NOTHING!
// @namespace      http://twitter.com/chadsmith
// @description    Hides those stupid "Retweet this to win..." tweets.
// @include        http://twitter.com/*
// ==/UserScript==
window.addEventListener('load',function(a,b,c){if(a=document.getElementById('timeline')){b=a.getElementsByTagName('li'),c=b.length;while(c--)if(b[c].className.match(/\bstatus\b/)&&b[c].innerHTML.match(/retweet (this )?(to|and) win/i))b[c].style.display='none'}},true);