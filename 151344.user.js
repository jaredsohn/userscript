// ==UserScript==
// @name           Dan Gilbert Comic Tweets !
// @namespace      pylbcavsdan
// @description    All of Dan Gilbert's tweets automatically show up in Comic Sans.
// @include        http*://twitter.com/*/cavsdan
// @include        http*://twitter.com/cavsdan
// @grant          GM_addStyle
// @version        1.0
// @updateURL      http://userscripts.org/scripts/source/151344.user.js
// ==/UserScript==

GM_addStyle("p.js-tweet-text { font-family: 'Comic Sans MS' !important;}");