// ==UserScript==
// @name           Railzilla popup1
// @description    railzilla popup1
// @include        *
// ==/UserScript==
unsafeWindow.open = function() { document.body.appendChild(document.createElement('iframe').src=arguments[0]); }