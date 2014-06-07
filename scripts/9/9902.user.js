// ==UserScript==
// @name           I Live In The UK, Dammit!
// @namespace      Oatzy
// @description    Reloads .com pages as the UK equivalent (.co.uk)
// @include        http://*.amazon.com/*
// @include        http://www.google.com/*
// ==/UserScript==

(function() {
window.location.href = window.location.href.replace(/.com/gi, '.co.uk');
return false;
})()