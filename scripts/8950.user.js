// IpHide redirect
// ==UserScript==
// @name           iphide redirect{--AntiSmoking--}
// @namespace  https://www.iphide.com
// @description  Redirects from iphide ads page to original page
// @include         https://www.iphide.com/ads*
// ==/UserScript==

var links = content.document.links;
window.location=links[1];
