// ==UserScript==
// @name           load_jq
// @namespace      load_jq
// @include        http://localhost*
// ==/UserScript==

var s=document.createElement('script');
s.setAttribute('src', 'http://jquery.com/src/jquery-latest.js'); 
document.body.appendChild(s); 