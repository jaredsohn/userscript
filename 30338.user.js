// ==UserScript==
// @name           GameSpot Ad Skipper
// @description    Skip ad page
// @include        http://*.gamespot.com/*
// ==/UserScript==

if (document.evaluate('//a[contains(text(),"Click here to continue to GameSpot")]', document, null, 8, null).singleNodeValue) {
    location.href = 'http://chkpt.zdnet.com/chkpt/gs_skip_pre/http://www.gamespot.com';
}