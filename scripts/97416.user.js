// ==UserScript==
// @name           Google Full Image
// @namespace      http://kodewerx.org/
// @include        http://*.google.com/*imgurl=*
// @include        http://google.com/*imgurl=*
// ==/UserScript==

window.location = window.location.href.replace(/.*imgurl=([^&]*).*/, "$1");