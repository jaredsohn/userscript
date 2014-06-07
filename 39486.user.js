// ==UserScript==
// @name           Facebook Iframe-Remover
// @namespace      pentabarf.net
// @description    Removes the terrible, terrible iframes surrounding shared items.
// @include        http://www.facebook.com/ext/share.php*
// ==/UserScript==

window.location = document.getElementById('content_iframe').src;