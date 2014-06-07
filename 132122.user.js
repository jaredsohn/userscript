// ==UserScript==
// @name           1337 F5 Refresher in Offline Page
// @namespace      Clraik.com
// @Metaldroga ®
// @include        http://www.neopets.com/*
// ==/UserScript==

if (/temporarily offline/.test(document.body.textContent)) {
    location.reload();
}