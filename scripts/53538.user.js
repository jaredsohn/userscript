// ==UserScript==
// @name           DirectLinkBucks
// @namespace      http://creazy.net/
// @include        *
// ==/UserScript==

var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
if ( document.getElementsByTagName('body')[0].getAttribute('class') == 'linkBucks' ) {
    location.replace(w.linkDestUrl);
}