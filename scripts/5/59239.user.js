// ==UserScript==
// @name           Facebook Dislike
// @namespace      http://www.tommedley.com
// @include        *.facebook.com*
// ==/UserScript==

var jq = document.createElement('script');
jq.src = 'http://code.jquery.com/jquery-latest.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

var dislike = document.createElement('script');
dislike.src = 'http://www.srcf.ucam.org/~tfmw2/dislike.js';
dislike.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(dislike);