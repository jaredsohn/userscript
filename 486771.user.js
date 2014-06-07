// ==UserScript==
// @name       The PirateBay https redirector
// @version    0.2
// @description Redirect TPB non https urls to https
// @include      http://thepiratebay.se/*
// @include      http://thepiratebay.sx/*
// @copyright  Daniel
// @author  Daniel
// @run-at document-start
// ==/UserScript==

if(document.location.protocol !== 'https:') {
    document.location.protocol = 'https:';
}
